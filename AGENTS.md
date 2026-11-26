<!-- bmad:context -->
<!-- Verified 2026-11-26 against 03cc51871f9f344e7547274c02f614b544efac48. Managed by bmad-project-context; edits inside this block are replaced on refresh. -->

## Equipo8 — Learning Center

Learning Center is a planned internal learning and certification application. Its company-standard development baseline is React with strict TypeScript, Vike (`vike-react`), and Tailwind CSS in `apps/web`; Bun with Hono in `apps/api`; Drizzle ORM with SQLite for zero-configuration local storage in `apps/api/src/db`; and shared Zod schemas in `packages/contracts`. TypeScript `strict` mode applies to all three packages. Production database, hosting, and identity remain decisions for their organizational owners. Planning lives in _bmad-output/initiative-learning-center/; cross-epic rules are in its architecture spine and shared-contracts.md.

## Policy

- Use synthetic identities and records locally; do not connect real employee data or enable production access until identity, access, classification, retention, and regional approvals are recorded.
- Enforce authorization in the backend on every employee-specific read, write, search result, count, and snippet; UI visibility is never the security boundary.
- Do not invent an identity provider, employee key, production hosting target, source permission, or employee-record field; read the relevant ticket and shared contract.

## Where things are

- Select work from _bmad-output/initiative-learning-center/tickets/; prerequisites live in each ticket and tickets.toml.
- Read architecture-learning-center.md and shared-contracts.md before changing APIs, shared data, authentication, synchronization, or locale/search behavior.
- Ticket 5.1 defines the scaffold scope; README.md documents local install, database, type-check, startup, and verification commands.

## Running and verifying

- Run `python3 _bmad/method/scripts/tickets.py --project-root . next _bmad-output/initiative-learning-center` to find ready tickets; use `status` with the same folder to validate the backlog. This environment's Python has PyYAML 6.0.3.
- Whenever ticket content, a `tickets.toml`, assignment, status, plan, or dependency changes, run `python3 _bmad-output/initiative-learning-center/scripts/refresh_backlog_web.py`. It refreshes `backlog-review.html` and every ticket's matching HTML view from the BMad ticket tree. Every backlog card must open its HTML ticket view; do not link the card to Markdown or show “view not created.”
- After refreshing, validate ticket references with `python3 _bmad/method/scripts/tickets.py --project-root . status _bmad-output/initiative-learning-center` and confirm every ticket card links to an existing HTML view.
- Follow README.md for application commands; do not infer startup or verification steps.

<!-- /bmad:context -->
