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

Verify the candidate SharePoint folder for a read-only proof of concept (POC): its contents, metadata, owner/use, and existing permission boundary. The POC uses the authorized user's existing SharePoint permissions and does not request broader access. This discovery does not authorize production access or copy source files.

## Requirements

Verify: The source map records the PO-approved POC scope and source key, observed sample schema, existing-permission boundary, and unsupported or unresolved cases with owners. Production-only approvals remain explicit gates for any later production connector.

## Acceptance Criteria

1. **The source location and accountable owner are confirmed**
   **Given** the example folder name is known
   **When** the source owner reviews the location
   **Then** the exact site, library/folder, owner, and approved use are recorded, or the source is rejected with a reason.
2. **The content is inventoried for the pilot**
   **Given** the Product Owner authorizes one-time read-only exploration and the connected account has access
   **When** the team inspects the folder listing and available item metadata
   **Then** file types, structure, in-scope learning items, employee-linked data indicators in metadata, and unsupported cases are recorded without downloading or copying recording contents.
3. **The read-only POC stays within existing permissions**
   **Given** Harun has selected this candidate for a POC
   **When** the team inspects source metadata using the authorized connected account
   **Then** the work is read-only, uses that account's existing SharePoint permissions, and does not broaden access. No separate IT confirmation is required for this POC or its Graph item-key choice. Production access, app-only credentials, or broader permissions remain separate approval gates.
4. **The POC has an idempotent source key and explicit lifecycle rule**
   **Given** the same recording is encountered again during an import retry
   **When** the source map is finalized
   **Then** it recommends the configured source connection/drive plus Graph `driveItem.id` as the item key, records documented rename/move behavior within one drive, and records the append-only pilot with manual handling of exceptional changes. Unverified automated change/withdrawal signals remain deferred to ticket 3.6.
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
- A one-time read-only inspection of the candidate folder listing and available item metadata by this agent is within this discovery ticket following the Product Owner's direction, using the authorized connected account. Do not download or play recordings, modify source items, or connect the future Learning Center application.
- Do not copy metadata containing personal information into the repository. If employee-linked information appears, record only that it is present and the classification question; do not reproduce the data.
- Do not expose source links to employees. This exploratory inspection does not approve the future application connector, its credentials, or employee access path.
- Do not promise SharePoint as the pilot source until the owner approves it.

## References

- parent — _bmad-output/initiative-learning-center/tickets/epic-application-foundation/epic-application-foundation.md
- prd — _bmad-output/initiative-learning-center/prd-learning-center/prd-learning-center.md, FR-7 to FR-9 and OQ-1/OQ-4/OQ-8
- architecture — _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md, AD-2, AD-4, AD-5, and AD-7
- contract — _bmad-output/initiative-learning-center/architecture-learning-center/shared-contracts.md, Record and field ownership and Source synchronization lifecycle
- output — _bmad-output/initiative-learning-center/architecture-learning-center/sharepoint-source-map.md

## Notes

- Risk rationale: High because unsupported or over-broad source access can expose employee or corporate information and make the integration unusable.
- Beyond-criteria check: Confirm the POC remains read-only under existing SharePoint permissions and identifies any production connector, app-only credential, or broader scope as requiring the applicable owner, IT, Security, and organizational approvals.
