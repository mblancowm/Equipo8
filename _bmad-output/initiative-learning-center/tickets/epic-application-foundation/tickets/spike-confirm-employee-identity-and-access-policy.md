---
id: 2
type: spike
title: "Confirm employee identity and access policy"
parent: epic-application-foundation
covers: [R1]
after: []
refined: true
hitl: true
risk: high
---

# Confirm employee identity and access policy

## Description

Product Owner, IT/Identity, HR/Learning, and Security/Privacy review the approved sign-in options, employee identifiers, employee-record visibility, administrator permissions, and production-data gates. The decision is needed before access enforcement, employee-record entry, or personal-record search can be built.

## Approach

Timebox: one structured decision review. If required owners cannot approve a decision in that review, record the unresolved choice, its owner, and the tickets that must wait.

1. IT/Identity identifies the organization-approved sign-in provider and employee identifiers available for employees in the United States and Costa Rica.
2. HR/Learning defines which employee and learning-administrator roles may view or change each kind of learning information.
3. Security/Privacy reviews data classification, access, retention, regional handling, and the conditions that must be met before production employee data is used.
4. The Product Owner records the approved identity and access decision in the architecture spine under AD-3. Keep the architecture spine as the shared decision source; the epic notes link to unresolved owners and gates.

## Acceptance Criteria

1. **The employee identity match is approved**
   Verify: The decision record names the approved sign-in provider, the employee identifier used for matching, its authoritative owner, and how the system handles missing, duplicate, or conflicting matches across the United States and Costa Rica.
2. **The access policy is explicit**
   Verify: The approved role matrix states what an employee can see and change, what a learning administrator can see and change, and how a request for another employee's record is denied.
3. **Production data gates have named owners**
   Verify: Security/Privacy and organizational data owners record data classification, access, retention, and regional-handling approvals or list each open approval, its owner, and the condition that blocks production employee data.
4. **The decision is available to every waiting ticket**
   Verify: The approved result or unresolved decisions are recorded under architecture AD-3, and the access story, employee-record story, and personal-search story can reference that location without duplicating a different policy.

## References

- parent — _bmad-output/initiative-learning-center/tickets/epic-application-foundation/epic-application-foundation.md
- initiative — _bmad-output/initiative-learning-center/initiative-learning-center.md, Constraint RULE-6 and release gate RULE-5
- architecture — _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md, AD-3, AD-10, and Open Questions
- contract — _bmad-output/initiative-learning-center/architecture-learning-center/shared-contracts.md, Identity and authorization boundary
- experience — _bmad-output/initiative-learning-center/ux-learning-center/EXPERIENCE.md, Foundation and Key Flows

## Notes

- Open question: Which approved employee identifier is stable and unique across the United States and Costa Rica systems? This spike resolves it.
- Risk rationale: High because a wrong identity match or role rule could disclose another employee's personal record.
- Beyond-criteria check: Before story 1.2 starts, Security/Privacy reviews an ambiguous identity mapping and a cross-country visibility case using approved test scenarios.
