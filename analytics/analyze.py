"""Recompute JanSetu metrics from a CSV export using Python's standard-library SQLite.
Usage: python3 analytics/analyze.py data/demo-requests.csv --as-of 2026-10-29T09:00:00Z
No data is sent anywhere. The SQLite database is in memory.
"""
import argparse
import csv
import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path


def summarize(path, as_of=None):
    now = datetime.fromisoformat(as_of.replace('Z', '+00:00')) if as_of else datetime.now(timezone.utc)
    if now.tzinfo is None:
        raise ValueError('--as-of needs a timezone offset or Z')
    con = sqlite3.connect(':memory:')
    con.row_factory = sqlite3.Row
    con.executescript((Path(__file__).with_name('schema.sql')).read_text())
    with open(path, newline='', encoding='utf-8-sig') as source:
        for row in csv.DictReader(source):
            created = datetime.fromisoformat(row['createdAt'].replace('Z', '+00:00'))
            resolved = datetime.fromisoformat(row['resolvedAt'].replace('Z', '+00:00')) if row['resolvedAt'] else None
            if created.tzinfo is None or (resolved and resolved.tzinfo is None):
                raise ValueError('Timestamp missing timezone')
            if (row['status'] == 'Resolved') != bool(resolved):
                raise ValueError('Resolved status and timestamp must agree')
            con.execute('INSERT INTO requests VALUES (?,?,?,?,?,?,?,?,?)', (
                row['id'], row['ward'], row['category'], row['priority'], row['status'],
                created.timestamp(), resolved.timestamp() if resolved else None,
                int(row['reopenCount']), {'Critical': 24, 'High': 48, 'Normal': 120}[row['priority']]))
    query = (Path(__file__).with_name('metrics.sql')).read_text()
    result = dict(con.execute(query, {'now': now.timestamp()}).fetchone())
    durations = [r[0] for r in con.execute("SELECT (resolved_at-created_at)/3600.0 FROM requests WHERE status='Resolved' ORDER BY 1")]
    n = len(durations)
    result['median_resolution_hours'] = (durations[(n-1)//2]+durations[n//2])/2 if n else None
    result['as_of'] = now.isoformat()
    con.close()
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('csv_path', type=Path)
    parser.add_argument('--as-of')
    args = parser.parse_args()
    try:
        print(json.dumps(summarize(args.csv_path, args.as_of), indent=2))
    except (ValueError, KeyError, sqlite3.Error, OSError) as error:
        parser.exit(2, f'Invalid export: {error}\n')
