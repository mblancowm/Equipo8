---
title: "Learning Center Architecture Spine"
status: draft
created: 2026-11-11
updated: 2026-11-11
altitude: initiative
---

# Learning Center Architecture Spine

## Purpose

Set the cross-epic rules that keep manual entry, source synchronization, search, and employee access consistent. The team approved Python for backend implementation and React for the frontend. No repository code, framework, runtime version, database, identity provider, hosting platform, deployment target, or source permissions were available to settle the rest of the stack.

## Inherited Invariants

None. This is the first architecture draft.

## Decisions

### AD-1 — [PROPOSED] Use a canonical learning record boundary

**Binds:** Every source and user-facing capability maps to shared concepts for a learning item and, if approved for MVP, an employee learning record.

**Prevents:** Search, manual entry, and integrations from inventing incompatible meanings for course, certification, status, or employee identity, or creating duplicate records for the same source item.

**Rule:** Every Learning Center record has an internal identifier. An imported item is uniquely identified by its source connection and source item identifier; the source connection distinguishes its tenant, site, or library. A manual record uses its internal identifier. Possible matches across different sources or manual records are reviewed and never automatically merged. If employee-specific learning records are in MVP, use only the approved employee identifier and record identity fields; do not create or import them until their record types, uniqueness, and duplicate/conflict handling are approved.

### AD-2 — [PROPOSED] Keep integrations behind source adapters

**Binds:** Each external source has an isolated adapter that reads source data, maps it to the canonical model, and reports source-specific errors.

**Prevents:** SharePoint details from leaking into the employee search contract or making future sources require rewrites of the core experience.

**Rule:** The product may not claim a source is connected until its owner, permissions, content shape, and update behavior are verified.

### AD-3 — [PROPOSED] Enforce current authorization at the service boundary

**Binds:** Every employee-specific read and write, search result, administrative mutation, and restricted operational view uses the approved identity and role policy on the server.

**Prevents:** UI-only hiding or stale role data from exposing employee records, catalog edits, source status, exports, result counts, or snippets.

**Rule:** Check the current policy for every requested action, including each search hit before returning its metadata or snippet. Apply the approved role matrix to creating or updating learning items and employee records and to viewing synchronization health. Missing or ambiguous identity and unavailable authorization checks fail closed; administrative actions are denied until their permissions are approved.

### AD-4 — [PROPOSED] Make synchronization idempotent and preserve last-good state

**Binds:** Reprocessing the same source item updates its mapped record, and partial or failed runs do not silently change the availability of records that were last imported successfully.

**Prevents:** Retry duplication, false deletions from incomplete runs, and administrators or employees mistaking stale data for a successful import.

**Rule:** Key an imported item by source connection and source item identifier. A partial or failed run never treats an absent item as deleted; preserve its last-good state and report the run outcome. Apply deletion or unpublishing only under an approved per-source rule and an authoritative source signal; then mark the record withdrawn, exclude it from current employee search, and retain its provenance and audit history.

### AD-5 — [PROPOSED] Preserve field ownership and provenance

**Binds:** Each field that can be imported or manually changed has one authoritative owner or an explicit conflict rule before synchronization writes it.

**Prevents:** An import silently overwriting a manual correction, a manual edit being lost on refresh, or a record losing its source and change history.

**Rule:** Record one approved, versioned field-ownership policy in a shared source used by both manual writes and imports. No field is writable from either path until its owner or conflict rule is approved. Source-owned fields change only through their approved source; manually owned fields change only through authorized administration. Conflicts are rejected or sent for review, never resolved by last-write-wins alone. Every record retains whether it was imported or entered manually, its source reference when imported, and its creation and last-update actor and time.

### AD-6 — [PROPOSED] Search the canonical view with visible indexing freshness

**Binds:** Search is derived from approved canonical records, applies current authorization, and reports when indexing has not caught up with a saved change.

**Prevents:** Search divergence from record ownership, stale permissions, and a saved change appearing to be searchable when it is not.

**Rule:** The search index is a derived view, never the authority for record content or access. Reauthorize results against the current policy before returning hits, counts, or snippets; if authorization cannot be checked, return none. A write is saved after the canonical change is durable. Indexing may complete asynchronously, but employee and admin surfaces must show pending or stale search freshness accurately. Retry and reconcile failed indexing without losing the canonical change. If retries are exhausted, keep the canonical record, mark the index stale, and notify its operational owner; do not claim the search view is current.

### AD-7 — [PROPOSED] Prefer links and metadata until file-copy rules are approved

**Binds:** The initial design stores approved metadata and source links; copying source files into Learning Center requires an explicit retention, permission, and ownership decision.

**Prevents:** Unapproved duplication of corporate documents and access that outlives the source's policy.

**Rule:** Do not show imported content, restricted metadata, or source links to employees until the source owner approves and tests a per-user access path. After that, show an item and link only when the employee's identity is authorized by the source; if permission cannot be verified, omit the item and its link from employee results.

### AD-8 — [ADOPTED] Use Python for backend and React for frontend

**Binds:** Backend application code uses Python; employee and administrator user interfaces use React.

**Prevents:** Separately built epics choosing incompatible implementation languages for service and interface code.

**Rule:** Use Python for backend implementation and React for frontend components. This decision does not choose a framework, version, build tool, database, identity provider, or deployment environment.

### AD-9 — [ADOPTED] Preserve the accessibility floor across user interfaces

**Binds:** Employee and administrator interfaces preserve the accessibility behaviors required by the UX contract.

**Prevents:** Independently built screens from using inaccessible controls, hidden focus, color-only status, or unannounced search and validation changes.

**Rule:** Support keyboard navigation, semantic labels, visible focus, and assistive-technology announcements for changing results and validation feedback. Pair status cues with text or icons rather than color alone. The organization selects the formal conformance target before the pilot.

### AD-10 — [ADOPTED] Gate production employee data on organizational approval

**Binds:** Manual entry, source imports, storage, indexing, and search of real employee-linked data in production.

**Prevents:** Production processing before organizational data and regional approvals are recorded.

**Rule:** Do not load, store, index, or expose real employee-linked data in production until the organization has recorded approval for data classification, access rules, retention, and regional handling. Use only approved test data before that gate.

## Seed

Provisional logical components:

1. Employee and administrator experience.
2. Python application service for records, search, and authorization.
3. Canonical learning data store.
4. Search index derived from approved canonical records.
5. Manual administration workflow with change attribution.
6. Background synchronization worker and source adapters.
7. Operational log and source-health view.

Data flow: a source adapter or administrator submits a change; the service validates permissions and field ownership, maps it to the canonical record, and durably saves it; the approved record is indexed; employees search through the same authorization boundary; administrators can inspect source and synchronization health.

## Deferred

- Python and React frameworks, runtime versions, starter/build tools, hosting, data region, and deployment model.
- Environment topology, deployment and rollback, backup and restore, production operations owner, monitoring, alerting, and incident response; assign owners and gates before production.
- Which sign-in provider and employee key are approved, and which roles may view or change each employee-linked record and administrative action?
- If employee-specific learning records are in MVP, which fields define their identity and when are two records duplicates across manual and imported sources? Resolve this before building record entry or import.
- SharePoint integration method and permission model.
- Source deletion and unpublishing semantics for each approved integration.
- Whether files are copied or only linked.
- Synchronization cadence, search-index freshness, retry-exhaustion behavior, recovery targets, and their operational owner.
- Final data model, retention period, audit period, and compliance obligations.
- Search technology and performance budgets.
- Product language, design system, and formal accessibility conformance target.

## Open Questions

- Is the supplied SharePoint folder a valid source of learning information, and which content types does it contain?
- Can the source owner authorize least-privilege automated access?
- Which roles may see employee-linked records across the United States and Costa Rica, and how is a change to that policy propagated to results and snippets?
- Who approves and maintains the shared field-ownership policy when a manual value differs from an imported value?
- Which Python backend framework and React framework/build tool should the team use?
- Which runtime versions, database, hosting, CI, deployment environments, and data region are approved?
- What are the approved source deletion and unpublishing signals and semantics for each integration?
- Who owns production operations, deployment and rollback, backup and restore, monitoring, alerting, and incident response?
- What availability and freshness targets are required, and who owns monitoring, retry exhaustion, recovery, and escalation?
