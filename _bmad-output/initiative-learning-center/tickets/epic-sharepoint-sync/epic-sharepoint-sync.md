---
tracker_id: ""
type: epic
title: "Approved source synchronization"
parent: "initiative-learning-center"
covers: ["R4", "R5"]
sources:
  - _bmad-output/initiative-learning-center/initiative-learning-center.md
companions:
  - _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md
  - _bmad-output/initiative-learning-center/prd-learning-center/prd-learning-center.md
after: ["epic-manual-records"]
risk: high
---

# Approved source synchronization

## Description

Connect one organization-approved source and import its agreed learning information into the canonical record view, with repeatable updates and visible operational status.

## Outcome

Employees can find approved information from the pilot source in Learning Center, and administrators can tell whether the import is current or needs attention.

## Requirements

- R1 (parent R4): An approved source can be imported automatically into the agreed canonical learning records.
- R2 (parent R4): Reprocessing a source item updates the matching record rather than creating uncontrolled duplicates.
- R3 (parent R5): Authorized administrators can inspect the last successful run and actionable import errors.
- R4 (parent RULE-4): A failed or partial run does not silently erase the last good data.

## Constraints

- C1 (architecture AD-2): Source access and content shape are verified before declaring the connector supported.
- C2 (architecture AD-4): Synchronization is observable, retryable, and idempotent.
- C3 (architecture AD-5): Imported fields do not overwrite manual edits without an approved field-ownership rule.
- C4 (architecture AD-7): Source documents are linked by default; copying them requires a separate approval.

## Done when

- A source owner approves the exact library, content types, identity, and integration permissions.
- The connector imports agreed records and preserves source identifiers and links.
- Re-running synchronization does not create uncontrolled duplicates.
- Administrators can see success time, failure reason, and retry state.
- The last good state remains available when a source is unavailable.
- The integrated connector, record storage, and source-health view are deployed to the approved production environment and verified with source-owner-approved test data under the approved data and access gates.

## Boundaries

- The supplied SharePoint path is not considered an approved source until verified.
- No integration with all corporate systems is promised by this epic.
- No source file is copied into Learning Center without approved retention and access rules.

## References

- parent — _bmad-output/initiative-learning-center/initiative-learning-center.md, Requirements R4/R5 and Constraint RULE-4
- prd — _bmad-output/initiative-learning-center/prd-learning-center/prd-learning-center.md, FR-7 to FR-9 and OQ-1/OQ-4/OQ-8
- architecture — _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md, AD-2, AD-4, AD-5, AD-7

## Notes

- Assumption: SharePoint may be selected as the pilot source if its owner authorizes access and the content is suitable.
- Open question: folder contents, file types, permissions, update semantics, and conflict rules remain unknown.
