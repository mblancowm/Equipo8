# Learning Center — shared implementation contracts

Status: development baseline for local synthetic work. Organizational approvals below remain binding gates.

## API and browser routing

- Use one JSON REST API under /api/v1. The browser client calls origin-relative paths; it must not hard-code a host or call the database.
- Return a single resource as a JSON object. Return page-number collections as {count, next, previous, results}, with a default page size of 25, a maximum of 100, and stable ordering: title ascending then ID ascending unless the resource specifies another order.
- Search results order by relevance descending, then title ascending, then ID ascending. Search pagination and counts include only records authorized for the current principal.
- Use semantic HTTP status codes: 401 when no authenticated principal is present; 403 when the principal lacks permission for the action; 404 when a requested record is missing or not visible to that principal; 400 for validation errors; and 409 for a confirmed write conflict.
- Field validation errors map each field to a list of messages; non-field errors use a detail string. Never return stack traces, secrets, or metadata that reveals a hidden employee record.
- Store timestamps in UTC and serialize them in ISO 8601.
- In local development, Vite proxies /api/v1 to Django and serves a client-route fallback. The client continues to use /api/v1. Production routing stays open until the approved hosting and network design is recorded.

## Identity and authorization boundary

A request principal keeps three concepts separate:

- subject_id: opaque, stable identifier from the authentication provider;
- employee_key: organization-approved employee identifier, nullable until the match is approved;
- roles: claims from the approved role policy, never inferred from email or UI state.

The approved provider, employee key, role definitions, and cross-country rules are owned by IT/Identity, HR, and Security. The API authorizes every employee-specific read, write, search result, count, and snippet on the server. Missing, ambiguous, or unavailable authorization fails closed without revealing record existence.

Local development uses synthetic users and fixtures only. Any local identity adapter is enabled only in a clearly marked local environment and must be impossible to enable in a production configuration. This adapter is not a production authentication design.

## Record and field ownership

Learning Center keeps separate concepts for shared learning items and employee-linked learning records. Each has an internal ID. Imported records also keep a source connection ID and source item ID; never merge records automatically just because their text looks similar.

Ticket 5.3 outputs the catalog data dictionary at data-dictionary.md. It records each field's name, type, requiredness, validation, source language, visibility, searchability, authoritative owner, and write path. Ticket 2.4 extends that dictionary with employee-record types, employee linkage, uniqueness, and conflict behavior after identity decision 5.2.

Every field has one authoritative owner or an explicit conflict policy before manual and imported paths can both write it. Source-owned fields change only through the approved source. Manual-owned fields change only through authorized administration. Reject or flag conflicts; do not use last-write-wins. Version the approved dictionary. Do not implement unapproved employee-record fields.

The first implementation of the canonical `LearningItem` model and its migration belongs to story 5.7, after the local scaffold (5.1) and approved catalog dictionary (5.3). Manual-entry story 2.2 and source-import story 3.2 both wait for and write to that model; neither creates a parallel catalog schema. Employee-linked record models belong to story 2.3 after spike 2.4 approves their fields and linkage.

## Source synchronization lifecycle

A source run has one of four states: running, succeeded, partial, or failed. Record start and finish time, counts, and actionable errors, and expose the most recent success separately from the latest attempt.

Each imported canonical item records its source connection ID and source item ID, the approved source link when available, the source's update timestamp when provided, and `last_synced_at` for the last successful run that observed that item. Each Learning Center record also keeps its own `record_updated_at`. Store all timestamps in UTC. A failed run or a partial run that did not observe an item must not advance that item's `last_synced_at`.

A failed or partial run preserves last-good records. An item missing from a partial scan is not deleted. Mark a record withdrawn only when an approved authoritative source signal and per-source rule say it is withdrawn; retain provenance and audit history. Copy source documents only after retention and access approval.

## Locale and search

- UI locale is en or es; remember an explicit selection locally and use browser preference only for first-time selection, falling back to English.
- The UI locale controls labels and system messages only. It never implicitly restricts search.
- Preserve source text and its known language; do not machine-translate during import.
- The approved source-language field uses `en`, `es`, `mixed`, or `unknown`. The data dictionary defines which fields are searchable. Do not add an external index for the pilot.
- Use PostgreSQL full-text search with project-local English and Spanish configurations that apply the `unaccent` filtering dictionary before `english_stem` or `spanish_stem`. Build the index only from fields approved as searchable. English records use the English configuration; Spanish records use Spanish; mixed-language records keep both vectors; unknown-language records use PostgreSQL's `simple` configuration.
- Search accepts plain text in the `q` parameter and approved filters from the data dictionary. Evaluate the query against English and Spanish configurations regardless of UI locale, plus `simple` only for unknown-language records. A record matches when every non-stopword in the query matches within one configuration. Return each record once; for mixed-language records, use the greatest rank from its matching English or Spanish vector. Order by rank descending, then title ascending, then ID ascending. Do not translate, infer query language, or promise cross-language synonym matching.
- PostgreSQL's official documentation describes full-text configurations, indexes, and ranking, and `unaccent` as a filtering dictionary that removes diacritics before passing terms to the next dictionary: [Full Text Search](https://www.postgresql.org/docs/18/textsearch.html) and [`unaccent`](https://www.postgresql.org/docs/18/unaccent.html).

## Local development and dependency policy

The selected runtimes and frameworks are listed in architecture AD-11. Pin Python 3.14.10 in `.python-version`, Node.js 26.13.1 in `.nvmrc`, and uv 0.13.2 with `tool.uv.required-version`. The scaffold uses uv with uv.lock for backend dependencies, npm with package-lock.json for the frontend, and PostgreSQL 18.6 through Compose. Pin application dependencies in their lockfiles and commit only .env.example, never credentials.

The Vite development server binds to `127.0.0.1` by default; do not expose it on the local network. The exact setup, database, API, and SPA start commands are not established until ticket 5.1 creates the manifests. That ticket must document clean installation, local startup, and a manual health/API/UI smoke check, including a direct refresh of a nested SPA route.
