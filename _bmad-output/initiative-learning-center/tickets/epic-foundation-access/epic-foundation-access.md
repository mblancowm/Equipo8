---
tracker_id: ""
type: epic
title: "Employee identity and access"
parent: "initiative-learning-center"
covers: ["R2"]
sources:
  - _bmad-output/initiative-learning-center/initiative-learning-center.md
companions:
  - _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md
  - _bmad-output/initiative-learning-center/ux-learning-center/EXPERIENCE.md
after: []
risk: high
---

# Employee identity and access

## Description

Establish the approved identity match and role boundary that protect employee-specific records and limit management actions to authorized learning administrators.

## Outcome

Employees can use Learning Center without seeing another employee's personal records, and authorized administrators can perform approved management actions.

## Requirements

- R1 (parent R2): Employees can access only personal records that are reliably matched to them and permitted by the approved access policy.
- R2 (parent RULE-2): All reads and writes of employee-linked data enforce the same server-side role and ownership rules.

## Constraints

- C1 (parent RULE-2): The UI is not an authorization boundary.
- C2 (architecture AD-3): Search, details, administration, and any export share the same authorization policy.
- C3 (parent RULE-5): Data classification, access, retention, and regional handling are approved and recorded before production employee data is used.

## Done when

- The organization has approved an employee identifier and identity provider.
- Employee and learning-administrator roles are enforced on every relevant operation.
- Tests or review evidence demonstrate that one employee cannot retrieve another employee's protected record.
- Missing or ambiguous identity matches fail closed and produce a clear next step.
- Organizational owners have recorded approval for data classification, access, retention, and regional handling before production employee data is used.
- The integrated access flow is deployed to the approved production environment after required identity and security/privacy approvals, and end-to-end checks with approved test data verify permitted and denied requests.

## Boundaries

- No broad HR permissions beyond the actions explicitly approved for the learning-administrator role.
- No production employee data until security/privacy approval is recorded.

## References

- parent — _bmad-output/initiative-learning-center/initiative-learning-center.md, Requirements R2 and Constraints RULE-2/RULE-5
- architecture — _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md, AD-3

## Notes

- Open question: identity provider, employee key, and role owner must be confirmed before implementation.
