# Interview walkthrough and resume use

## A 45-second explanation

“I built JanSetu to explore a product problem around service operations: a request can be recorded without a clear owner or a credible closure. I designed a complete journey from intake to assignment, resolution and reopening, then implemented it as an interactive prototype. I also wrote the PRD, prioritised the roadmap using RICE, and defined acceptance criteria and measurement rules. The project uses synthetic data, so I do not claim field impact. What I can demonstrate is the workflow, the product trade-offs, 33 automated tests, and matching analytics in JavaScript and Python/SQL.”

## Why this fits a product associate role

| Responsibility | What to demonstrate |
|---|---|
| Own strategy and roadmap | Explain the user/problem hypothesis, MVP boundary, RICE limitations and staged validation |
| Own user journeys | Walk through all five states and how a failed resolution returns to work |
| Define requirements | Show R1–R9 in the PRD and the state-transition rules |
| Partner with stakeholders | Explain coordinator/respondent/engineering responsibilities and operational cadence |
| Define acceptance testing | Demonstrate an attempted closure without evidence and the resulting error |
| Resolve operational issues | Show reassignment, overdue visibility, reopening and preserved history |

## Likely questions and defensible answers

**Why this project?**
“My experience coordinating placement activities made ownership and handoffs tangible to me. I chose a service-workflow hypothesis where I could demonstrate those product skills. I still need discovery with actual service operators before treating the hypothesis as validated.”

**How did you research the problem?**
“I reviewed the public CPGRAMS tracking-and-appeal model as a domain reference. I documented assumptions and designed an interview plan. I have not yet conducted those interviews.”

**What would you build first?**
“The complete ownership-and-resolution loop. A feature-rich dashboard would still fail if no team owned the request. RICE helps order opportunities, but closure quality is a minimum requirement.”

**What is your north-star metric?**
“Genuinely resolved requests within SLA. The prototype measures recorded closures, which is only a proxy. In a pilot I would verify closure quality, track reopenings and analyse fixed cohorts so unresolved cases are not hidden.”

**What did you deliberately exclude?**
“Accounts, messaging delivery, government integrations and ML triage. They introduce dependencies or validation work that would distract from proving the basic workflow.”

**What is technically interesting?**
“The state machine is explicit, reopening preserves the original SLA, metric denominators are visible, and an independent SQLite analysis reproduces the dashboard metrics. Tests cover boundaries and failure paths, not just successful clicks.”

**Did the experiment show improvement?**
“No. The calculator uses illustrative counts. It demonstrates how I would assess evidence, including uncertainty, small counts and guardrails. I would not put that lift on a resume.”

**What would break at scale?**
“Browser storage is single-user and has no server enforcement or concurrency control. Production needs authenticated roles, durable data, transactional events, monitoring and a tested operational process.”

**Did you use AI?**
“Yes, I used AI assistance to accelerate implementation and documentation. I would be responsible for understanding the workflow, checking the calculations, testing the behaviour and making the product decisions. I can walk through the code and limitations.”

## 90-second demo script

0–15 s: show overview and explain synthetic data. 15–45 s: create a fictional request, assign, start work, attempt empty closure, then resolve with evidence. 45–60 s: reopen with a reason and show unchanged deadline/history. 60–75 s: show metrics and one denominator caveat. 75–90 s: change roadmap effort and explain why RICE does not override release requirements.

## Resume entry

**JanSetu — Civic Service Operations & Product Strategy | JavaScript, Python, SQL**

- Built a civic service-request prototype with a five-state workflow, team ownership, SLA tracking, evidence-based closure and reopening across four service categories.
- Defined the PRD, user journey, RICE-prioritised roadmap and experiment plan; validated business rules with 33 automated tests and independently reproduced dashboard metrics using Python/SQLite.

Review every claim and learn the implementation before using these lines. Do not claim 72 users: there are 72 synthetic requests. Do not claim implementation of authentication, SMS, interviews or production deployment unless that work is subsequently completed.

## Next work that would most strengthen the application

Conduct five real, consent-based usability sessions, record what failed, fix one repeated issue and publish the before/after evidence. A small genuine study is stronger than fabricated adoption numbers. Eligibility and academic screening remain separate from project strength.
