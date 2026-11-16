# Learning Center — shared implementation contracts

Status: adopted cross-epic contract for development with synthetic data. Organizational approvals below remain binding gates.

## API and browser routing

- Use one JSON REST API under /api/v1. The browser client calls origin-relative paths; it must not hard-code a host or call the database.
- Return a single resource as a JSON object. Return page-number collections as `{count, next, previous, results}`: `count` is an integer, `next` and `previous` are relative API paths or null, and `results` is an array. Use `page` and `page_size` query parameters, default page size 25, maximum 100, and stable ordering by title then ID unless the resource specifies another order. Counts and pages are computed only from records authorized for the current principal.
- [ASSUMPTION] Use `GET /api/v1/learning-items/search?q=...&page=...&page_size=...` for catalog search. Treat `q` as plain user text, trim it, and reject an empty value with 400. Convert terms into a safely encoded FTS5 query with implicit AND semantics; do not expose FTS5 operators as a query language. Search results order by relevance descending, then title ascending, then ID ascending. The result fields come from the approved learning-item dictionary and its Zod response schema.
- Use semantic HTTP status codes: 401 when no authenticated principal is present; 403 when the principal lacks permission for the action; 404 when a requested record is missing or not visible to that principal; 400 for validation errors; and 409 for a confirmed write conflict.
- [ASSUMPTION] Return errors as `{detail, field_errors}`; `detail` is a non-sensitive string and `field_errors` maps field names to message arrays (empty when there are no field errors). Never return stack traces, SQL details, secrets, or metadata that reveals a hidden employee record.
- Store timestamps in UTC and serialize them in ISO 8601.
- In local development, the Vike/Vite server proxies /api/v1 to Hono and serves Vike client routes. The client continues to use /api/v1. Production routing stays open until the approved hosting and network design is recorded.

## Shared Zod contracts

- Put versioned request, response, pagination, and error schemas in `packages/contracts`. Infer TypeScript types from those schemas; do not duplicate handwritten request/response types across the web and API apps.
- The API parses incoming request data with the shared schemas and validates response payloads before serialization. The web app parses API responses with the same schemas before consuming them. Keep database row types and ORM schema private to `apps/api/src/db`.
- Convert Zod validation issues to the agreed field-to-message-list and `detail` error shape. Do not return stack traces, SQL details, or data from records the principal cannot access.
- Schema validation does not grant access. The API performs authorization for every employee-specific read, write, search hit, count, snippet, and restricted operations view before serializing the response.

## Identity and authorization boundary

A request principal must keep separate the opaque subject from the approved identity provider, any organization-approved employee linkage, and role claims from the approved access policy. Ticket 5.2 owns the actual principal fields and types after the owners approve identity and access. Do not create an `employee_key` field or treat email as the employee identifier before that decision.

The approved provider, employee linkage, role definitions, and cross-country rules are owned by IT/Identity, HR, and Security. The API authorizes every employee-specific read, write, search result, count, and snippet on the server. Missing, ambiguous, or unavailable authorization fails closed without revealing record existence.

Local development uses synthetic users and fixtures only. Any local identity adapter is enabled only in a clearly marked local environment and must be impossible to enable in a production configuration. This adapter is not a production authentication design.

## Record and field ownership

Learning Center keeps separate concepts for shared learning items and employee-linked learning records. Each has an internal ID. Imported records also keep a source connection ID and source item ID; never merge records automatically just because their text looks similar.

Ticket 5.3 outputs the catalog data dictionary at data-dictionary.md. It records each field's name, type, requiredness, validation, source language, visibility, searchability, authoritative owner, and write path. Ticket 2.4 extends that dictionary with employee-record types, employee linkage, uniqueness, and conflict behavior after identity decision 5.2.

Every field has one authoritative owner or an explicit conflict policy before manual and imported paths can both write it. Source-owned fields change only through the approved source. Manual-owned fields change only through authorized administration. Reject or flag conflicts; do not use last-write-wins. Version the approved dictionary. Do not implement unapproved employee-record fields.

The first implementation of the canonical `LearningItem` Drizzle schema and migration belongs to story 5.7, after the local scaffold (5.1) and approved catalog dictionary (5.3). Manual-entry story 2.2 and source-import story 3.2 both wait for and write to that model; neither creates a parallel catalog schema. Employee-linked record models belong to story 2.3 after spike 2.4 approves their fields and linkage. The ORM schema and migrations live under `apps/api/src/db`; shared API payloads live in `packages/contracts` and are not database models.

## Source synchronization lifecycle

A source run has one of four states: running, succeeded, partial, or failed. Record start and finish time, counts, and actionable errors, and expose the most recent success separately from the latest attempt.

Each imported canonical item records its source connection ID and source item ID, the approved source link when available, the source's update timestamp when provided, and `last_synced_at` for the last successful run that observed that item. Each Learning Center record also keeps its own `record_updated_at`. Store all timestamps in UTC. A failed run or a partial run that did not observe an item must not advance that item's `last_synced_at`.

A failed or partial run preserves last-good records. An item missing from a partial scan is not deleted. Mark a record withdrawn only when an approved authoritative source signal and per-source rule say it is withdrawn; retain provenance and audit history. Copy source documents only after retention and access approval.

## Locale and search

- UI locale is en or es; remember an explicit selection locally and use browser preference only for first-time selection, falling back to English.
- The UI locale controls labels and system messages only. It never implicitly restricts search.
- Preserve source text and its known language; do not machine-translate during import.
- The approved source-language field uses `en`, `es`, `mixed`, or `unknown`. The data dictionary defines which fields are searchable. Do not add an external index for the pilot.
- For the local synthetic-data baseline, use SQLite FTS5 with the `unicode61` tokenizer and index only fields approved as searchable. It folds case and removes Latin diacritics by default. Do not apply FTS5's built-in Porter stemmer to Spanish content; it is designed for English. Keep the source-language value `en`, `es`, `mixed`, or `unknown`, but search both English and Spanish text regardless of UI locale. Ticket 5.1 must verify FTS5 availability on the supported Bun/SQLite builds before the search story depends on it.
- Search accepts plain text in the `q` parameter and approved filters from the data dictionary. Escape or safely encode user input for the FTS5 query grammar. Return each record once and order by relevance, then title ascending, then ID ascending. Do not translate, infer query language, or promise cross-language synonym matching. The local baseline does not promise language-specific stemming. [ASSUMPTION] Product Owner review of search acceptance examples will confirm whether token matching without Spanish stemming meets MVP expectations before the search story is implemented.
- FTS5 uses SQLite virtual tables. Drizzle does not natively model SQLite extensions, so create and maintain the FTS5 table and any triggers through SQL migrations owned by the database module; issue FTS5-specific queries from that module only. Revisit the index implementation if the approved production database differs from SQLite.
- SQLite documents `unicode61` case folding and diacritic behavior and notes that Porter stemming is designed for English; see [FTS5 tokenizers](https://www.sqlite.org/fts5.html#tokenizers). Drizzle documents a [Bun SQLite driver](https://orm.drizzle.team/docs/get-started/bun-sqlite-existing) and that [SQLite extensions are not natively supported](https://orm.drizzle.team/docs/sqlite/extensions).

## Local development and dependency policy

The selected frameworks are listed in architecture AD-11. Use Bun for the API runtime and, [ASSUMPTION] Bun workspaces and one checked-in Bun lockfile for JavaScript/TypeScript packages. Pin the Bun release in repository metadata and resolve exact compatible stable package versions in ticket 5.1. Drizzle schema, connection, and migrations live in `apps/api/src/db`; SQLite is the zero-configuration local database. Keep the SQLite data file out of version control and commit only `.env.example`, never credentials or local records.

The Vike/Vite development server binds to `127.0.0.1`; do not expose it on the local network. The exact setup, database migration, API, and web start commands are not established until ticket 5.1 creates the manifests. That ticket must document clean installation, local startup, applying migrations, and a manual health/API/UI smoke check, including a direct refresh of a nested web route. Production database, hosting, deployment, backups, and recovery remain open decisions for their organizational owners.
