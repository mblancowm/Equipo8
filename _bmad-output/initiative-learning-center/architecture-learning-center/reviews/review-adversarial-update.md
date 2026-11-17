# Adversarial architecture review — 2026-11-16 update

Date: 2026-11-16
Scope: `architecture-learning-center.md` and `shared-contracts.md`; adversarial checks across independently implemented API, web, database, authorization, search, and synchronization stories. No application code was reviewed.

> The findings below preserve the review snapshot. Follow-up disposition for the updated contract is recorded at the end of this file.

## Verdict

**Conditional pass for the local scaffold.** The company stack, local-only SQLite boundary, and security/data-governance gates are clear enough to start ticket 5.1. The spine and companion do not yet make the API/search wire contract concrete enough for independently built frontend and backend stories to integrate without a follow-up decision. Search, synchronization, and production persistence also retain deliberate or accidental gaps that should be closed at the owners and tickets identified below.

## Findings

### High — Frontend and API can implement different wire contracts

The shared contract names `{count, next, previous, results}`, but does not define whether `next` and `previous` are page numbers, URLs, or nullable cursors; the page-number parameter and page numbering are unspecified. It also defines error status codes and field-to-message mapping without a complete JSON error object for all statuses, or a canonical representation for field paths. An API story can return `next: 2` and `{detail: ...}` while a web story expects a URL and a different error envelope, with both following the stated conventions.

**Close before parallel API and UI work:** publish concrete Zod schemas and one request/response example for a paginated resource, search, validation failure, authorization failure, and conflict. Define page parameter names, numbering, empty-page behavior, and `next`/`previous` types. Keep these examples in `packages/contracts` or its companion contract so they remain the integration source.

### High — Search behavior is not reproducible across independent stories

Both documents set route prefix, `q`, allowed filters, authorized-result ordering, FTS5, and tokenizer behavior, but they do not define the search response fields (including snippet shape), query interpretation for plain text, relevance formula/field weighting, or collation used for title/ID tie breaks. “Relevance descending” leaves implementers free to use different FTS5 rank expressions. “Escape or safely encode” the FTS5 grammar leaves ambiguity about whether punctuation, quotes, and operators are literal text or query syntax. The PO review of acceptance examples is explicitly pending.

Two search implementations can therefore both honor AD-6 and shared-contracts.md and still return different records, ordering, snippets, or results for the same user query. The web client also cannot type its result view until the response shape is settled.

**Close before the search story:** approve a small acceptance set for English, Spanish, mixed-language, accented, punctuation, empty, and filtered queries; define the search result Zod schema and snippet limits; state token matching/AND-OR behavior, ranking/tie-break rules, and stable title comparison. Preserve the existing prohibition on translating source text and on returning unauthorized hits, counts, snippets, or details.

### Medium — Authorization is specified as an invariant but not as an observable pagination rule

The documents correctly require authorization for every hit and state that counts include only authorized records. They do not say whether the service must fill each page with the requested number of visible records after filtering, nor prescribe how `next` behaves when a database page contains mostly unauthorized rows. A compliant implementation could filter a database page after applying its limit and return sparse pages; another could continue scanning until the visible page is full. Both can report an authorized-only count, but they give different pagination behavior and can skip visible results if the cursor advances differently.

**Close in the search/API contract:** define pagination over the authorized result set, including whether pages are full except at the end, how continuation advances, and that counts are computed after authorization. Add an acceptance case with interleaved authorized and unauthorized matches and assert that no hidden record, count, snippet, or existence detail appears.

### Medium — Shared Zod schemas do not yet pin JSON validation semantics

The companion requires the API and web app to parse with the shared schemas, but does not set policy for unknown object keys, coercions/transforms, nullable versus omitted fields, or ISO timestamp parsing/serialization. For example, an API schema that coerces a numeric string or strips unknown fields can accept a request that another independently written route expects to reject. Zod types alone do not settle these runtime behaviors.

**Close as contracts are added:** specify strictness for request objects, keep wire schemas JSON-safe, distinguish omitted and `null` values, and define timestamp strings as UTC ISO 8601 with one serialization convention. Convert Zod issues to the agreed public error shape without returning internal issue metadata, SQL errors, or hidden-record data.

### Medium — Idempotent synchronization lacks a database-enforced uniqueness rule and run payload

AD-1/AD-4 identify `(source connection, source item)` as the imported-item key and require retries to be repeatable, but the shared contract does not explicitly require a unique database constraint for that pair. A find-then-insert implementation can create duplicates if retries or overlapping runs race. The run states are named, but the operational response contract for state, counts, timestamps, and actionable errors is not defined.

**Close before source-import implementation:** require the composite uniqueness constraint in the migration and define conflict-safe upsert behavior inside the database module. Add a versioned run-status response schema that exposes only approved operational metadata and never bypasses the server-side permissions in AD-3.

### Medium — Production database is deferred, but the portability boundary is not

The documents correctly limit SQLite to local storage and defer the production database. At the same time, local persistence/search explicitly relies on SQLite FTS5 SQL and Drizzle does not model the virtual table. Nothing states whether repositories and migrations should remain portable to the yet-to-be-selected production database, or whether SQLite-specific queries must stay behind an adapter with a replaceable contract. A local implementation can comply while spreading SQLite syntax and storage assumptions into record services, making the later approved database choice a cross-application rewrite.

**Close with the operations/database owner before production implementation:** record whether production must use a different database and what portability is required. Until then, keep SQLite-specific SQL and migrations inside `apps/api/src/db`, add a scaffold check that the pinned Bun SQLite build has FTS5 available, and block production data/deployment until the production database and its migration, backup, concurrency, and recovery decisions are approved.

## Confirmed strengths

- The adopted company stack and intended monorepo boundaries are explicit, and the SPA rendering choice and TypeScript/Bun-workspace choices are visibly marked as assumptions.
- Real employee-linked production data is gated on organizational approval; local fixtures stay synthetic, and authorization is consistently a server responsibility.
- Catalog fields and employee-linked record fields remain pending their named owner decisions; the architecture does not invent those fields or an identity provider.
- Source text remains untranslated, UI locale does not filter search, and partial/failed synchronization preserves last-good data.
- The local Vike/Vite proxy is distinguished from production routing; hosting, database, and regional choices remain deferred.

## Follow-up disposition — 2026-11-17

- **API and pagination contract:** The page envelope now defines one-based page numbers, defaults and bounds, relative continuation paths, empty pages, single-valued numeric/query parsing, duplicate/unknown-key rejection, a common error envelope, JSON Pointer field paths, and authorization before count and slicing. Search results use a discriminated union: catalog values from `v1.LearningItemResponseSchema` owned by 5.7, and optional personal-record values from `v1.EmployeeLearningRecordResponseSchema` owned by 2.3. The search story owns `v1.LearningSearchResponseSchema`; the 2.3 dependency remains until Product decides whether personal records are in the MVP.
- **Search contract:** Query parsing, AND semantics, one shared FTS5 corpus across enabled result kinds, default BM25 rank, kind-and-ID tie-break ordering, and the absence of score/snippet fields in the first release are now specified. A shared corpus makes the rank comparable across kinds and avoids relying on a title field that personal records may not have. Product Owner search examples remain a gate before implementation; source fields and approved filters still depend on ticket 5.3.
- **Zod semantics:** Request/response objects reject unknown fields; request coercion, omitted versus nullable values, UTC timestamps, and public error paths are now specified. Story 5.1 also requires strict TypeScript in all three packages plus a root no-emit type-check command.
- **Synchronization:** Ticket 5.7 owns the imported-source unique constraint, and ticket 3.2 uses atomic conflict-safe upsert from the first import, so the import contract is enforced before later-update ticket 3.3. Story 3.4 owns `v1.SourceSyncHealthResponseSchema` and its authorized status route for all configured sources; admins select a source in the UI, and exact per-source count/error fields are finalized after the source map is verified. Production database portability remains an owner decision before production.
- **Access revocation:** Ticket 5.2 now requires IT/Identity and Security to approve the maximum revocation delay or keep production access gated until that decision is recorded.
- **Production database:** Portability remains an owner decision before production implementation. SQLite-specific migrations and queries stay within `apps/api/src/db`, and production data/deployment remain gated on the approved database and operations decisions.

## Review limit

No application code or runtime was available to verify Bun's SQLite FTS5 build, the actual Drizzle migration behavior, or the Vike/Hono proxy. Ticket 5.1 should verify those local scaffold assumptions from a clean checkout; this review does not request application tests before the scaffold exists.

## Final contract recheck — 2026-11-17

The final read confirms that 5.7 creates the composite source-key constraint and 3.2 uses it with atomic upsert from the initial import; 3.3 is sequenced after that foundation and handles subsequent changes and approved withdrawals. The ticket tree reports no undeclared or unpinned dependencies and no order conflict. **No remaining blocker found.**
