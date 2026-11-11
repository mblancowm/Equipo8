---
tracker_id: ""
type: initiative
title: "Learning Center"
sources:
  - _bmad-output/initiative-learning-center/brief-learning-center/brief-learning-center.md
  - _bmad-output/initiative-learning-center/prd-learning-center/prd-learning-center.md
  - _bmad-output/initiative-learning-center/sources/user-discovery-notes.md
companions:
  - _bmad-output/initiative-learning-center/ux-learning-center/DESIGN.md
  - _bmad-output/initiative-learning-center/ux-learning-center/EXPERIENCE.md
  - _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md
after: []
risk: high
---

# Learning Center

## Description

Create an employee-first place to search approved training and certification information for employees in the United States and Costa Rica, with an administration path for manual entry and an initial automatic source integration.

## Outcome

Employees can find relevant learning information and administrators can keep it current. Success is demonstrated by measured employee search success and time, source freshness, and record accuracy; baselines and targets remain open.

## Requirements

- R1 (FR-1, FR-2): Employees can search and narrow the in-scope learning information available to them, with result type and source visible.
- R2 (FR-3, FR-4): Employees can open authorized information and view only personal records matched to them and permitted by the approved access policy.
- R3 (FR-5, FR-6): Authorized learning administrators can manually create and update in-scope learning items and employee records, with validation and attribution.
- R4 (FR-7, FR-8): Learning Center can import agreed information automatically from one approved source and safely repeat imports without uncontrolled duplicates.
- R5 (FR-9): Authorized administrators can inspect the last synchronization outcome and actionable errors.

## Constraints

- RULE-1 (PRD RULE-1): Imported and manual records retain source provenance and last update details.
- RULE-2 (PRD RULE-2): Employee-linked records are visible only to the employee and roles approved by the organization.
- RULE-3 (PRD RULE-3): Field ownership and conflict behavior are defined before a field is both imported and manually editable.
- RULE-4 (PRD RULE-4): Import failures are visible and do not silently erase the last good state.
- RULE-5 (PRD Q-2): Production use waits for organizational approval of data classification, access, retention, and regional handling.

## Done when

- Employees can find approved in-scope information from manual and connected sources.
- Administrators can add and correct in-scope records with attribution.
- The approved pilot source imports repeatably and exposes failure state.
- Search and details enforce the same approved access rules.
- The team has measured a baseline and agreed on success targets before evaluating a production pilot.
- Security, privacy, source-owner, and product-owner launch gates are recorded and approved.

## Boundaries

- No course delivery, enrollment, attendance, credential issuance, or replacement of source systems.
- No broad integration promise beyond the first approved source.
- No recommendations, performance scoring, or automated employee judgments.
- SharePoint remains a candidate source until its contents and access are confirmed.
- The identity provider and employee directory remain owned by IT/Identity; the SharePoint library remains owned by its source owner. Learning Center consumes only approved access and does not modify those source systems.

## References

- source — _bmad-output/initiative-learning-center/brief-learning-center/brief-learning-center.md, Problem, Solution, Scope
- source — _bmad-output/initiative-learning-center/prd-learning-center/prd-learning-center.md, Requirements, Rules, Open questions
- source — _bmad-output/initiative-learning-center/sources/user-discovery-notes.md, Statements provided
- design — _bmad-output/initiative-learning-center/ux-learning-center/DESIGN.md
- experience — _bmad-output/initiative-learning-center/ux-learning-center/EXPERIENCE.md
- architecture — _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md, Decisions

## Notes

- Assumption: the first release supports a central learning catalog and employee-linked records; the exact record types are not confirmed.
- Assumption: a learning administrator can enter and correct records manually.
- Open question: the source-system inventory and the contents of the example SharePoint folder are unknown; the SharePoint epic begins with a discovery spike.
- Open question: identity, access, retention, language, and numeric success targets must be resolved before production.
- Decision: 2026-11-11 — Keep identity and access as the opening epic instead of adding a platform-baseline epic now. No codebase or approved runtime, hosting, CI, or deployment target is established in the source material. The team must select and record that baseline before implementation starts.
