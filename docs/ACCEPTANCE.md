# Acceptance and verification record

Verified 29 October 2026. Automated test runner: Node native test runner with a Python 3/SQLite cross-check. Browser: cloud Chrome against the HTTP local preview.

## Automated verification

`npm test`: **33 passed, 0 failed**.

Coverage includes input bounds, enumerated values, state transition guards, owner requirements, resolution/reopening evidence, immutable operations, original-deadline retention, SLA boundaries, empty metric denominators, even-population median, reopened cohorts, intersecting filters, RICE inputs, experiment intervals, insufficient counts, invalid counts, CSV formula/quote/newline escaping, deterministic seed data, non-secure HTTP ID generation, and JavaScript/Python/SQL agreement for full, empty and all-open datasets.

These are functional correctness tests, not a performance benchmark or comprehensive security audit.

## Browser UAT performed

| Scenario | Result | Observed evidence |
|---|---|---|
| Overview renders | Pass | Metrics, queue, workload, navigation and synthetic-data disclosure visible |
| Create request over plain HTTP | Pass after fix | New request appears with a random ID and New state |
| Assign team | Pass | Assigned state, owner and history entry appear |
| Start work | Pass | In progress state and history entry appear |
| Close without evidence | Pass | Error displayed; request remains In progress |
| Close with evidence | Pass | Resolved state, Met SLA and evidence in history |
| Reopen with reason | Pass | Reopened state, reopen count 1 and original deadline unchanged |
| Reload persistence | Pass | Created and reopened QA request remains after reload |
| Search | Pass | Query narrows queue to the one QA request |
| Intersecting filter | Pass | Resolved filter plus reopened QA query gives explicit empty state |
| Roadmap effort sensitivity | Pass | Reducing effort from 3 to 1 changes score 192→576 and moves feature above score 288 |
| Experiment example | Pass | 11.0 percentage-point difference; interval 1.7–20.3; hypothetical label visible |

The first intake browser test found `crypto.randomUUID` unavailable on an insecure HTTP origin. Replaced it with `crypto.getRandomValues`, added a regression test and repeated creation successfully.

## Remaining checks and limits

Responsive CSS is implemented but no physical mobile-device or screen-reader study has been performed. No load tests, authenticated multi-user tests, real-data pilot or external integration tests apply to this static prototype. Browser CSV download handling is not evidence of spreadsheet compatibility across every spreadsheet application. localStorage is not a reliable production data store.

## Manual regression checklist for future edits

1. Test malformed/empty intake; valid intake; assign; start; reject empty closure; close; reopen.
2. Confirm SLA deadline remains unchanged and resolved cohort changes correctly.
3. Search/filter to zero results, clear filters and export current subset.
4. Reload and verify persistence; block browser storage and check warning/export fallback.
5. Test all pages at narrow width, keyboard-only navigation, dialog Escape, focus and contrast.
6. Compare a fresh CSV export with Python/SQL at a common as-of timestamp.
7. Try equal/negative/small/invalid experiment inputs; check uncertainty and errors.
8. Check all published docs and links before describing new features on a resume.
