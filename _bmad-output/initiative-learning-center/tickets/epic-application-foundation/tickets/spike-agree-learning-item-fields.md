---
id: 3
type: spike
title: "Agree learning item fields"
parent: epic-application-foundation
covers: [R2]
after: []
refined: true
hitl: true
risk: medium
---

# Agree learning item fields

## Description

Product Owner and HR/Learning answer which fields and write ownership define the minimum catalog schema before manual forms, imports, or search filters are built. The first release covers courses, training resources, and certification offerings. It excludes employee-specific records, completions, enrollment, and certification validity or expiry; spike 2.4 handles employee-linked fields after identity decision 5.2. Ticket 5.7 waits for the approved schema, and tickets 2.2 and 3.2 consume the same approved field and ownership decisions.

## Requirements

Verify: Product Owner and HR/Learning approve a catalog field dictionary with type, requiredness, validation, owner/write path, language, visibility, searchable flag, and unresolved items.

## Approach

1. Product Owner and HR/Learning review the confirmed catalog scope against the PRD and available source examples.
2. They add one row per proposed field for each in-scope record type to `data-dictionary.md`, including the full field contract required by this ticket.
3. They decide the authoritative owner and write path for every field that could be supplied manually or by a source. A field without that decision stays blocked from both paths.
4. Product Owner and HR/Learning record their approval in the dictionary. Any unresolved choice names its owner, required evidence, and dependent tickets.

## Acceptance Criteria

1. **The first-release learning-item scope is named**
   **Given** the PRD and source examples are available
   **When** Product Owner and HR/Learning review catalog types
   **Then** the dictionary states which learning-item types are in scope and which are excluded or still open.
2. **Every catalog field has an explicit contract**
   **Given** a field is proposed for an in-scope type
   **When** it is added to the dictionary
   **Then** its name, type, requiredness, validation, visibility, source language, searchability, authoritative owner, and write path are recorded.
3. **Manual and source ownership cannot silently conflict**
   **Given** a field may be imported and manually maintained
   **When** owners review the dictionary
   **Then** one owner or an explicit conflict rule is approved, and unresolved fields are marked blocked from both write paths.
4. **The approval and remaining work are traceable**
   **Given** Product Owner or HR/Learning cannot approve a field
   **When** the spike closes
   **Then** the open choice, owner, evidence needed, and dependent tickets are named in the `Open catalog decisions` section of the dictionary rather than guessed.

## Boundaries

- Do not define employee identity, employee-record types, or personal-record fields; spike 2.4 handles those after ticket 5.2.
- Do not assert that SharePoint is the approved source; ticket 5.4 verifies the candidate independently.
- Do not decide unapproved corporate data classifications or production permissions.

## References

- parent — _bmad-output/initiative-learning-center/tickets/epic-application-foundation/epic-application-foundation.md
- prd — _bmad-output/initiative-learning-center/prd-learning-center/prd-learning-center.md, FR-1, FR-2, FR-5, FR-6, and OQ-3/OQ-4
- architecture — _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md, AD-1 and AD-5
- contract — _bmad-output/initiative-learning-center/architecture-learning-center/shared-contracts.md, Record and field ownership
- output — _bmad-output/initiative-learning-center/architecture-learning-center/data-dictionary.md

## Notes

- Decision: 2026-11-19 — First-release catalog scope is courses, training resources, and certification offerings. Employee-specific records, completions, enrollment, and certification validity or expiry are out of scope for this spike and remain with spike 2.4.
- Risk rationale: Medium because incorrect fields or ownership can create invalid catalog entries and block search/import integration.
- Beyond-criteria check: Product Owner and HR/Learning review one manual-versus-imported field conflict and confirm the documented owner or review path.
