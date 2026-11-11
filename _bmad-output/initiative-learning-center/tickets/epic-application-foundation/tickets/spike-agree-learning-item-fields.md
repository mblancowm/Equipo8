---
id: 3
type: spike
title: "Agree learning item fields"
parent: epic-application-foundation
covers: [R1]
after: []
refined: true
hitl: true
risk: medium
---

# Agree learning item fields

## Description

Product Owner and HR/Learning agree the minimum catalog schema and field ownership before manual forms, imports, or search filters are built. This spike covers shared learning items only; employee-linked fields are handled by spike 2.4 after identity decision 5.2.

## Requirements

Verify: Product Owner and HR/Learning approve a catalog field dictionary with type, requiredness, validation, owner/write path, language, visibility, searchable flag, and unresolved items.

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
   **Then** the open choice, owner, evidence needed, and dependent tickets are named in the dictionary rather than guessed.

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

- Risk rationale: Medium because incorrect fields or ownership can create invalid catalog entries and block search/import integration.
- Beyond-criteria check: Product Owner and HR/Learning review one manual-versus-imported field conflict and confirm the documented owner or review path.
