---
id: 1
type: story
title: "Create the local application scaffold"
parent: epic-application-foundation
covers: [R1]
after: []
refined: true
hitl: true
risk: medium
---

# Create the local application scaffold

## Description

Create the `apps/web`, `apps/api`, and `packages/contracts` workspace against the shared development contracts. The assignee manually verifies a clean local start and FTS5 support on every supported development platform using synthetic data only; no production identity, employee data, or source access is added.

## Requirements

Verify: A new contributor follows the root README from a clean checkout, starts the Vike web app and Bun/Hono API with local SQLite, refreshes a nested web route, and receives the documented healthy API response through the local proxy; the assignee records FTS5 results for the supported development platforms.

## Acceptance Criteria

1. **A clean checkout installs one pinned Bun workspace (R1)**
   **Given** a clean checkout
   **When** a contributor follows the install command in the root `README.md`
   **Then** repository metadata pins the Bun release, direct dependencies have exact versions, and one checked-in Bun lockfile resolves the web, API, and contracts workspace packages; the Hono API starts without a committed secret.
   **And** the install succeeds from that lockfile without regenerating it; missing pins, a lockfile that cannot reproduce the workspace, or an API start that requires a committed secret fails this criterion.
2. **The web app and API work through the local route contract (R1)**
   **Given** the documented install has completed
   **When** a contributor starts the documented web and API commands, opens a nested Vike route directly, refreshes it, and requests `/api/v1/health` through the Vike/Vite server
   **Then** `apps/web` uses React, strict TypeScript, Vike with `vike-react`, and Tailwind CSS; `apps/web`, `apps/api`, and `packages/contracts` enable TypeScript `strict` mode; the root README documents a no-emit type-check command for every package; Vike/Vite binds to `127.0.0.1`; the nested route renders after refresh; and the proxy reaches the Bun/Hono API.
   **And** the health route returns HTTP 200 with `{"status":"ok"}`; a missing strict setting or type-check command, a failed nested-route refresh, a health request that works only at the API origin, or a different health response fails this criterion.
3. **Local SQLite and FTS5 are ready without defining catalog data (R1)**
   **Given** a fresh local configuration
   **When** a contributor runs the documented database and migration commands and the assignee runs the documented FTS5 smoke check
   **Then** Drizzle connection and migration setup are contained in `apps/api/src/db`, the SQLite file is outside tracked source, setup succeeds against a fresh database, and an ephemeral FTS5 table can be created, queried, and removed on every OS/architecture listed as supported in the root `README.md`.
   **And** the README records each supported platform, Bun version, and check result; a migration failure or FTS5 failure on any listed platform fails this criterion. The scaffold adds no canonical `LearningItem` or employee-linked schema.
4. **The shared contract validates both runtime boundaries (R1)**
   **Given** the web app and API are installed
   **When** the API produces the health response and the browser consumes it
   **Then** both use the same versioned Zod schema and inferred type from `packages/contracts`, with API response validation and browser response parsing and no duplicated handwritten health payload type; request and response object schemas reject unknown keys, request schemas do not coerce values implicitly, and schemas distinguish omitted from nullable fields.
   **And** a missing runtime check, unknown-key acceptance, implicit request coercion, or a mismatch in omitted-versus-null behavior fails this criterion.
5. **Local setup is safe and documented (R1)**
   **Given** the API and web settings are configured
   **When** a contributor reads the root `README.md` and follows it from a clean checkout
   **Then** exact clean-install, database, migration, type-check, API, web, and smoke-check commands are documented; `.env.example` explains required settings; the local app starts without credentials; and no credentials, local database file, or real employee data are tracked.
   **And** missing commands, undocumented required settings, a credential-dependent local start, or tracked local data fails this criterion.
6. **The scaffold stays within the approved boundary (R1)**
   **Given** identity and source decisions remain open
   **When** this story is reviewed
   **Then** it includes no production sign-in provider, real employee identity or fixture, employee-linked schema, SharePoint credential, source connection, employee search, admin forms, source synchronization, CI, production database selection, or deployment.
   **And** the canonical `LearningItem` schema remains owned by ticket 5.7, and a local identity adapter is allowed only if ticket 1.2 approves its exact development-only contract and production exclusion.

## Boundaries

- Do not implement employee search, admin forms, the canonical `LearningItem` schema owned by ticket 5.7, employee-record schema, production authentication or access, source synchronization, CI, production database selection, or deployment in this story.
- Do not add a local identity adapter unless ticket 1.2 approves the exact development-only contract and its production exclusion.
- Keep the Vike/Vite development server bound to loopback; do not expose it on the local network.
- Put application setup commands in the repository root `README.md` and distinguish them from planning-only commands in `_bmad-output`.

## References

- parent — _bmad-output/initiative-learning-center/tickets/epic-application-foundation/epic-application-foundation.md, Requirements and Constraints
- architecture — _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md, AD-8, AD-10, AD-11, AD-13, AD-14, and AD-16
- contract — _bmad-output/initiative-learning-center/architecture-learning-center/shared-contracts.md, API and browser routing, Shared Zod contracts, and Local development
- initiative — _bmad-output/initiative-learning-center/initiative-learning-center.md, Constraint RULE-6
- team guide — _bmad-output/initiative-learning-center/TEAM-START-HERE.md, Decisiones de desarrollo and Orden para comenzar

## Notes

- Decision: 2026-11-17 — Render the Vike client in SPA mode; revisit SSR only if a product requirement needs it.
- Decision: 2026-11-17 — Use Bun workspaces with one checked-in Bun lockfile for JavaScript/TypeScript packages.
- Decision: 2026-11-17 — Verify FTS5 by creating and querying an ephemeral table on each supported development platform and record platform, Bun version, and result in the root `README.md`.
- Decision: 2026-11-17 — `GET /api/v1/health` returns HTTP 200 with `{"status":"ok"}`, validated against the shared versioned Zod schema.
- Risk rationale: Medium because a broken or inconsistent scaffold blocks parallel work and encourages incompatible local setups.
- Beyond-criteria check: A second developer follows the instructions from a clean checkout and verifies the database, SPA, proxied API health route, and FTS5 on the listed platforms without help from the author.
