# Adversarial architecture review

**Target:** `ARCHITECTURE-SPINE.md` (current draft)\
**Verdict:** The conditional employee-record identity seam is closed as a cross-epic risk: AD-1 now forbids creating or importing employee-specific records until their approved identifier, record types, uniqueness, and duplicate/conflict handling are settled. This is an explicit stop condition, not a completed data-model decision. The other prior gaps remain constrained or explicitly gated; no remaining cross-epic incompatibility found in the reviewed ADs.

## Current gates and deferred decisions

1. **Employee-record identity and deduplication:** Closed by AD-1's conditional gate. If employee-specific records enter MVP, approve the employee identifier and record identity fields, record types, uniqueness, and duplicate/conflict behavior before either manual-entry or import implementation. Until then, neither path may create/import those records. This prevents parallel epics from independently inventing identities while leaving the actual policy decision open.

2. **Identity and role approvals:** AD-3 requires current server-side checks and fails closed; AD-10 blocks production processing of real employee-linked data until classification, access, retention, and regional approvals are recorded. The identity provider, employee key, and role matrix remain deferred. Do not enable employee-linked production data or admin actions until the identity match and role policy are approved and applied to all service paths.

3. **Per-user source authorization:** AD-7 requires source-owner approval and a tested per-user access path, and omits items/links if source authorization cannot be verified. SharePoint permissions and integration method remain open. Do not expose imported items or links to employees until the check is demonstrated for the approved source.

4. **Deletion and search recovery operations:** AD-4 prevents partial/failed-run absence from deleting last-good data and requires approved authoritative deletion signals per source. AD-6 requires stale marking and operational-owner notification after exhausted indexing retries. Source-specific deletion semantics, cadence, freshness/recovery targets, and operational ownership remain open. Do not enable source deletion before its rule is approved, or enter production without named ownership and alert/escalation targets.

## Status check

AD-1 through AD-7 are appropriately **PROPOSED** because source permissions, identity, field policy, deletion semantics, and operational targets still need approval or definition. AD-8 through AD-10 are **ADOPTED** consistently with the stated Python/React and accessibility approvals and the production employee-data gate. Deferred/open items represent genuine dependencies, with AD-1 providing the required stop condition for employee-record identity and deduplication.
