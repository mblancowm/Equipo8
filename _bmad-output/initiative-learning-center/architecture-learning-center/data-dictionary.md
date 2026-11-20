---
title: "Learning Center data dictionary"
status: approved-initial-poc
version: 0.2.0
updated: 2026-11-20
---

# Learning Center data dictionary

This is the shared output location for tickets 5.3 and 2.4. The initial Brownbag POC fields below are approved; employee learning-record fields remain unapproved. Do not implement any field beyond the approved rows.

## Learning catalog scope — approved 2026-11-19

The product scope includes courses, training resources, and certification offerings. This approved dictionary is limited to the initial Brownbag learning-resource POC. Employee-specific records, completions, enrollment, and certification validity or expiry are out of scope for ticket 5.3 and remain pending spike 2.4.

## Learning catalog fields — approved for the initial Brownbag POC

| Record type | Field | Type | Required | Validation | Owner/write path | Language (`en`, `es`, `mixed`, `unknown`) | Searchable | Visibility | Approval/evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Learning resource | `title` (nombre de capacitación) | String | Yes | Trimmed non-empty value. Use SharePoint `Title`; when it is empty, use the source file name. | SharePoint source owns the value for the initial Brownbag POC; write only through the source-import path. Manual edits are blocked and rejected as a conflict. | `unknown` by default; the POC has no approved source-language metadata | Yes | Do not expose to employees in the POC. A future connector may expose it only while honoring existing SharePoint ACLs. | Product Owner decisions recorded in ticket 5.4 source map, 2026-11-20; Product Owner/HR-Learning ownership decision, 2026-11-20 |
| Learning resource | `session_date` (fecha de capacitación) | Calendar date or empty | No | Use SharePoint `Date` when present. Never substitute SharePoint `Created` for a missing session date. | SharePoint source owns the value for the initial Brownbag POC; write only through the source-import path. Manual edits are blocked and rejected as a conflict. | Not applicable | No | Do not expose to employees in the POC. A future connector may expose it only while honoring existing SharePoint ACLs. | Product Owner decisions recorded in ticket 5.4 source map, 2026-11-20; Product Owner/HR-Learning ownership decision, 2026-11-20 |

The shared search contract permits `en`, `es`, `mixed`, or `unknown`. The initial Brownbag POC uses `unknown` because its approved source schema contains no language metadata.

## Open catalog decisions

No open catalog-field or ownership decision remains for the initial Brownbag POC. Optional `Topic` and `Presenter` are deferred to ticket 3.5; employee learning-record fields remain with spike 2.4. Do not enable additional fields or a manual write path without a new approved dictionary decision.

| Deferred choice | Owner | Evidence needed | Dependent tickets |
| --- | --- | --- | --- |
| Field contracts for courses and certification offerings beyond the initial Brownbag learning resource | Product Owner and HR/Learning | Approved per-type field dictionary and ownership decision | Future catalog expansion; does not block the initial POC in tickets 5.7 or 3.2 |

## System-managed provenance fields

For imported items, the system records source connection ID, source item ID, an approved source link when available, `source_updated_at` when provided, and per-item `last_synced_at`. The Brownbag POC also retains SharePoint `Created` as `source_added_at`, displayed separately as “Added to SharePoint” / “Añadido a SharePoint”; it is not a `session_date` fallback. All canonical records also keep `record_updated_at`. These UTC timestamps and provenance identifiers are system-managed rather than user-editable catalog fields.

## Employee learning record fields — pending spike 2.4

| Record type | Field | Type | Required | Validation | Employee linkage | Owner/write path | Visibility | Uniqueness/conflict rule | Approval/evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Await identity decision 5.2 | Pending | Pending | Pending | HR/Learning, IT/Identity, and Security decision required |
