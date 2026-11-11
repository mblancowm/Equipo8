# Adversarial architecture review — current kickoff package

Date: 2026-11-11
Scope: current architecture spine/shared contracts, data dictionary, source spike, and opening ticket dependencies.

## Verdict

**Pass for kickoff.** The search contract is implementable in PostgreSQL at the stated level, the SharePoint rejection path now has an explicit Product Owner decision, and tickets 5.1–5.4 have no prerequisites. No critical or high finding blocks their parallel start.

## Search decision confirmed

The architecture and shared contract now specify PostgreSQL `unaccent` before English/Spanish stemming, the `en`/`es`/`mixed`/`unknown` source-language values, both-language query behavior, mixed-language vector deduplication by greatest rank, and stable title/ID tie-breaking. The search entry includes accented and mixed-language examples.

## Confirmed corrections

- Ticket 5.4 now requires a Product Owner decision when SharePoint is unsuitable or access is denied: select another candidate for a new verification spike or defer the integration. No fallback connector is assumed.
- Tickets 5.1, 5.2, 5.3, and 5.4 all have empty `after` lists and are ready to start independently. Later tickets 5.5 and 5.6 are sequenced behind the local scaffold.
- The dependency tree declares the cross-epic prerequisites; no unpinned or undeclared dependency is present in the current board output.
- A single opening-epic story (5.7) owns the canonical LearningItem schema after 5.1 and 5.3. Manual story 2.2 and source-import story 3.2 both depend on 5.7, avoiding parallel model/migration ownership.
- SharePoint synchronization explicitly depends on the access epic for approved administrator roles; each imported record keeps its own last successful `last_synced_at`.

## Security and boundary review

- Local development remains synthetic; production data, identity, source permissions, retention/region, hosting, and operations remain explicit owner gates.
- Server-side authorization covers employee-specific reads/writes, search hits, counts, snippets, and operations views. Source links/content require tested per-user access.
- Failed or partial source runs preserve last-good records; a missing item in a partial scan cannot be withdrawn.

No application code exists to inspect; this review evaluates the planning contracts only.
