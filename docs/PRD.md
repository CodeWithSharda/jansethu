# Product requirements — JanSetu v1

Owner: Rishabh Sharda · Version: 1.0 · 29 October 2026

## Problem and decision

**Hypothesis:** when civic service intake arrives through multiple channels, requests can lose ownership and closure can become an administrative event without adequate explanation. This is a discovery hypothesis, not a validated claim about an organisation.

**Decision:** prototype the coordinator's smallest complete operational loop before introducing predictive models or external integrations. The loop is capture, assign, start work, resolve with evidence, and reopen with a reason.

**Intended outcome:** more genuinely resolved requests within an agreed service deadline. A real pilot must measure this outcome; the prototype only demonstrates the workflow.

## Users and jobs

| User hypothesis | Job to be done | Pain to validate | MVP response |
|---|---|---|---|
| Help-desk operator | Record a service issue without losing context | Repeated entry and incomplete descriptions | Common intake schema and validation |
| Coordinator | Know what needs intervention and who owns it | No shared queue or clear responsibility | Filters, accountable assignment, SLA visibility |
| Field responder | Understand the issue and record the work done | Ambiguous handoff and weak closure evidence | Description, team ownership and resolution note |
| Resident (future portal) | Understand progress and contest inadequate resolution | Closure without a useful explanation | Reopening model in operator prototype; resident UI deferred |

## Scope and requirements

| ID | Priority | Requirement | Acceptance condition |
|---|---|---|---|
| R1 | Must | Validated intake | Title 8–100 characters; description 20–1,000; recognised category/ward/channel/priority |
| R2 | Must | Ownership before execution | Only a known response team can advance New to Assigned; direct New→In progress is rejected |
| R3 | Must | Ordered state machine | Only declared transitions are allowed; reassignment does not change workflow stage |
| R4 | Must | Meaningful closure and reopen note | At least 15 trimmed characters; timestamps and prior history preserved |
| R5 | Must | Clear time semantics | SLA starts at creation and never resets on reassignment or reopening; closure exactly on deadline counts as met |
| R6 | Must | Explainable metrics | Every ratio has a stated cohort; no resolved requests produces an undefined rate, shown as a dash |
| R7 | Should | Portable review | CSV export escapes content, quotes and formula prefixes; Python/SQL reproduces metrics |
| R8 | Should | Visible product trade-offs | RICE inputs and experiment assumptions visible; small counts suppress unreliable normal interval |
| R9 | Must | Honest scope | Synthetic data and browser-local storage clearly disclosed; no field-impact claims |

## Non-goals

Production user management, resident identity capture, government APIs, political profiling, electoral targeting, notification delivery, machine-learning triage, document/image uploads, geolocation, multilingual translations and background offline sync. These require different validation, security and delivery work.

## Product assumptions

- Normal requests: 120-hour SLA; High: 48 hours; Critical: 24 hours. These are **prototype defaults**, not official deadlines.
- A request becomes at risk when 12 hours or less remain; zero remaining hours is overdue.
- Team-level ownership is sufficient to demonstrate the loop. Individual assignment would require accounts and access controls.
- Text evidence is useful for prototype testing but not independent verification of completed work.
- Cross-service assignment remains possible so coordinators can handle exceptions; a production pilot should measure misrouting before enforcing category restrictions.

## Success and release criteria

Technical release: business-rule tests pass, browser can complete the journey, known boundaries documented, no misleading sample metrics. Product validation: complete interviews and usability tasks before claiming fit. Production release: authenticated roles, server-side state enforcement, durable storage, backup/retention policy, monitoring, accessibility testing and legal/privacy review appropriate to actual use.

## Alternatives considered

1. **Generic dashboard:** quick to demonstrate but cannot show ownership or resolution. Rejected as the main product.
2. **ML priority scoring:** difficult to validate without labelled cases; may obscure operational reasoning. Deferred.
3. **Full government platform clone:** too broad and implies integrations not available. Rejected.
4. **Spreadsheet-only queue:** a useful real-world baseline for a pilot. It could be sufficient for low volume; the product must justify switching through measured handoff quality, not appearance alone.

## Open decisions for discovery

Who may set priority? What proof is adequate for different services? When is a case misrouted rather than reopened? Do team leads need batch assignment? What does success mean to residents? How should sensitive descriptions be redacted? These remain unanswered pending research.
