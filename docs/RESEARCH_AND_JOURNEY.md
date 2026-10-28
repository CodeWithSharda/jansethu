# Research plan and service journey

**Evidence status:** desk reference + explicitly assumed user needs. No interviews or usability studies have been conducted for this project.

## Desk reference

The official [CPGRAMS homepage](https://pgportal.gov.in/) describes tracking a grievance by registration ID and an appeal facility for an unsatisfactory resolution (consulted 29 October 2026). This supports exploring a complete request-and-feedback loop. It does not establish JanSetu's user needs, SLA values, impact or government compatibility. JanSetu focuses on an independent service-team workflow.

## Discovery plan

Recruit five consenting participants with experience in help-desk, facilities or service operations. A campus facilities workflow is a feasible initial research context; it must not be represented as a municipal field study.

Ask about a real recent case rather than soliciting approval of the solution:

1. Walk me through the last request that changed hands more than once.
2. Where did the original information live? What was copied manually?
3. How did someone know the next action was theirs?
4. What happens if a request is marked resolved but the issue persists?
5. Which queue do you inspect at the start of your day?
6. What information should never be visible to other teams?
7. When does your current spreadsheet or ticketing tool work well?

Do not record resident names, phone numbers or exact addresses. Ask permission for notes; use participant IDs P1–P5 and let participants withdraw. Document counterexamples as well as supporting observations.

## Journey and service blueprint

| Stage | User action | Interface | Operational handoff | Failure / recovery |
|---|---|---|---|---|
| Capture | Operator records fictional service issue | Shared intake form | New request enters queue | Reject invalid fields with actionable message |
| Triage | Coordinator checks category, urgency and deadline | Search, filters and detail view | Select a response team | Leave unassigned visibly New instead of pretending work started |
| Own | Team accepts work | Assigned state and owner field | Start work explicitly | Reassign with preserved history if wrong team |
| Execute | Responder investigates issue | In progress | Work happens outside prototype | Overdue queue exposes stalled work |
| Resolve | Operator records what was repaired and checked | Evidence note and Resolved | Outcome enters resolved analytics cohort | Block vague/empty closure note |
| Contest | Operator records an unresolved issue | Reopened with reason | Return to active queue | Preserve deadline and evidence; do not hide delay by resetting clock |

Three channels share the same data contract. In v1 the operator chooses a source label; there are no live channel adapters.

## Usability protocol (proposed)

Five sessions, 15–20 minutes each. Use fictional data and avoid coaching the participant through the task.

| Task | Success criterion | Capture |
|---|---|---|
| Record a lighting issue from help desk | Correct category/channel and valid request created | Completion, time, validation errors |
| Find overdue work in one ward | Correct subset or request identified | Filter mistakes, time |
| Assign and start work | Correct owner and In progress state | Misrouting, skipped-step attempts |
| Resolve with useful evidence | Evidence explains repair/check | Note quality, task success |
| Reopen an unresolved case | Reopened with original deadline intact | Comprehension of state and timing |

Use observed task success to prioritise fixes; five sessions cannot establish a population-wide conversion uplift. Log findings using: participant ID, task, observation, severity, evidence, design response, retest result. Keep the findings table empty until actual sessions happen.

## Transfer from placement operations

The relevant connection to Rishabh's experience is accountable handoffs: assigning duties, following up on missing actions and handling last-minute changes. This is a motivation for the problem choice, not evidence that municipal teams face the same issues or that this product was used in campus placements.
