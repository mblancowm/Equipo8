---
title: "Learning Center Architecture Spine"
status: draft
created: 2026-11-11
updated: 2026-11-11
altitude: initiative
---

# Learning Center Architecture Spine

## Purpose

Set the cross-epic rules that keep manual entry, source synchronization, search, and employee access consistent. This is technology-neutral. No repository code, deployment environment, identity provider, hosting platform, or source permissions were available to ratify a stack.

## Inherited Invariants

None. This is the first architecture draft.

## Decisions

### AD-1 — [PROPOSED] Use a canonical learning record boundary

**Binds:** Every source and user-facing capability maps to shared concepts for a learning item and, if approved for MVP, an employee learning record.\
**Prevents:** Search, manual entry, and integrations from inventing incompatible meanings for course, certification, status, or employee identity.\
**Rule:** Keep source-specific fields and mappings at the integration boundary; preserve the original source reference.

### AD-2 — [PROPOSED] Keep integrations behind source adapters

**Binds:** Each external source has an isolated adapter that reads source data, maps it to the canonical model, and reports source-specific errors.\
**Prevents:** SharePoint details from leaking into the employee search contract or making future sources require rewrites of the core experience.\
**Rule:** The product may not claim a source is connected until its owner, permissions, content shape, and update behavior are verified.

### AD-3 — [PROPOSED] Enforce employee authorization at the service boundary

**Binds:** Employee-specific records are authorized on every server-side read and write using an approved identity match and role policy.\
**Prevents:** UI-only hiding from exposing records through direct requests, search, exports, or stale indexes.\
**Rule:** Search results, details, admin forms, and exports use the same authorization policy.

### AD-4 — [PROPOSED] Make synchronization idempotent and observable

**Binds:** Reprocessing the same source item updates its mapped record rather than creating an uncontrolled duplicate; each run reports status and time.\
**Prevents:** Retry storms, silent duplication, and administrators mistaking stale data for a successful import.\
**Rule:** A failed run leaves the last good state available and exposes an actionable error to authorized administrators.

### AD-5 — [PROPOSED] Preserve provenance and field ownership

**Binds:** Each field that can be imported or manually changed has an explicit owner or conflict policy before synchronization writes it.\
**Prevents:** An import silently overwriting a manual correction or a manual edit being lost on the next refresh.\
**Rule:** Store source, source identifier, last sync time, and last manual editor/time where applicable.

### AD-6 — [PROPOSED] Search from the approved canonical view

**Binds:** Search indexes only approved, normalized records and applies the same visibility rules as the record service.\
**Prevents:** Source-specific query behavior and private fields leaking into results or snippets.\
**Rule:** Index freshness and rebuild behavior must be visible and recoverable.

### AD-7 — [PROPOSED] Prefer links and metadata until file-copy rules are approved

**Binds:** The initial design stores approved metadata and source links; copying source files into Learning Center requires an explicit retention, permission, and ownership decision.\
**Prevents:** Unapproved duplication of corporate documents and access that outlives the source's policy.\
**Rule:** A source link is shown only when the employee is authorized to open it.

## Seed

Provisional logical components:

1. Employee and administrator experience.
2. Application service for records, search, and authorization.
3. Canonical learning data store.
4. Search index derived from approved canonical records.
5. Manual administration workflow with change attribution.
6. Background synchronization worker and source adapters.
7. Operational log and source-health view.

Data flow: a source adapter or administrator submits a change; the service validates permissions and maps it to the canonical record; the approved record is indexed; employees search through the same authorization boundary; administrators can inspect source and synchronization health.

## Deferred

- Runtime stack, starter, hosting, data region, and deployment model.
- Identity provider and employee key.
- SharePoint integration method and permission model.
- Whether files are copied or only linked.
- Synchronization cadence, deletion semantics, and source conflict resolution.
- Final data model, retention, audit period, and compliance obligations.
- Search technology and performance budgets.
- Product language and UI component system.

## Open Questions

- Is the supplied SharePoint folder a valid source of learning information, and which content types does it contain?
- Can the source owner authorize least-privilege automated access?
- Which roles may see employee-linked records across the United States and Costa Rica?
- Which system owns each field when a manual value differs from an imported value?
- What availability, freshness, and recovery targets are required?
