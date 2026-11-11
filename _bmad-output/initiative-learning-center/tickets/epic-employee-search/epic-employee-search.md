---
tracker_id: ""
type: epic
title: "Employee search and record discovery"
parent: "initiative-learning-center"
covers: ["R1", "R2"]
sources:
  - _bmad-output/initiative-learning-center/initiative-learning-center.md
companions:
  - _bmad-output/initiative-learning-center/ux-learning-center/DESIGN.md
  - _bmad-output/initiative-learning-center/ux-learning-center/EXPERIENCE.md
  - _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md
after: ["epic-manual-records", "epic-sharepoint-sync"]
risk: medium
---

# Employee search and record discovery

## Description

Give employees a single, authorized search experience over approved manual and imported learning information, with enough context to identify what a result represents and where it came from.

## Outcome

Employees can find relevant learning information without searching each approved source separately.

## Requirements

- R1 (parent R1): An employee can search the approved canonical learning information that the employee is authorized to see.
- R2 (parent R1): Results identify the item type and source and can be narrowed by approved fields that exist in the data.
- R3 (parent R2): An employee can open authorized details and personal records without revealing another employee's protected information.

## Constraints

- C1 (parent RULE-2): Search, snippets, counts, and details apply the same access policy.
- C2 (architecture AD-6): Search is derived from the approved canonical view and has a recoverable freshness path.
- C3 (experience): Empty, stale, partial, and denied states must not make stronger claims than the data supports.

## Done when

- Employees can search manual and imported records in one experience.
- Approved filters and source information are understandable and accessible.
- Unauthorized employee-specific data is absent from results, snippets, counts, and details.
- Empty, stale, and error states tell the employee what is known and what can be done.
- The Product Owner and employee representatives measure task success and search time, record the baseline, and agree numeric pilot targets before evaluating a production pilot.
- The integrated search experience is deployed to the approved production environment and verified end to end across approved manual and imported records, including authorization and stale or error states.

## Boundaries

- No recommendations, ranking by employee performance, or training enrollment.
- No global claim that a missing result means the organization has no relevant training.

## References

- parent — _bmad-output/initiative-learning-center/initiative-learning-center.md, Requirements R1/R2 and Constraint RULE-2
- prd — _bmad-output/initiative-learning-center/prd-learning-center/prd-learning-center.md, UJ-1, FR-1 to FR-4, SM-1
- design — _bmad-output/initiative-learning-center/ux-learning-center/DESIGN.md
- experience — _bmad-output/initiative-learning-center/ux-learning-center/EXPERIENCE.md
- architecture — _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md, AD-3 and AD-6

## Notes

- Assumption: employees need both discovery of learning items and access to their own completion or certification records.
- Open question: which fields users need to search and filter, and which personal record types belong in the first release.
