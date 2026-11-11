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

Create the Django API, React SPA, and local PostgreSQL setup against the shared development contracts. The developer manually verifies a clean local start using synthetic data; no corporate identity or SharePoint access is added.

## Requirements

Verify: A new contributor follows the documented clean-install steps, starts PostgreSQL, API, and SPA, then sees the SPA and a successful API health response through the local proxy.

## Acceptance Criteria

1. **The repository has a reproducible backend baseline**
   **Given** a clean checkout and the approved Python runtime
   **When** a contributor follows the backend instructions
   **Then** `.python-version` pins Python 3.14.10, `tool.uv.required-version` pins uv 0.13.2, Django and Django REST dependencies install from uv.lock, and the Django service starts without a secret committed to the repository.
2. **The repository has a reproducible frontend baseline**
   **Given** a clean checkout and the approved Node runtime
   **When** a contributor follows the frontend instructions
   **Then** `.nvmrc` pins Node.js 26.13.1, React, React Router, and Vite 8.3.8 install from package-lock.json, and the SPA starts with Vite bound to 127.0.0.1.
3. **Local database and API routing work together**
   **Given** PostgreSQL 18.6 is healthy in Docker Compose
   **When** the contributor opens a nested SPA route, refreshes it directly, and requests /api/v1/health through the Vite development server
   **Then** the nested route loads after refresh and the proxied API returns the documented healthy response.
4. **Local configuration is safe and documented**
   **Given** the backend and frontend settings are configured
   **When** the contributor reads the root development instructions
   **Then** clean-install, database, API, and SPA commands are exact, required environment variables are explained in .env.example, and no credentials or real employee data are present.
5. **The scaffold stays inside the approved boundary**
   **Given** identity and source decisions remain open
   **When** this story is reviewed
   **Then** it includes no production sign-in provider, real employee identity, real employee fixture, SharePoint credential, or source connection.

## Boundaries

- Do not implement employee search, admin forms, employee-record schema, production authentication, source synchronization, CI, or deployment in this story.
- Do not add a local identity adapter unless ticket 1.2 approves the exact development-only contract and its production exclusion.
- Keep Vite bound to loopback by default; do not use `--host` or a network-bound server host.
- The root developer instructions must distinguish commands created by this story from planning-only commands in _bmad-output.

## References

- parent — _bmad-output/initiative-learning-center/tickets/epic-application-foundation/epic-application-foundation.md, Requirements and Constraints
- architecture — _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md, AD-11, AD-14, and AD-16
- contract — _bmad-output/initiative-learning-center/architecture-learning-center/shared-contracts.md, API and browser routing and Local development
- initiative — _bmad-output/initiative-learning-center/initiative-learning-center.md, Constraint RULE-6

## Notes

- Risk rationale: Medium because a broken or inconsistent scaffold blocks parallel work and encourages incompatible local setups.
- Beyond-criteria check: A second developer follows the instructions from a clean checkout and verifies the database, SPA, and proxied API health route without help from the author.
