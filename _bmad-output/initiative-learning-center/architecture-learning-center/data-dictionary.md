---
title: "Learning Center data dictionary"
status: pending-owner-approval
version: 0.1.0
updated: 2026-11-11
---

# Learning Center data dictionary

This is the shared output location for tickets 5.3 and 2.4. No application record fields are approved yet. Do not implement a field merely because it appears in a sample file.

## Learning catalog fields — pending ticket 5.3

| Record type | Field | Type | Required | Validation | Owner/write path | Language (`en`, `es`, `mixed`, `unknown`) | Searchable | Visibility | Approval/evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Product Owner and HR/Learning decision required |

The shared search contract expects the source-language value to be `en`, `es`, `mixed`, or `unknown`; Product Owner and HR/Learning confirm how this metadata is supplied for each in-scope catalog type.

## System-managed provenance fields

For imported items, the system records source connection ID, source item ID, an approved source link when available, `source_updated_at` when provided, and per-item `last_synced_at`. All canonical records also keep `record_updated_at`. These UTC timestamps and provenance identifiers are system-managed rather than user-editable catalog fields.

## Employee learning record fields — pending spike 2.4

| Record type | Field | Type | Required | Validation | Employee linkage | Owner/write path | Visibility | Uniqueness/conflict rule | Approval/evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Await identity decision 5.2 | Pending | Pending | Pending | HR/Learning, IT/Identity, and Security decision required |
