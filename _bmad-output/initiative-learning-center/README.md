# Learning Center — team start

Status: development decisions recorded; application code has not been scaffolded.
Updated: 2026-11-11

## What is settled for development

- One repository with a Django REST API, a React Router SPA, and PostgreSQL.
- Selected versions and dependency-lock decisions live in the architecture spine.
- The API, local proxy, identity boundary, record ownership, source-run lifecycle, and bilingual-search rules live in architecture-learning-center/shared-contracts.md.
- The UI has English and Spanish locale support and targets WCAG 2.2 Level AA.
- Local development uses synthetic identities and data only.

## First four work packets

Choose one person for each packet. All four are ready to start in parallel:

| Person | Ticket | First output |
| --- | --- | --- |
| Developer A | 5.1 — local application scaffold | One documented local start path for the SPA, API, and PostgreSQL |
| Developer B | 5.2 — identity and access policy | Approved identity key, role matrix, and named production-data gates |
| Developer C | 5.3 — learning catalog field dictionary | Approved learning-item fields, ownership, validation, and search metadata |
| Developer D | 5.4 — candidate SharePoint verification | Source map, sample schema, permission decision, and unsupported cases |

The application-foundation epic is first in build order. Tickets 5.1, 5.2, 5.3, and 5.4 have no prerequisites and can start in parallel. Once 5.1 and 5.3 finish, ticket 5.7 creates the one canonical LearningItem schema used by manual-entry story 2.2 and source-import story 3.2.

## How the team starts

1. Map Developers A–D to the four people and put the names in the ticket tracker or the team start guide.
2. Work one ticket per branch. Use a short branch name such as codex/learning-center-5-1-scaffold; have a different team member review the change before merge.
3. Read the ticket and its linked contracts before changing API, record, identity, or source behavior.
4. Record a shared decision in the architecture spine or shared-contracts.md, then update affected tickets before coding against the changed contract.
5. Use synthetic fixtures only until the access and data approvals listed in TEAM-START-HERE.md are recorded.

These branch and peer-review rules are this kickoff's team convention. The repository has no configured branch protection, pull-request template, CI, or merge policy yet.

## Current commands

The application does not have backend/frontend manifests or runnable commands yet. Ticket 5.1 must create lockfiles and document the exact startup and smoke-check commands before the team relies on them.

To see the current ready tickets:

    uv run _bmad/method/scripts/tickets.py --project-root . next

## Planning package

- Team kickoff and remaining approvals: TEAM-START-HERE.md
- Initiative and ticket backlog: initiative-learning-center.md and tickets/
- Product requirements: prd-learning-center/prd-learning-center.md
- UX contracts: ux-learning-center/DESIGN.md and ux-learning-center/EXPERIENCE.md
- Architecture decisions: architecture-learning-center/architecture-learning-center.md
- Cross-developer API, identity, data, synchronization, and locale/search contract: architecture-learning-center/shared-contracts.md

No sprint dates or estimates are set because the team did not provide a sprint cadence or individual availability.
