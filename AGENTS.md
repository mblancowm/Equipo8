<!-- bmad:context -->
<!-- Verified 2026-11-20 against 0d7dadc5f6abf2d2eee96bbd3b96456fb8e30a4b. Managed by bmad-project-context; edits inside this block are replaced on refresh. -->

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
- Whenever a ticket file or tickets.toml changes, update `_bmad-output/initiative-learning-center/backlog-review.html`, including cards, dependencies, and snapshot date; verify its ticket references against `tickets.py status`.
- Follow README.md for application commands; do not infer startup or verification steps.

<!-- /bmad:context -->
