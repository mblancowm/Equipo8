---
title: "Learning Center data dictionary"
status: pending-owner-approval
version: 0.1.0
updated: 2026-11-19
---

# Learning Center data dictionary

This is the shared output location for tickets 5.3 and 2.4. No application record fields are approved yet. Do not implement a field merely because it appears in a sample file.

## Learning catalog scope — approved 2026-11-19

The first release includes courses, training resources, and certification offerings. Employee-specific records, completions, enrollment, and certification validity or expiry are out of scope for ticket 5.3 and remain pending spike 2.4.

## Learning catalog fields — pending HR/Learning field approval

| Record type | Field | Type | Required | Validation | Owner/write path | Language (`en`, `es`, `mixed`, `unknown`) | Searchable | Visibility | Approval/evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Product Owner and HR/Learning decision required |

The shared search contract expects the source-language value to be `en`, `es`, `mixed`, or `unknown`; Product Owner and HR/Learning confirm how this metadata is supplied for each in-scope catalog type.

## Open catalog decisions

For every field or ownership rule that is not approved, record the open choice, the named owner, the evidence needed, and the dependent ticket IDs here. Do not enable either manual or source writes for that field until the decision is recorded and approved.

## System-managed provenance fields

For imported items, the system records source connection ID, source item ID, an approved source link when available, `source_updated_at` when provided, and per-item `last_synced_at`. All canonical records also keep `record_updated_at`. These UTC timestamps and provenance identifiers are system-managed rather than user-editable catalog fields.

## Employee learning record fields — pending spike 2.4

| Record type | Field | Type | Required | Validation | Employee linkage | Owner/write path | Visibility | Uniqueness/conflict rule | Approval/evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Await identity decision 5.2 | Pending | Pending | Pending | HR/Learning, IT/Identity, and Security decision required |
