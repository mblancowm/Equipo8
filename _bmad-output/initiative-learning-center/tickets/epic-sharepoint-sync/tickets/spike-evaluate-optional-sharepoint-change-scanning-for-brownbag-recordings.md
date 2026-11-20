---
id: 6
type: spike
title: "Evaluate optional SharePoint change scanning for Brownbag recordings"
parent: epic-sharepoint-sync
covers: [R2, R4]
after: [2]
refined: false
hitl: true
risk: medium
---

# Evaluate optional SharePoint change scanning for Brownbag recordings

## Description

The pilot treats imported Brownbag recordings as append-only. If an existing file is changed, moved, renamed, or removed, a person handles that exception manually. The Product Owner wants an optional follow-up to assess whether a metadata scan can detect such changes safely and whether the automation is worth adding. This spike does not change or block the initial import in ticket 3.2.

## Approach

1. After ticket 3.2, ask the SharePoint owner and IT which source identifiers and change/removal signals are supported for this library and folder. Record evidence for rename, move, edit, delete, and incomplete scans; do not infer behavior from the presence of an ID, eTag, or timestamp.
2. Evaluate a safe scan design: full versus incremental scans, frequency, pagination/checkpoints, retry behavior, duplicate prevention, and how to distinguish a complete scan from a partial or failed scan.
3. Define how an observed change would interact with the canonical record and existing SharePoint ACLs. A partial scan must never mark unseen items as withdrawn or replace last-good data. Keep manual exception handling as the fallback.
4. Ask the Product Owner, SharePoint owner, and IT to choose whether to defer automated scanning or proceed. If approved, update/refine implementation ticket 3.3 or create a separate implementation ticket with the verified signals and permission requirements.

Timebox: The Product Owner will set it when this optional spike is started; no estimate is recorded.

## Acceptance Criteria

1. **Change and withdrawal signals are evidenced**
   Verify: The source map names the exact supported SharePoint identifiers and signals for edits, renames, moves, and removals, or records which are unavailable. The evidence comes from the SharePoint owner or IT; observed ID/eTag fields alone do not establish lifecycle behavior.
2. **The scan design handles incomplete results safely**
   Verify: The proposed design defines scan scope/frequency, pagination and checkpoints, retries, duplicate prevention, and how partial or failed scans are distinguished from complete scans. It never withdraws unseen items based on an incomplete scan and preserves last-good data.
3. **The Product Owner records a defer or proceed decision**
   Verify: The Product Owner and relevant source/IT owners decide to keep manual exception handling or approve a follow-on implementation ticket. Any implementation ticket documents least-privilege access and enforcement of existing SharePoint ACLs.
4. **The initial import stays independent**
   Verify: Ticket 3.2 remains append-only and does not wait for this spike. Ticket 3.6 is optional and occurs after the initial import.

## References

- parent — _bmad-output/initiative-learning-center/tickets/epic-sharepoint-sync/epic-sharepoint-sync.md, Requirements R2/R4 and append-only import constraints
- initial import — _bmad-output/initiative-learning-center/tickets/epic-sharepoint-sync/tickets/tickets.toml, entry 2 (ticket 3.2)
- update implementation — _bmad-output/initiative-learning-center/tickets/epic-sharepoint-sync/tickets/tickets.toml, entry 3 (ticket 3.3)
- lifecycle contract — _bmad-output/initiative-learning-center/architecture-learning-center/shared-contracts.md, Source synchronization lifecycle
- source map — _bmad-output/initiative-learning-center/architecture-learning-center/sharepoint-source-map.md, Lifecycle and synchronization behavior
- source verification — _bmad-output/initiative-learning-center/tickets/epic-application-foundation/tickets/spike-verify-the-candidate-sharepoint-source.md, Acceptance Criterion 4

## Notes

- Decision: 2026-11-20 — The Product Owner approved an append-only pilot with manual exception handling. An automatic scan is an optional future improvement and does not block ticket 3.2.
- Risk rationale: Medium because an incorrect removal signal or incomplete scan could hide a valid learning item; the spike defines safeguards before any implementation.
- Beyond-criteria check: IT and Security confirm the optional scanner can honor existing SharePoint ACLs without broadening access before implementation begins.
- Open question: The Product Owner and source owner decide whether automation is valuable after observing the pilot.
