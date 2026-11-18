---
title: "Create the local application scaffold"
ticket: 1
status: built
assignee: "Marianne"
baseline_revision: "3008b53ae9ac59be9009c592f1e13c3781f91902"
review: quick
review_source: pinned
review_loop_iteration: 0
lenses_ran: [quick]
context:
  - AGENTS.md
  - _bmad-output/initiative-learning-center/tickets/epic-application-foundation/tickets/story-create-the-local-application-scaffold.md
  - _bmad-output/initiative-learning-center/tickets/epic-application-foundation/epic-application-foundation.md
  - _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md
  - _bmad-output/initiative-learning-center/architecture-learning-center/shared-contracts.md
  - _bmad-output/initiative-learning-center/initiative-learning-center.md
  - _bmad-output/initiative-learning-center/TEAM-START-HERE.md
---

## Goal

Create the first reproducible local application baseline for four contributors. A fresh checkout must install one pinned Bun workspace, start a Vike React SPA and Hono API, load a nested route after refresh, reach the API through the local proxy, and use local SQLite plus shared Zod contracts. Keep identity, catalog data, production services, and source connections out of scope.

## Code Map

- The repository currently has no application manifests, frontend, backend, database, or root README. `AGENTS.md` identifies the stack and says this ticket must establish the commands.
- Add the workspace at root and under `apps/web`, `apps/api`, and `packages/contracts`. Keep Drizzle connection, configuration, migrations, and FTS5 smoke code under `apps/api/src/db` or `apps/api/scripts`.
- The only API behavior in this scaffold is versioned health. The browser consumes it through `/api/v1/health`; the Vite development proxy forwards that path to Hono on loopback.

## Design Notes

- Pin Bun 1.4.4 in root package metadata and pin every direct JS/TS dependency to an exact compatible stable version. Keep a single checked-in `bun.lock`; clean installation uses frozen lockfile mode.
- Use React, Vike with `vike-react`, Tailwind CSS, and strict TypeScript in the web; Bun and Hono in the API; Drizzle with Bun SQLite under `apps/api/src/db`; and versioned Zod schemas in contracts. Vike renders in SPA mode. Bind both development servers to `127.0.0.1`.
- Validate the health response in Hono before serialization and parse it in the browser using the same strict schema and inferred type. Do not duplicate the payload type. Object schemas reject unknown keys; request schemas do not coerce values. Keep omission distinct from `null` wherever fields are introduced.
- Configure a fresh SQLite database and migration path without creating `LearningItem` or employee-linked tables. The FTS5 smoke check creates a temporary virtual table, inserts and queries a row, then drops it even when the check fails.
- List only platforms actually supported and manually verified in the root README. Record OS, architecture, Bun version, and FTS5 result. The initial verification target is the available macOS ARM64 environment; do not claim unverified platforms as supported.
- Commit `.env.example` only. Default startup needs no credentials; database files, local records, dependencies, build output, and secrets stay ignored. No production auth, employee fixtures, SharePoint, search product feature, admin UI, CI, deployment, or domain schema.

## Tasks

1. Create the root workspace metadata, exact Bun pin, scripts, TypeScript base config, `.gitignore`, and one lockfile. Add manifests and strict TypeScript configs for all three workspace packages.
2. Build the smallest Vike SPA shell, a directly refreshable nested page, Tailwind integration, and Vite proxy bound to loopback. Add a Bun/Hono API server with `/api/v1/health` returning exactly `{"status":"ok"}` and no secret requirement.
3. Add `packages/contracts` with a versioned strict health response schema and inferred type. Validate the API response and browser response at runtime; cover strict-object, non-coercion, and omitted-versus-null semantics without inventing a product data model.
4. Add Drizzle/Bun SQLite configuration and migrations under `apps/api/src/db`; prove fresh database setup works without domain tables. Add an FTS5 create/insert/query/drop smoke script and ensure its local DB path is ignored.
5. Write the root README and `.env.example` with exact commands for clean install, database setup, migration, typecheck, API, web, and smoke checks. Record the supported platform, Bun version, and actual FTS5 result.

## Verification

- `bun install --frozen-lockfile`
- `bun run typecheck`
- `bun run db:migrate` against a newly created local database
- `bun run db:fts5-smoke`
- Start the documented API and web processes; request `http://127.0.0.1:<web-port>/api/v1/health` and confirm HTTP 200 with exactly `{"status":"ok"}`.
- Open the documented nested route directly and refresh it; confirm it renders and the browser validates the proxied health response.
- Confirm only one Bun lockfile is tracked and no database, credential, or real-person data is tracked.

## Plan Change Log

- 2026-11-18: Converted the metadata-only ready plan into an actionable implementation plan from the approved ticket and architecture contracts. Captured baseline revision `3008b53ae9ac59be9009c592f1e13c3781f91902` before implementation.

## Review Triage Log

- medium / patch — `apps/api/src/index.ts`: The original 400 response returned `field_errors: {}` for an unknown query key, despite the shared contract requiring JSON Pointer message arrays for validation errors. Confirmed with `?unexpected=value`; fixed by mapping Zod issues to escaped pointer paths and validating the error envelope. The proxied request now returns HTTP 400 with `/unexpected` and its message.
