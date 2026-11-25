# Equipo 8 Learning Center

Local Learning Center development app with an optional username/password demo login. It uses synthetic data only.

## Supported development platform

| Operating system | Architecture | Bun | FTS5 smoke check |
| --- | --- | --- | --- |
| macOS 15.8.2 | ARM64 (Apple Silicon) | 1.4.4 | Passed on 2026-11-18 |

Other operating systems and architectures are not yet listed as supported because the scaffold has only been verified on the platform above.

## Requirements

- Bun 1.4.4 (pinned in `.bun-version` and root package metadata).

## Clean install

From the repository root:

```sh
bun install --frozen-lockfile
```

## Local database

The SQLite database is created at `.local-data/learning-center.sqlite` by default. The directory is ignored by Git. No catalog or employee tables are created by this scaffold; the canonical `LearningItem` model belongs to ticket 5.7.

Apply the checked-in Drizzle migrations to a fresh local database:

```sh
bun run db:migrate
```

Check the SQLite FTS5 extension using an in-memory table that is removed after the check:

```sh
bun run db:fts5-smoke
```

Record the OS, architecture, Bun version, and actual result in the supported-platform table before adding another platform.

## Type check

Run a no-emit strict TypeScript check for contracts, API, and web:

```sh
bun run typecheck
```

## Start the API and web app

Start each process in its own terminal from the repository root:

```sh
bun run dev:api
```

```sh
bun run dev:web
```

Both development servers bind to `127.0.0.1`. The API listens on port 3001 and the Vike/Vite web server listens on port 5173 by default. The web server proxies `/api/v1` to the API; the browser uses only origin-relative API paths.

Verify the health response through the web proxy:

```sh
curl -i http://127.0.0.1:5173/api/v1/health
```

The expected response is HTTP 200 with exactly `{"status":"ok"}`. Open `http://127.0.0.1:5173/app/scaffold-check` directly and refresh it to verify nested-route handling and browser-side health-contract parsing.

## Configuration

The local demo login is opt-in and works only when the API is not running in production. Copy .env.example to .env, set LEARNING_CENTER_LOCAL_AUTH_ENABLED=true, choose a username, and set a local password there. This checkout is already configured with the synthetic user demo. Keep .env ignored; never commit credentials or real employee data. Sessions expire after eight hours or when the API restarts.

## Shared API contracts

Versioned Zod contracts live in `packages/contracts`. Object schemas use strict objects so unknown keys are rejected. Request schemas describe wire values without implicit coercion. Use optional fields for omitted values and nullable fields for explicit `null`; combine both only when both states are allowed.
