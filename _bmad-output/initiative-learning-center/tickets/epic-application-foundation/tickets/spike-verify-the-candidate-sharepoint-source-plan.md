---
title: "Verify the candidate SharePoint source"
ticket: 4
status: done
assignee: "Harun"
baseline_revision: "0d7dadc5f6abf2d2eee96bbd3b96456fb8e30a4b"
context:
  - AGENTS.md
  - _bmad-output/initiative-learning-center/tickets/epic-application-foundation/tickets/spike-verify-the-candidate-sharepoint-source.md
  - _bmad-output/initiative-learning-center/tickets/epic-application-foundation/epic-application-foundation.md
  - _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md
  - _bmad-output/initiative-learning-center/architecture-learning-center/shared-contracts.md
  - _bmad-output/initiative-learning-center/architecture-learning-center/sharepoint-source-map.md
  - _bmad-output/initiative-learning-center/prd-learning-center/prd-learning-center.md
  - _bmad-output/initiative-learning-center/TEAM-START-HERE.md
  - _bmad-output/initiative-learning-center/tickets/epic-sharepoint-sync/epic-sharepoint-sync.md
  - _bmad-output/initiative-learning-center/tickets/epic-sharepoint-sync/tickets/tickets.toml
---

## Goal

Complete ticket 5.4's source-verification work for the read-only POC using repository evidence and Product Owner decisions. The source key is accepted as configured `source_connection_id`/drive plus Graph `driveItem.id`; Harun waived separate IT confirmation for this POC and directed use of existing SharePoint permissions without broadening access. Keep production access and broader permission approvals separate. The folder inventory and metadata review are complete; no recording was downloaded or played.

## Code Map

- The required output is `_bmad-output/initiative-learning-center/architecture-learning-center/sharepoint-source-map.md`.
- Ticket 5.4 defines seven decision areas: exact location/use/owner; content and classification; stable identifiers; least-privilege read access; lifecycle signals; sample and permission approval; and the rejection/defer decision.
- The SharePoint synchronization epic records direct dependency `3.2` on `5.4`, `5.3`, `5.1`, and `5.7`; tickets `3.3` and `3.4` depend on `3.2`. Do not mark `5.7` blocked by this spike.
- The source map already has `pending-owner-approval` status and a decision matrix. Preserve that overall status until owners provide evidence.

## Design Notes

- Keep the source map factual and traceable to repository references. Distinguish established project facts from external decisions that remain unverified.
- For every open gate, record its question, accountable organizational role, evidence needed, and directly or transitively blocked ticket IDs.
- Include a concise review checklist Harun can take to the owners. Use one-time read-only metadata inspection for discovery; do not copy recordings or personal metadata into this repository.
- Follow the revised ticket boundary: perform one-time read-only folder and item-metadata inspection using the authorized connected SharePoint account; do not download/play recordings, modify items, copy personal metadata into the repository, expose employee links, or connect the future Learning Center application.
- A rejected candidate or deferred integration requires an explicit Product Owner decision. Record the decision as pending unless evidence in the repo shows it has been made.

## User-Provided Evidence

- Harun stated that he is the Product Owner and selected the first candidate for verification on 2026-11-20: site `https://westmonroepartners1.sharepoint.com/sites/TechEx`, library `Shared Documents`, folder `/AI/AI Brownbag - Software`, described as containing Technology & Experience Brownbags.
- Record this as a Product Owner-reported candidate and intended scope, not as SharePoint-owner verification or IT/Security approval. Use only the normalized site/library/folder locator; do not retain the sharing URL parameters.
- Harun reports that the folder contains a series of recordings and that Learning Center will not modify them. No write permission is proposed. Harun subsequently directed one-time read-only metadata exploration through the authorized connected account for this discovery ticket. This does not approve a future automated application connector or its per-user access path.
- Harun confirmed each recording should be an individual in-scope learning resource represented by metadata and a link. The listing shows MP4 files; two representative items expose `Title` and `Date` fields. Recording contents, employee-data presence, and all-item custom-field population remain unverified. Harun decided no additional classification is needed because no sensitivity label is visible on the folder.
- Harun identified Gloriana Barquero as the person responsible for the folder, then reported that she confirmed her responsibility and the permitted use on 2026-11-20. Record this as PO-reported confirmation; no separate written evidence is attached. This does not approve future app access.
- Harun approved date semantics: SharePoint `Date` is the Brownbag session date; when missing, keep session date empty and display `Created` separately as “Added to SharePoint” / “Añadido a SharePoint.” The catalog dictionary in ticket 5.3 must preserve that distinction.
- Harun requires `Title` on every learning resource (2026-11-20). A bounded exact-row check evaluated six rows and observed at least one empty `Title`; completeness across all 28 has not been verified. Harun confirmed per-record source-name fallback is sufficient, so exhaustive coverage is not a blocker for 5.4.
- Harun approved using the source file name as the fallback when `Title` is empty. Reuse any visible SharePoint classification and existing permissions; if no label is visible on the folder or files, no additional classification step is required.
- Harun decided to reuse the permissions and security classification already applied in SharePoint; if no sensitivity label is visible on the folder or files, no additional classification step is required. The folder details pane showed no label, and Harun confirmed that folder-level absence is sufficient for 5.4; no per-file label check is required. This decision does not approve the future app connector or production access.
- Harun decided that the future application must honor existing SharePoint ACLs without broadening access. IT, Security, and the SharePoint owner still need to confirm a connector path that can enforce those ACLs, plus its least-privilege scope and credential/identity owner.
- Harun reports that Brownbag files are rarely changed after storage and approved an append-only initial pilot; exceptional edits, moves, renames, or removals will be handled manually. Optional ticket 3.6 will assess whether a safe automated scan is useful after 3.2; it does not block 3.2. Ticket 3.3 is a follow-on only if automation is approved.
- Harun considers the available fields sufficient for the initial catalog. He requested a future ticket to evaluate `Topic` and `Presenter` after ticket 3.2, without blocking the initial import.

## SharePoint Inspection Results

- Resolved `Technology & Experience` site, `Documents` library (`Shared Documents` path), and candidate folder. The listing has two year subfolders: 5 MP4 files under `2025` and 23 under `2026` (28 total; 6,500,392,162 bytes, about 6.50 GB).
- The listing provides file name, extension, item type, size, created/modified timestamps, item/parent IDs, and link fields. Exact metadata for two representative items additionally exposed MIME type `video/mp4`, eTag, QuickXorHash, and SharePoint site/web/list/item identifiers.
- A targeted exact-item read confirmed the identifier shapes without recording their values: Graph `driveItem.id`, the Documents library's `drive_id`, and SharePoint `list_id`, numeric `list_item_id`, GUID `list_item_unique_id`, `site_id`, and `web_id` are available. Microsoft Graph describes `driveItem.id` as unique within a drive and documents that renaming or moving the item within that drive does not change its ID; path-based addressing changes after a rename or move. For a Graph connector to this one library, use the configured `source_connection_id`/drive plus `driveItem.id` as the candidate source key. The Graph move API does not move items between drives, and a copy creates a new drive item; cross-library moves/copies therefore need separate handling. `eTag` covers the item's metadata and content for version/concurrency checks; `cTag` is content-only; QuickXorHash can indicate content changes. These are change/version signals, not item identity. Official references: [driveItem addressing](https://learn.microsoft.com/en-us/graph/onedrive-addressing-driveitems), [driveItem](https://learn.microsoft.com/en-us/graph/api/resources/driveitem?view=graph-rest-1.0), [SharePointIds](https://learn.microsoft.com/en-us/graph/api/resources/sharepointids?view=graph-rest-1.0), [move](https://learn.microsoft.com/en-us/graph/api/driveitem-move?view=graph-rest-1.0), and [copy](https://learn.microsoft.com/en-us/graph/api/driveitem-copy?view=graph-rest-1.0). IT and the SharePoint owner still need to confirm that the approved future connector uses this Graph drive scope.
- Two representative list rows expose `Title` (both populated), `Date` (one populated), `Created` (both populated), `ContentType`, `Modified`, `FileLeafRef`, `FileSizeDisplay`, person lookup IDs for author/editor, and media/version/compliance fields. No topic, presenter, duration, language, or transcript field appeared in the sampled schema. No filenames, identifiers, link values, person values, or recording content were copied into the repository.
- A targeted completeness pass for `Title`, `Date`, and `Created` across all 28 items remains incomplete. A bounded retry evaluated six exact rows, found at least one empty `Title`, and then hit connector errors on further reads. No field values were copied; full coverage remains unverified.
- Harun approved separate semantics: `Date` is the session date; when absent, display `Created` as “Added to SharePoint” / “Añadido a SharePoint” without using it as the session date.
- A separate library-column discovery call returned one unfiltered page of 100 library rows because the connector does not accept a folder filter for that action. Only the field names/response shape were inspected; row values were not processed, surfaced, or copied. Folder findings above rely on the folder listing and two exact item metadata reads. No more library-wide queries were made.
- This was a one-time metadata read through the connected SharePoint account at the Product Owner's direction. It does not approve the future application connector, its credential owner, or the employee access path.

## Tasks

1. Reconcile the ticket, architecture (AD-2/AD-4/AD-5/AD-7), shared source lifecycle contract, PRD open questions, source-sync dependencies, and current source map.
2. Use the connected SharePoint tools to inventory the candidate folder listing and available item metadata only; do not download or play recordings.
3. Update the source map with the Product Owner-reported facts, observed non-personal metadata, remaining open gates, accountable owner roles, required evidence, affected ticket IDs, and owner review checklist.
4. Keep the map's production-access status pending; record the POC approval separately and leave each future production decision unresolved unless evidence exists.

## Verification

- Review the source map against every 5.4 acceptance criterion and confirm the missing owner decisions remain explicit.
- Confirm ticket references match the source-sync ticket dependencies: `3.2` directly; `3.3` and `3.4` downstream; `5.7` remains unblocked by 5.4.
- Confirm the supplied candidate locator is attributed to the Product Owner and not represented as source-owner verified; confirm no additional owner, permission, sample schema, approval, or lifecycle behavior was invented.
- Confirm the map distinguishes folder-wide inventory and sampled metadata, records the POC permission/key decision, and keeps production access, broader permissions, and unverified content inspection separate.
- Confirm no recording content, personal metadata values, credentials, or employee-facing link was copied into the repository.

## Remaining Gate

No 5.4 POC gate remains: the read-only folder inventory and representative metadata samples are complete; Harun accepted the candidate and Graph key for the POC using existing SharePoint permissions, with no separate IT confirmation or broader access. Gloriana's responsibility and permitted use are confirmed per the Product Owner's report. Harun closed the folder-level classification point and approved per-record `Title` fallback. The append-only pilot uses manual exception handling; optional technical scanning is deferred to 3.6. Production connector approvals, app-only credentials, employee-facing access, cross-drive handling, and organizational identity/access/classification/retention/regional approvals remain future gates. Field ownership and conflict policy belongs to 5.3 and remains a prerequisite for 3.2, as does 5.7.

The Product Owner's optional `Topic`/`Presenter` evaluation is tracked separately as future ticket 3.5 after 3.2 and does not block 3.2.

## Plan Change Log

- 2026-11-20: Converted the metadata-only ready plan into an actionable evidence-bounded plan. Recorded baseline `0d7dadc5f6abf2d2eee96bbd3b96456fb8e30a4b` before implementation.
- 2026-11-20: Recorded the Product Owner's TechEx AI Brownbag candidate selection as reported evidence; source-owner, IT, and Security gates remain open.
- 2026-11-20: Product Owner revised ticket scope to allow one-time read-only folder/item-metadata exploration, separate from connecting the future application; inventoried 28 MP4 files and sampled two list rows without opening recordings.
- 2026-11-20: Product Owner approved separate session-date and source-added-date display semantics for recordings with no `Date` value.
- 2026-11-20: Product Owner made `Title` required; the 28-item field coverage query was rate limited, so population remains unverified beyond the two sampled items.
- 2026-11-20: Product Owner approved the source file name as the fallback for empty `Title`, subject to any visible SharePoint label and existing ACLs.
- 2026-11-20: Product Owner confirmed available fields suffice initially and requested future evaluation of `Topic`/`Presenter` in a separate ticket after 3.2.
- 2026-11-20: Product Owner reported that Gloriana confirmed her responsibility for the folder and permitted use; recorded as PO-reported confirmation, without separate correspondence attached.
- 2026-11-20: A bounded exact-row field-presence retry evaluated six rows, observed at least one empty `Title`, and stopped after connector errors; all-28 coverage remains unverified.
- 2026-11-20: Product Owner decided to reuse SharePoint permissions and labels; if no label is visible on the folder/files, no extra classification step is needed. No label was visible in the folder details pane, but file-level label presence remains unverified because the file view did not load.
- 2026-11-20: Product Owner confirmed that the folder-level absence of a sensitivity label is sufficient to close the classification point; no per-file check is required for ticket 5.4.
- 2026-11-20: Product Owner confirmed per-record filename fallback is sufficient for required `Title`; all-28 coverage remains unknown but is not a blocker for 5.4.
- 2026-11-20: Product Owner decided the future app must honor existing SharePoint ACLs; IT, Security, and the source owner still need to verify the connector path and least-privilege configuration.
- 2026-11-20: Product Owner approved append-only pilot behavior with manual exception handling for rare changes, moves, renames, or removals. Optional change-scan evaluation is ticket 3.6 after 3.2; implementation ticket 3.3 remains optional after that evaluation.
- 2026-11-20: Investigated the SharePoint identifiers through a targeted read-only Graph item lookup and Microsoft Graph documentation. Recorded `source_connection_id`/drive + `driveItem.id` as the candidate idempotency key for the future Graph connector; rename/move stability applies within the same drive. Connector and ACL approval, field ownership, and cross-drive handling remain open.
- 2026-11-20: Harun accepted configured source connection/drive plus Graph `driveItem.id` as the POC item key, waived separate IT confirmation for the read-only POC under existing SharePoint permissions, and kept production access approvals separate; ticket 5.4 POC verification completed.
