---
title: "Learning Center"
template: prd
version: 1.1.0
description: "Requirements a team builds from."
status: draft
created: 2026-11-11
updated: 2026-11-11
sources:
  - _bmad-output/initiative-learning-center/sources/user-discovery-notes.md
  - _bmad-output/initiative-learning-center/brief-learning-center/brief-learning-center.md
---

# Learning Center — Product Requirements

## Document purpose

This initiative-level PRD translates the team's current concept into outcomes, capabilities, and constraints. It is based on the user discovery notes and draft brief above. It is not a final implementation specification; the open questions below must be resolved before the affected work is built.

## Vision

Employees in the United States and Costa Rica can search approved training and certification information through one employee-first experience. Learning Center combines authorized imports with administrator-entered information and preserves where each result came from. HR or learning administrators can maintain gaps and see whether connected information is current.

## Users and journeys

These journeys are planning scenarios, not validated research.

### UJ-1 — Employee finds learning information

An employee signs in, searches for a subject or certification, narrows the results using available fields, and opens a result. The employee can tell whether it is a learning opportunity or a personal record and can follow an authorized source link for detail. If no result is available, the employee receives a clear empty state rather than an implied claim that no training exists.

### UJ-2 — Learning administrator adds a missing item

An authorized administrator opens the management area, enters the information they are allowed to maintain, reviews validation feedback, and saves it. The record is searchable and identifies that it was entered manually, including who last changed it.

### UJ-3 — Administrator monitors an import

An administrator views the most recent synchronization outcome for an approved source, can see when it last succeeded, and can identify records or files that need attention. A failed synchronization is visible and does not silently replace good data with an incomplete import.

## Glossary

- Learning item: a course, training resource, or certification offering that an employee may discover.
- Learning record: an employee-specific fact about training or certification, such as completion or credential status. Exact fields are open.
- Source: a connected system or a manual entry that supplied a learning item or record.
- Synchronization: a process that imports or updates information from an approved source.
- Learning administrator: a role authorized to manage some or all learning information. Exact permissions are open.

## Features and requirements

### Employee discovery

FR-1. An employee can search the in-scope learning items and records available to that employee through Learning Center, and the results identify the type and source of each match.

FR-2. An employee can narrow results using fields that are present and approved for the record, such as title, provider, type, region, status, or date. The final filter set depends on the source inventory and approved data model.

FR-3. An employee can open a result and view the information and authorized source link available for that record.

FR-4. An employee can view personal learning records only when the employee's identity has been reliably matched to those records and access is authorized.

### Administration

FR-5. An authorized learning administrator can manually create and update in-scope learning items and employee learning records, subject to required-field validation and permission checks.

FR-6. An authorized learning administrator can identify manually entered information separately from imported information and can see who last changed a manually maintained record.

### Source integration

FR-7. Learning Center can automatically import agreed information from one approved source in the first release. SharePoint is a candidate, not a confirmed integration commitment.

FR-8. An import can be retried without creating duplicate records, and imported records retain a stable source reference and last-synchronized time.

FR-9. An authorized administrator can see the last synchronization outcome and actionable errors for each configured source.

## Rules

RULE-1. Every imported or manually entered record retains provenance sufficient to identify its source and last update.

RULE-2. Personal learning records are visible only to the employee and authorized roles, according to a permission policy approved by the organization.

RULE-3. Source-system ownership and manual-edit precedence are defined before a field can be synchronized and edited from multiple places.

RULE-4. Import failures must be visible; incomplete source data must not silently erase or corrupt previously usable records.

## Non-goals

- Course delivery, enrollment, attendance management, or issuing credentials.
- Replacing existing learning, HR, or certification systems.
- Connecting every source system in the first release.
- Making automated recommendations or employee performance judgments.
- Claiming that a missing search result means no relevant learning exists.

## MVP scope

### In scope — proposed

- Employee search over a central view of in-scope learning items and personal records.
- Manual entry and correction by an authorized learning administrator.
- One approved automated source integration.
- Provenance, source links where permitted, import freshness, and visible import errors.
- Access checks for employee and administrator roles.

### Out of scope — proposed

- Course playback, enrollment, certificate issuance, and broad HR workflows.
- Multiple integrations beyond the pilot source.
- A finalized analytics dashboard or recommendation engine.

## Success metrics

Baselines and targets are open questions; no numeric target is invented here.

- SM-1: employee task success and time to find a relevant item or personal record; balanced by record accuracy and unauthorized-result rate.
- SM-2: percentage of agreed in-scope source records represented and searchable; balanced by duplicate and stale-record rates.
- SM-3: successful synchronization runs and age of the latest successful import; balanced by error recovery time and data integrity.
- SM-4: administrator time to add or correct a record; balanced by completeness and auditability.

## Quality and constraints

- Q-1 Security: enforce access control on the server for every employee-specific record; do not rely on hiding UI elements as authorization.
- Q-2 Privacy: use the minimum approved employee data needed to match and display records. Data residency, retention, and regional requirements require organizational review before production.
- Q-3 Reliability: synchronization is observable, retryable, and idempotent; source failures must not hide the last good state.
- Q-4 Accessibility: core search, result, and administration flows target WCAG 2.2 Level AA, including keyboard access, semantic labels, visible focus, announcements for changing results and validation, and status cues that do not rely on color.
- Q-5 Performance: the team must set measurable search and synchronization targets after source volume and user expectations are known.
- Q-6 Auditability: record changes and import outcomes are attributable to a user or source process with timestamps.

## Experience and platform

The selected development baseline is an internal browser SPA using React Router and a Django REST API with PostgreSQL. Exact versions, dependency management, local routing, API payloads, and shared identity/data/search contracts are recorded in architecture AD-11 and shared-contracts.md. The corporate design system and production hosting/operations remain open.

## Stakeholders, risks, and rollout

Required stakeholders: employee representatives in both countries, HR or learning administration, IT/identity, SharePoint or source-system owners, security/privacy, and the product owner.

Key risks:

- The example SharePoint location may contain learning materials but not employee certification records.
- Source files may be unstructured or inconsistent.
- Employee identity may not match consistently across sources.
- A broad admin role could expose employee records inappropriately.
- Sync may duplicate, overwrite, or miss updates without a field ownership policy.

Rollout should begin with a non-production sample and approved test data. Pilot scope, owners, dates, and launch gates are not yet known.

## Integrations and operations

The first source is undecided. SharePoint is an example location only. The team must confirm the library, file types, permissions, identity model, and supported integration method before implementation. A connector should expose source status, last successful sync, failure details, and retry behavior.

## Data and compliance

The product may contain employee-linked training and certification information. Before production, the organization must approve data classification, access rules, retention, audit, and any cross-region handling. This PRD does not assert a legal basis or compliance conclusion.

## Open questions

- OQ-1 — Product Owner and source owners: Which systems and libraries are in scope, and which contain learning items versus employee-specific records? Needed before the source integration epic.
- OQ-2 — IT/Identity: Which employee identifier and sign-in provider may be used? Needed before employee-specific access is built.
- OQ-3 — HR/Learning administrator: Which fields define a learning item and a completion or certification record? Needed before manual entry and deduplication.
- OQ-4 — HR and source owners: Which system owns each field, and how are manual edits reconciled with imports? Needed before synchronization writes.
- OQ-5 — Security/Privacy: Which roles may view or edit which employee records, and what retention or regional handling rules apply? Needed before production data is loaded.
- OQ-7 — Product Owner: What baseline and target make search measurably easier? Needed before pilot success can be judged.
- OQ-8 — IT/source owner: What synchronization delay and failure recovery are acceptable? Needed before source integration acceptance.
- OQ-9 — Product Owner: Is course discovery, personal completion history, certification validity/expiry, or all three in the first release? Needed before the first epic is refined.

## Decisions

- D-1: Employees are the primary audience and HR/learning administrators are also supported, based on the team's stated direction.
- D-2: Automatic source imports and manual data entry are both desired capabilities.
- D-3: The supplied SharePoint location is an example, not an approved or verified integration source.
- D-4: The delegated development baseline is Django REST with Python, React Router SPA, and PostgreSQL; architecture AD-11 records versions, local proxy, package managers, and lockfiles.
- D-5: The UI supports English and Spanish with a visible user-selected locale and targets WCAG 2.2 Level AA. Source text is not automatically translated; shared-contracts.md records locale and search behavior.
