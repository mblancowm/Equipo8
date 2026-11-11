---
tracker_id: ""
type: epic
title: "Manual learning information management"
parent: "initiative-learning-center"
covers: ["R3"]
sources:
  - _bmad-output/initiative-learning-center/initiative-learning-center.md
companions:
  - _bmad-output/initiative-learning-center/prd-learning-center/prd-learning-center.md
  - _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md
  - _bmad-output/initiative-learning-center/architecture-learning-center/shared-contracts.md
  - _bmad-output/initiative-learning-center/ux-learning-center/EXPERIENCE.md
after: ["epic-application-foundation", "epic-foundation-access"]
risk: medium
---

# Manual learning information management

## Description

Give authorized learning administrators a controlled way to add and correct the learning information that employees need to find, while preserving who entered or changed it.

## Outcome

An administrator can maintain valid, traceable learning information without making employees depend on scattered manual searches.

## Requirements

- R1 (parent R3): Authorized administrators can manually create and update agreed learning items and employee learning records with validation.
- R2 (parent RULE-1): Manual records identify that they were entered manually and retain creator and last-editor attribution.
- R3 (parent RULE-3): Fields that can also be imported have an approved ownership and conflict policy before synchronization is enabled.

## Constraints

- C1 (parent RULE-2): Administrator actions follow the approved access policy.
- C2 (architecture AD-1, AD-5): Manual entry uses the canonical record model and does not erase source provenance.

## Done when

- The team has approved separate field definitions for learning items and employee-linked records.
- Required fields and validation are explicit.
- Authorized administrators can create and correct records; unauthorized users cannot.
- Manual records are distinguishable from imported records and carry attributable change history.
- The integrated create and update flow is deployed to the approved production environment and verified end to end with approved test records, attribution, and server-side authorization.

## Boundaries

- Does not create or deliver a course.
- Does not assert that a certificate is authentic or valid unless an approved source provides that status.

## References

- parent — _bmad-output/initiative-learning-center/initiative-learning-center.md, Requirements R3 and Constraints RULE-1/RULE-3
- prd — _bmad-output/initiative-learning-center/prd-learning-center/prd-learning-center.md, FR-5, FR-6, glossary
- architecture — _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md, AD-1, AD-5, AD-8, AD-9, and AD-10
- contract — _bmad-output/initiative-learning-center/architecture-learning-center/shared-contracts.md, Record and field ownership
- experience — _bmad-output/initiative-learning-center/ux-learning-center/EXPERIENCE.md, Administration flow and Accessibility Floor

## Notes

- Assumption: a learning administrator is the role that performs manual entry.
- Open question: required fields, employee matching, and permitted manual overrides are not confirmed.
- Open question: Operations must approve the production target and support model before this epic can be marked done.
