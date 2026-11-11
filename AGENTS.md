<!-- bmad:context -->
<!-- Verified 2026-11-11 against 92909a5. Managed by bmad-project-context; edits inside this block are replaced on refresh. -->

## Equipo8 — Learning Center

Learning Center is a planned internal learning and certification application. Its selected development baseline is Python/Django REST, React Router SPA, and PostgreSQL. Planning lives in _bmad-output/initiative-learning-center/; cross-epic rules are in its architecture spine and shared-contracts.md.

## Policy

- Use synthetic identities and records locally; do not connect real employee data or enable production access until identity, access, classification, retention, and regional approvals are recorded.
- Enforce authorization in the backend on every employee-specific read, write, search result, count, and snippet; UI visibility is never the security boundary.
- Do not invent an identity provider, employee key, production hosting target, source permission, or employee-record field; read the relevant ticket and shared contract.

## Where things are

- Select work from _bmad-output/initiative-learning-center/tickets/; prerequisites live in each ticket and tickets.toml.
- Read architecture-learning-center.md and shared-contracts.md before changing APIs, shared data, authentication, synchronization, or locale/search behavior.
- The application scaffold and local startup instructions belong to ticket 5.1; manifests and runnable app commands do not exist yet.

## Running and verifying

- Run uv run _bmad/method/scripts/tickets.py --project-root . next to find ready tickets.
- Do not guess app startup or verification commands; ticket 5.1 must document them when it creates the scaffold.
