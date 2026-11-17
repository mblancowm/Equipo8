---
id: 1
type: story
title: "Create the local application scaffold"
parent: epic-application-foundation
covers: [R1]
after: []
refined: false
hitl: true
risk: medium
---

# Create the local application scaffold

## Description

Create the `apps/web`, `apps/api`, and `packages/contracts` workspace against the shared development contracts. The developer manually verifies a clean local start using synthetic data; no production identity, employee data, or source access is added.

## Requirements

Verify: A new contributor follows the documented clean-install steps, starts the Vike web app and Bun/Hono API with local SQLite, and sees the web app and a successful API health response through the local proxy.

## Acceptance Criteria

1. **The repository has a reproducible Bun workspace**
   **Given** a clean checkout
   **When** a contributor follows the backend instructions
   **Then** Bun is pinned in repository metadata, the Bun lockfile covers workspace packages, and the Hono API starts without a secret committed to the repository.
2. **The repository has the approved web baseline**
   **Given** a clean checkout
   **When** a contributor follows the web instructions
   **Then** `apps/web` uses React, strict TypeScript, Vike with `vike-react`, and Tailwind CSS, and the local Vike/Vite server binds to 127.0.0.1. `apps/web`, `apps/api`, and `packages/contracts` all enable TypeScript `strict` mode, and a documented root command runs the TypeScript compiler in no-emit mode for every package.
3. **The shared contract package validates both runtime boundaries**
   **Given** the web app and API are installed
   **When** a contributor inspects their request and response validation
   **Then** both consume versioned Zod schemas and inferred TypeScript types from `packages/contracts`, with no duplicated handwritten API payload types; request and response object schemas reject unknown keys, request schemas do not coerce values implicitly, and schemas distinguish omitted from nullable fields.
4. **Local SQLite and API routing work together**
   **Given** the local Drizzle schema and SQLite migrations are applied
   **When** the contributor opens and refreshes a nested web route and requests `/api/v1/health` through the local Vike/Vite server
   **Then** the route loads after refresh, the proxied API returns the documented healthy response, and the selected Bun/SQLite build supports FTS5 for the later search story.
5. **Local configuration is safe and documented**
   **Given** the API and web settings are configured
   **When** the contributor reads the root development instructions
   **Then** clean-install, database, migration, type-check, API, and web commands are exact, required environment variables are explained in `.env.example`, and no credentials, local database file, or real employee data are committed.
6. **The scaffold stays inside the approved boundary**
   **Given** identity and source decisions remain open
   **When** this story is reviewed
   **Then** it includes no production sign-in provider, real employee identity, real employee fixture, SharePoint credential, or source connection.

## Boundaries

- Do not implement employee search, admin forms, employee-record schema, production authentication or access, source synchronization, CI, production database selection, or deployment in this story.
- Do not add a local identity adapter unless ticket 1.2 approves the exact development-only contract and its production exclusion.
- Keep the Vike/Vite development server bound to loopback; do not expose it on the local network.
- The root developer instructions must distinguish commands created by this story from planning-only commands in _bmad-output.

## References

- parent — _bmad-output/initiative-learning-center/tickets/epic-application-foundation/epic-application-foundation.md, Requirements and Constraints
- architecture — _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md, AD-8, AD-11, AD-14, and AD-16
- contract — _bmad-output/initiative-learning-center/architecture-learning-center/shared-contracts.md, API and browser routing, Shared Zod contracts, and Local development
- initiative — _bmad-output/initiative-learning-center/initiative-learning-center.md, Constraint RULE-6

## Notes

- Risk rationale: Medium because a broken or inconsistent scaffold blocks parallel work and encourages incompatible local setups.
- Beyond-criteria check: A second developer follows the instructions from a clean checkout and verifies the database, SPA, and proxied API health route without help from the author.
