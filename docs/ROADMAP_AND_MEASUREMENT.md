# Roadmap, measurement and experiment design

## Prioritisation

RICE = monthly requests reached × impact × confidence / person-weeks. Every input below is a planning assumption, not a researched estimate. Impact uses a simple 1–3 scale and confidence is 0–1.

| Feature | Reach | Impact | Confidence | Effort | Score | Decision |
|---|---:|---:|---:|---:|---:|---|
| SLA queue and named owner | 360 | 2 | 0.8 | 2 | 288.0 | MVP core |
| Resolution evidence + reopen | 240 | 3 | 0.8 | 3 | 192.0 | MVP quality gate |
| Automated SMS updates | 280 | 1 | 0.5 | 3 | 46.7 | Later; consent and delivery dependency |
| Low-connectivity field intake | 120 | 2 | 0.5 | 4 | 30.0 | Next discovery area |

The app lets a reviewer vary the second feature's effort from 1 to 8 person-weeks. Evidence remains a release requirement even if numerical rank drops; a score does not replace product judgement.

## Rollout proposal

| Stage | Deliverable | Exit criterion |
|---|---|---|
| Prototype (implemented) | Complete loop, sample data, metrics and tests | Functional browser journey and business rules pass |
| Discovery (proposed) | Five operator interviews and current-process map | Assumptions updated with documented observations |
| Usability (proposed) | Five task-based sessions | Critical task blockers fixed; misunderstandings documented |
| Pilot-ready (proposed) | Authenticated backend, roles, durable records, logs, accessibility | Security and operational sign-off; recovery tested |
| Two-week pilot (proposed) | One consenting service team and baseline | Closure quality reviewed; credible decision on continue/pivot |

## Metrics contract

**Candidate north star:** genuinely resolved service requests within SLA per week. The prototype can calculate recorded on-time closures; genuine resolution requires independent verification in a pilot.

| Metric | Definition | Limitation |
|---|---|---|
| Active | Status is not Resolved | Includes all age cohorts |
| Overdue | Active and current time ≥ creation + priority SLA | No business-hour calendars |
| At risk | Active and 0 < hours to deadline ≤ 12 | Fixed threshold is a hypothesis |
| On-time rate | Currently resolved by original deadline / currently resolved | Reopened cases leave denominator; can shift without new closures |
| Median resolution | Median creation-to-latest-resolution hours among currently resolved | Excludes unresolved cases; survivor bias possible |
| Ever reopened | Requests with reopenCount > 0 / all requests if a rate is needed | Not a post-closure cohort rate |

For a production impact evaluation, use a creation cohort with a fixed follow-up window and report unresolved cases explicitly. Stratify by priority/service and record staffing changes. Do not interpret higher raw closure counts as better service.

## Proposed event contract

The implementation stores local history events (`Request created`, `Assigned`, `In progress`, `Resolved`, `Reopened`, `Reassigned`). It does **not** send analytics events to a server.

Production proposal: `request_created`, `owner_assigned`, `work_started`, `resolution_recorded`, `request_reopened`, `intake_started`, `intake_validation_failed`. Common fields: event ID, server timestamp, request ID, actor role, service category, channel, schema version. Exclude resident identifiers and free-text descriptions from analytics events. Use idempotency keys for retries.

## Experiment proposal: guided vs longer intake

- Hypothesis: a guided form improves valid completion while preserving request quality.
- Primary metric: valid completed submissions / unique eligible participants who start intake.
- Unit: participant with stable random assignment and one analysed session; repeated sessions otherwise violate independence.
- Guardrails: invalid submissions, missing operational detail, abandonment on assistive technology, handling time.
- Example only: A = 120/200; B = 142/200. Absolute difference = 11 percentage points. Approximate 95% interval is about 1.7 to 20.3 percentage points.
- The app uses an unpooled standard error for the difference. All four success/failure cells must have at least 10 observations; otherwise it withholds the normal interval.
- Pre-register a sample-size calculation, minimum worthwhile effect and analysis horizon before collecting data. Do not repeatedly stop on statistical significance. A small fixed 200-per-arm example is not a power calculation.
- Decision: ship only if primary evidence, quality guardrails, accessibility and team capacity all support the change. The illustrative counts establish no measured improvement in JanSetu.

## Stakeholder operating cadence

Coordinator owns prioritisation; responder lead owns closure-evidence standards; engineering owns state integrity; analyst owns denominator checks. In a pilot, review overdue cases daily, closure quality twice weekly and metric definitions weekly. Roll back if requests are lost or closure history is inconsistent; revert to the agreed baseline queue while preserving exports.
