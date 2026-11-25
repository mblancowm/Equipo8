# Ticket 5.2 — Employee identity and access

## Status

**Ready for organizational decision review; not approved for production.** This spike records a concrete proposal and the remaining decisions. No provider, employee identifier, role grant, data approval, or revocation limit is represented as approved.

## Source Materials

- Ticket 5.2 and its plan under `_bmad-output/initiative-learning-center/tickets/epic-application-foundation/tickets/`.
- Architecture AD-3 and AD-10; identity boundary in `architecture-learning-center/shared-contracts.md`.
- Access epic and ticket dependency tree.
- Current API scaffold: `apps/api/src/index.ts` exposes health only; no authentication or employee authorization implementation exists.
- [OpenID Connect Core 1.0, claim stability and uniqueness](https://openid.net/specs/openid-connect-core-1_0.html#ClaimStability); [RFC 9700, access-token privilege restriction](https://www.rfc-editor.org/rfc/rfc9700.html#section-2.3). These standards inform the proposal; they do not establish which provider the organization uses.

## Goal / Intent Alignment

Give all four developers one safe identity and access contract before personal records or admin actions are built. Keep employee data out of production until the organization approves identity, access, classification, retention, and regional handling.

## Current State

- The scaffold had no sign-in. It now has a local-only synthetic username/password demo login; it still has no corporate authentication, employee identity model, role model, or employee-record endpoints.
- Shared contracts explicitly prohibit choosing an employee key or using email as that key before owner approval.
- AD-3 already requires server-side checks for every employee-specific action and fail-closed behavior. AD-10 blocks production employee data pending organizational approval.
- Ticket 5.2 directly gates 1.2 (access enforcement) and 2.4 (employee-record fields/linkage). Stories 2.2, 2.3, 3.2, 4.1, and 4.3 must follow the approved contracts through their declared dependencies.
- The repository and checked team context do not name a provider, employee key, permission matrix, retention period, region decision, or revocation SLA.

## Constraints / Open Questions

| Decision | Owner | Proposal to decide | Work held until recorded |
| --- | --- | --- | --- |
| Corporate sign-in provider/protocol and stable provider subject | IT/Identity | Reuse the existing managed SSO. Prefer its supported standard; use OIDC only if that is the approved service. Never create production app passwords. | Production login and principal implementation |
| Authoritative employee key and US/CR matching | IT/Identity with HR/Learning | Map the provider subject to an approved, immutable employee-directory key. Define missing, duplicate, conflicting, and cross-country matches; all unresolved matches deny access. Do not use email. | Employee linkage and personal records (2.4, then 2.3) |
| Employee and learning-administrator permissions | HR/Learning and Product Owner; Security/Privacy reviews | Employee sees approved catalog and only their own approved record types. Admin gets only explicitly approved record actions and scope; no general HR access. Operations sees health/status only. | Access enforcement (1.2), admin actions, personal-record features |
| Classification, retention, audit, regional handling | Security/Privacy and each data owner | Record the approved values and handling locations for each employee-linked record type and log. | Any production employee data; AD-10 |
| Account and role revocation delay | IT/Identity and Security/Privacy | Prefer immediate invalidation on disable/revocation events and current-policy checks per request. Proposed maximum stale-access window: five minutes or less, for owners to approve or replace. | Production sessions and authorization cache policy |

The repository identifies accountable owner roles, but not the individual approvers. The Product Owner should arrange one review with these roles and add the people who make each decision.

## Options Considered

1. **Organization-managed SSO (recommended).** Reuse the current corporate provider. Store its stable provider subject separately from the approved employee-directory key. OIDC defines `(iss, sub)` as the stable identifier pair within an issuer; a corporate SAML or other standard may provide the equivalent if that is what IT operates. This avoids creating another password store. Unknown: the actual provider/protocol and approved mapping source. Effort: medium after IT provides configuration and claims.
2. **Application-managed production accounts.** Rejected. It duplicates password lifecycle and identity administration, does not establish authoritative US/CR employee matching, and conflicts with the repository policy not to invent production identity. Effort: high and creates unresolved security/operations work.
3. **Keep synthetic-only access until approvals arrive.** Required interim state, but not a production solution. Developers may build non-employee catalog work using synthetic fixtures; do not wire real identities or employee records. Effort: low now; it keeps 1.2 and 2.4 waiting.

## Recommendation

Adopt option 1 as the target direction, conditional on IT/Identity confirming the organization’s existing provider and protocol. The API should authenticate that provider, establish a provider principal from its stable non-email subject, then resolve an approved authoritative employee mapping before applying roles. Do not add an employee key to contracts until HR and IT approve it.

Use the proposed access floor in AD-3 as the starting role matrix. Missing/ambiguous identity, cross-country conflicts, unknown roles, or unavailable policy checks deny access. Employees never see another employee’s record. Admin rights remain disabled until each action and scope is approved. Do not return hidden-record existence through counts, search results, snippets, or error differences.

Ask IT/Identity and Security/Privacy to approve or replace the five-minute revocation target. The target is only a discussion proposal; it must not be configured as production policy without approval. Keep synthetic-only local development and production-data gate AD-10 in force.

## Planning Handoff

- **Next skill:** `bmad-architecture` after owner decisions, to accept or revise AD-3; then `bmad-build` for ticket 1.2. Resume 2.4 only after HR/IT confirm record linkage and fields.
- **Assumptions to preserve:** API is the authorization boundary; identity subject and employee key remain separate; email is not a canonical key; no broad HR permissions; unresolved identity fails closed; production access remains off until AD-10 approvals.
- **Inspect first:** `shared-contracts.md`, AD-3/AD-10, `apps/api/src/index.ts`, `packages/contracts/src/v1/index.ts`, and the stories 1.2/2.4.
- **Validation concerns:** test synthetic cases for own-record allow, cross-employee deny, missing/duplicate/conflicting US/CR mapping deny, unknown role deny, disabled account/revoked role timing, and no hidden-record leakage through count/search/snippet. Do not connect production identity or real employee data before approvals.
- **Decision handoff:** IT/Identity, HR/Learning, Product Owner, Security/Privacy, and data owners record each choice, accountable person, date, and evidence in AD-3. Directly waiting tickets 1.2 and 2.4 resume only when their needed decisions are approved; later dependent tickets inherit those gates.

## Local demo login implemented separately

The user chose a simple username/password login for local development. The implementation uses a synthetic account configured in the ignored local .env file; it does not establish the corporate provider, employee key, or role policy. Ticket 5.2 remains blocked on those organizational decisions. The local route is explicitly enabled, unavailable in production, loopback-only, and backed by short-lived in-memory sessions.
