CREATE TABLE requests (
  id TEXT PRIMARY KEY,
  ward TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('Critical','High','Normal')),
  status TEXT NOT NULL CHECK (status IN ('New','Assigned','In progress','Resolved','Reopened')),
  created_at REAL NOT NULL,
  resolved_at REAL CHECK (resolved_at IS NULL OR resolved_at >= created_at),
  reopen_count INTEGER NOT NULL CHECK (reopen_count >= 0),
  sla_hours INTEGER NOT NULL CHECK (sla_hours > 0)
);
CREATE INDEX request_status ON requests(status);
