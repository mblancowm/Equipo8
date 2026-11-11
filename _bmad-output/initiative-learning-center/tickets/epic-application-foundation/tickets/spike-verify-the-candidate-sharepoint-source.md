---
id: 4
type: spike
title: "Verify the candidate SharePoint source"
parent: epic-application-foundation
covers: [R1]
after: []
refined: true
hitl: true
risk: high
---

# Verify the candidate SharePoint source

## Description

The source owner and IT verify whether the example SharePoint location contains approved learning catalog data and can be read through an authorized, supportable integration path. This is discovery only; it does not connect the app or copy source files.

## Requirements

Verify: The source owner and IT provide an approved source map, permission decision, sample schema, and list of unsupported or unresolved cases.

## Acceptance Criteria

1. **The source location and accountable owner are confirmed**
   **Given** the example folder name is known
   **When** the source owner reviews the location
   **Then** the exact site, library/folder, owner, and approved use are recorded, or the source is rejected with a reason.
2. **The content is classified for the pilot**
   **Given** an owner-approved sample is available
   **When** the team examines its files and metadata
   **Then** file types, structure, in-scope learning items, employee-linked data presence, and unsupported cases are recorded without copying the source into the application.
3. **Read permissions are approved**
   **Given** an automated connector is considered
   **When** IT and the source owner assess access
   **Then** the least-privilege permission, credential owner, and whether employees need per-user source access are documented and approved or listed as open gates.
4. **Updates and withdrawals have an authoritative signal**
   **Given** a source item changes, disappears, or is renamed
   **When** the source owner explains lifecycle behavior
   **Then** stable identifiers, update signals, deletion/withdrawal signals, and any unavailable semantics are recorded for later implementation.
5. **The result is shared without inventing approval**
   **Given** any owner cannot decide an item
   **When** the spike closes
   **Then** the question, owner, required evidence, and blocked tickets are captured in the source map.
6. **A rejected candidate has an explicit next step**
   **Given** the candidate is unsuitable or access cannot be approved
   **When** the source owner and Product Owner close the review
   **Then** the Product Owner selects a different candidate for a new verification spike or records that the source integration is deferred; no connector starts against an unverified fallback.

## Boundaries

- Do not use real employee data or credentials in local development.
- Do not connect to SharePoint, download files, or expose links to employees in this discovery ticket.
- Do not promise SharePoint as the pilot source until the owner approves it.

## References

- parent — _bmad-output/initiative-learning-center/tickets/epic-application-foundation/epic-application-foundation.md
- prd — _bmad-output/initiative-learning-center/prd-learning-center/prd-learning-center.md, FR-7 to FR-9 and OQ-1/OQ-4/OQ-8
- architecture — _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md, AD-2, AD-4, AD-5, and AD-7
- contract — _bmad-output/initiative-learning-center/architecture-learning-center/shared-contracts.md, Record and field ownership and Source synchronization lifecycle
- output — _bmad-output/initiative-learning-center/architecture-learning-center/sharepoint-source-map.md

## Notes

- Risk rationale: High because unsupported or over-broad source access can expose employee or corporate information and make the integration unusable.
- Beyond-criteria check: Source owner and IT review the proposed automated read permission and explicitly identify any access path that could expose a restricted source item.
