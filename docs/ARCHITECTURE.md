# Architecture and production gap

## Current implementation

A dependency-free static app separates pure domain functions from rendering and storage. The browser loads `index.html`, `style.css`, `app.js` and `domain.js`. Domain functions return new records; rendering does not directly rewrite historical records. State is stored as JSON under `jansetu-v1` in localStorage. Exports include operational fields, not description or history. A Python CLI reads the CSV into an in-memory SQLite table and runs an independently implemented metrics query.

Request fields: ID, title, description, category, ward, channel, priority, status, assignee, createdAt, resolvedAt, reopenCount, evidence, history. Internal timestamps are UTC epoch milliseconds; UI displays the browser's local timezone. Export uses ISO timestamps with timezone. IDs use 64 random bits from the browser's Web Crypto API; a production server must enforce uniqueness.

Allowed transitions: New→Assigned; Assigned→In progress; In progress→Resolved; Resolved→Reopened; Reopened→In progress. Reassignment is permitted for active requests without resetting the deadline. The original creation time is the sole SLA anchor.

## Security and data handling

All dynamic user strings inserted into HTML are escaped. CSV cells are quoted and spreadsheet formula prefixes are neutralised. Forms enforce length limits and enumeration choices; domain rules repeat validation. Native dialogs provide modal focus containment and Escape dismissal. No secrets, tracking SDKs or external runtime dependencies are required.

This is not a security boundary. Browser storage can be edited, cleared or blocked. Tabs can overwrite each other's latest state. No authentication or cross-device sync is implemented. Text evidence is a user's statement, not externally verified proof. Do not use real personal or sensitive records in the demo. localStorage errors produce a visible warning and session-only operation.

## Production design proposal (not implemented)

- HTTP API with authenticated roles: operator, coordinator, responder, reviewer.
- Relational requests table plus immutable request_events table; server-authoritative timestamps.
- Optimistic concurrency/version field to prevent lost updates. Atomic state transition + event insertion.
- Idempotent creation and channel delivery jobs; request IDs allocated or uniqueness-checked server-side.
- Tenant scoping, field-level redaction and access logging; least-privilege team access.
- Backup/restore, retention/deletion policy, observability, workload limits and incident playbook.
- Citizen tracking token distinct from internal request ID; authenticate before exposing private content.
- Outbox pattern for notifications with retries and delivery states; never present a queued message as delivered.

## Why not add machine learning now?

No representative labelled dataset exists here. SLA ordering is deterministic, testable and explainable. A future triage suggestion should be evaluated against coordinator decisions with human override and service-quality guardrails. Adding an unvalidated model would increase complexity without evidence of benefit.

## Dependencies and reproducibility

Runtime: modern browser supporting ES modules, Web Crypto, dialog and localStorage. Local serving: Python 3 standard library. Tests: Node 20+ and Python 3. No third-party package installation. CI actions are external runner tools; source code is not dependent on them for local use.
