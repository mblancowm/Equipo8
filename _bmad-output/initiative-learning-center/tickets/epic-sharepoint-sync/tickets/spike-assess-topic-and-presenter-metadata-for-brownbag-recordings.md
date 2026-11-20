---
id: 5
type: spike
title: "Assess topic and presenter metadata for Brownbag recordings"
parent: epic-sharepoint-sync
covers: [R1]
after: [2]
assignee: ""
refined: true
hitl: true
risk: medium
---

# Assess topic and presenter metadata for Brownbag recordings

## Description

The initial SharePoint import in ticket 3.2 proceeds with the metadata approved for the first catalog. The Product Owner wants to evaluate `Topic` and `Presenter` as a later enhancement. This spike determines whether those fields can be sourced reliably and safely after the initial import; it does not block or change ticket 3.2.

## Approach

1. After ticket 3.2, review available SharePoint metadata and its completeness for `Topic` and `Presenter`. Use exact metadata fields or owner-provided metadata; do not infer values from recording content or file names.
2. With the Product Owner and HR/Learning, define each proposed field's meaning, type, requiredness, validation, owner/write path, language, searchability, visibility, and evidence. Ask Security/Privacy to review whether `Presenter` identifies an employee and what visibility applies.
3. Record whether each field has a reliable, permitted source. If a field is unavailable or unapproved, mark it deferred; any content extraction or new access method requires a separate approved ticket.
4. Record the Product Owner's decision in the data dictionary and source map. If a field is approved, create a separate implementation ticket for schema/import changes without changing the scope of ticket 3.2.

Timebox: Open question for the Product Owner to set when this future spike is started; no estimate is recorded.

## Acceptance Criteria

1. **The source and completeness of each proposed field are known**
   Verify: The data dictionary or source map names the exact metadata field and its observed coverage, or records that no reliable source was found. Values are not inferred from video content or filenames.
2. **Each candidate field has an agreed contract**
   Verify: For any field considered for inclusion, the data dictionary records its meaning, type, requiredness, validation, authoritative owner/write path, language, searchability, visibility, classification, and evidence. Unsettled decisions are named with their owner and required evidence.
3. **The Product Owner's decision is recorded**
   Verify: The Product Owner and HR/Learning explicitly choose to add or defer `Topic` and `Presenter`; if approved, a separate implementation ticket names the schema and import work.
4. **The first import remains independent**
   Verify: Ticket 3.2 retains its current approved scope and does not wait on this spike. No recording content is opened, transcribed, copied, or imported as part of this spike.

## References

- parent — _bmad-output/initiative-learning-center/tickets/epic-sharepoint-sync/epic-sharepoint-sync.md, Requirements R1 and Constraints C1/C3/C4
- source map — _bmad-output/initiative-learning-center/architecture-learning-center/sharepoint-source-map.md, Read-only folder and metadata inspection; Open decision gates
- catalog fields — _bmad-output/initiative-learning-center/tickets/epic-application-foundation/tickets/spike-agree-learning-item-fields.md, Acceptance Criteria
- dictionary — _bmad-output/initiative-learning-center/architecture-learning-center/data-dictionary.md, Learning catalog fields
- contract — _bmad-output/initiative-learning-center/architecture-learning-center/shared-contracts.md, Record and field ownership
- initial import — _bmad-output/initiative-learning-center/tickets/epic-sharepoint-sync/tickets/tickets.toml, entry 2 (ticket 3.2)

## Notes

- Decision: 2026-11-20 — The currently available metadata is sufficient for the initial catalog; `Topic` and `Presenter` are optional future enhancements and do not block ticket 3.2.
- Decision: 2026-11-20 — The Product Owner approved this ticket's scope and acceptance criteria; the ticket is refined.
- Risk rationale: Medium because an incorrect `Presenter` field could expose personal information, while this spike only evaluates availability and ownership.
- Beyond-criteria check: Security/Privacy confirms whether proposed presenter values are employee-linked and whether their visibility is permitted before a follow-on implementation ticket starts.
- Open question: The Product Owner will set the timebox when this future spike is pulled.
