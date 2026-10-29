# JanSetu — Civic Operations Product Lab

**A product-management portfolio project by Rishabh Sharda.**

A service request should have an owner, a clear deadline, and a credible explanation of how it was resolved. JanSetu turns that idea into a working civic-operations prototype and a documented product case study.

**Status:** functional browser-local prototype, synthetic dataset, no live users or field impact claimed. Built with AI assistance; product decisions and implementation should be reviewed and understood before presentation.

**[Open the live demo](https://codewithsharda.github.io/jansethu/)** · [View passing acceptance tests](https://github.com/CodeWithSharda/jansethu/actions/workflows/ci.yml)

## A 90-second review

1. Open **Overview** for service health and overdue work.
2. Open **New request**, submit a fictional issue and assign a response team.
3. Start work. Try closing without evidence: the product blocks it.
4. Add evidence, resolve, then reopen with a reason. The original deadline and full history remain.
5. Check **Service insights**; counts and denominators respond to your actions.
6. Open **Product lab**: change a RICE effort assumption; evaluate an illustrative A/B result.
7. Read the [product requirements](docs/PRD.md), [research and journey](docs/RESEARCH_AND_JOURNEY.md), [roadmap and measurement plan](docs/ROADMAP_AND_MEASUREMENT.md), and [acceptance evidence](docs/ACCEPTANCE.md).

## Run in VS Code

No npm dependencies, API keys, databases or paid services are needed.

```bash
# In the project folder, with Python 3 installed:
python -m http.server 8000 --directory dist
# On macOS/Linux, use python3 instead of python if needed.
```

Open **http://localhost:8000** in your browser. Do not double-click index.html: ES modules require HTTP.

With Node.js 20+ and Python 3 available:

```bash
npm test
python3 analytics/analyze.py data/demo-requests.csv --as-of 2026-10-29T09:00:00Z
```

On Windows, use `python analytics/analyze.py ...`; the cross-language test runner uses `python3` by default. Set `PYTHON=python` if that is your installed command. No `npm install` is required.

## What works

| Area | Implemented behaviour |
|---|---|
| Intake | Validated issue title and description; category, ward, channel and priority |
| Ownership | Required team assignment; reassignment with history |
| Workflow | New → Assigned → In progress → Resolved → Reopened → In progress |
| Quality | Evidence/reason required for resolution and reopening |
| SLA | Priority-based deadlines, overdue and 12-hour risk window; original deadline retained |
| Queue | Search and intersecting status, ward and category filters |
| Analytics | Live counts, visible denominators, median time, ward comparison and channel mix |
| Product lab | Editable RICE effort assumption, approximate difference-in-proportions interval |
| Portability | Local browser persistence, CSV export, independent Python/SQLite analysis |
| Verification | 33 automated tests, including JavaScript/SQL agreement and boundary cases |

## Why this is a product project

This project goes beyond an analytics dashboard: the core deliverable is an operational loop, with trade-offs and acceptance criteria. The companion documents show strategy, user journey, prioritisation, measurement, release gates and stakeholder handoffs. The [interview walkthrough](docs/INTERVIEW_GUIDE.md) explains the decisions and their limits.

## Architecture

- `dist/domain.js`: deterministic business rules, metrics, RICE and statistical calculations.
- `dist/app.js`: DOM rendering, event handlers, local persistence and CSV download.
- `dist/style.css`: responsive visual system, keyboard focus and native form controls.
- `analytics/`: standard-library Python and SQLite to independently reproduce exported metrics.
- `tests/`: Node test runner; business rules and cross-language consistency checks.
- `data/`: reproducible synthetic snapshot anchored to **2026-10-29 09:00 UTC**.
- `docs/`: strategy, journey, roadmap, acceptance, architecture and interview materials.

The browser generates the same 72-case pattern relative to first launch. Its live deadlines therefore differ from the fixed CSV snapshot. Export your current browser data to analyse the same cohort; use the same `--as-of` timestamp for exact comparison.

## Deployment

`dist/` is a complete static site. Serve it on any static host. For GitHub Pages, select **GitHub Actions** under repository Settings → Pages, then run the included **Publish demo to GitHub Pages** workflow. The workflow is manual so deployment remains an explicit action. CI runs acceptance tests on pushes and pull requests.

## Honest boundaries

This is not an official government service or a production case-management system. It has no backend, authentication, citizen portal, SMS/WhatsApp delivery, photo uploads, or tamper-resistant audit trail. Channel choices are metadata. SLAs and RICE estimates are illustrative assumptions. No real personal data is required or appropriate. Browser history can be edited through developer tools; production would need server-side controls. All research interviews and pilot studies in the docs are **proposed**, not conducted.

Domain inspiration: [CPGRAMS](https://pgportal.gov.in/) publicly describes grievance tracking and appeals. JanSetu independently explores service-team operations; it has no government connection or integration.

## Resume-ready wording

**JanSetu — Civic Service Operations & Product Strategy | JavaScript, Python, SQL**

- Built a civic service-request prototype with a five-state workflow, team ownership, SLA tracking, evidence-based closure and reopening across four service categories.
- Defined the PRD, user journey, RICE-prioritised roadmap and experiment plan; validated business rules with 33 automated tests and independently reproduced dashboard metrics using Python/SQLite.

Use these claims only after reviewing the project and being able to explain it. Do not claim real adoption, conversion lift, reduced resolution times, or research interviews that have not happened.
