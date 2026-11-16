# Architecture rubric review — 2026-11-16

## Verdict

**Needs alignment fixes before the architecture can serve as a reliable build contract.** The spine identifies the major cross-epic boundaries and adopts the requested company stack coherently. The highest risk is the planning tree: the scaffold and canonical-model ticket inputs still require the superseded stack, and the application-foundation epic still requires production deployment while architecture and governance leave production hosting and access gated. The new spine itself should also restore the explicit production-access gate and finish exact version pinning before it is treated as final.

## Critical and high findings

### High — Ready tickets still encode the replaced stack

`tickets/epic-application-foundation/tickets/story-create-the-local-application-scaffold.md` still instructs contributors to create Django/DRF, a React Router SPA, PostgreSQL 18.6, Python/uv and Node/npm lockfiles. The matching first entry in `tickets/epic-application-foundation/tickets/tickets.toml` repeats that setup and its PostgreSQL/Vite-proxy verification. The canonical LearningItem entry (ID 7, referenced as 5.7) in the same TOML still requires a Django model. These conflict with AD-11 and `shared-contracts.md`, while the epic narrative has already been changed to Bun/Hono, Vike, SQLite, Drizzle, and Zod.

**Recommendation:** Have the Product Owner re-refine the scaffold and canonical-model tickets against the new spine, preserving the useful acceptance criteria (clean install, synthetic data, no credentials/provider/source access, health/API/UI check, nested-route refresh, and one shared model). Update both story files and TOML entries before either ticket is selected as ready.

### High — Production deployment is still a completion requirement

The spine defers the production target and operations envelope (AD-11, AD-14, AD-16; Deferred), but `epic-application-foundation.md` says the integrated application must be deployed to an approved **production** target before the initiative release can be declared complete (Done when). Its boundary also says no production host or data region is selected. The initiative and repository policy additionally gate production access on recorded organizational approvals. These statements cannot all be used as acceptance criteria at once.

**Recommendation:** Reconcile the epic’s done-when with the deferred deployment and governance decisions. Treat the approved non-production preview as the foundation delivery gate; make production rollout a later gate that can only begin after the owners have recorded the required approvals. Do not let the current epic wording imply approval to enable production access.

### High — The production access gate is narrower than the binding repository policy

AD-10 blocks processing real employee-linked data in production until data classification, access, retention, and regional handling are approved. The supplied `AGENTS.md` policy also says **not to enable production access** until identity and those approvals are recorded. AD-10 does not state that gate, and its scope is only real employee-linked data; this leaves room to read the spine as permitting production access with synthetic or catalog-only data before identity/access approval.

**Recommendation:** Carry the repository policy into AD-10 in explicit terms: no production access or real employee-data connection until identity, access, classification, retention, and regional approvals are recorded. Keep synthetic local fixtures and the approved non-production boundary explicit.

## Other findings

### Medium — Exact compatible package/runtime versions remain unbound

The Stack table only says versions will be pinned by ticket 5.1, while the Version Evidence section provides evidence samples rather than a compatible set pinned in the spine. The configured BMad lint gate lists unpinned Stack versions as a mechanical miss. This is also not currently actionable in ticket 5.1 because that story still pins the replaced Python, Node, and PostgreSQL baseline. During this review, the official Hono release page showed v4.13.19 released on 2026-11-16, while the spine calls v4.13.18 latest on that date ([Hono releases](https://github.com/honojs/hono/releases)).

**Recommendation:** Resolve and record a compatible stable version set and runtime/package-manager policy in the spine or its owned scaffold ticket, then ensure the version evidence reflects the check date. The core choice of Bun/Hono, React/Vike, Tailwind, Drizzle/SQLite, and Zod fits the company baseline; exact integration compatibility should be confirmed together in the scaffold lockfiles.

### Medium — `employee_key` is pre-shaped before the identity decision

`shared-contracts.md` declares a request-principal field named `employee_key` and a `subject_id` claim shape, even though ticket 5.2 and the deferred section leave the identity provider and employee identifier to IT/Identity and HR. The text says the key is organization-approved and nullable, which helps, but a future implementer may still treat these names and types as a settled shared contract. The repository instruction says not to invent an employee key.

**Recommendation:** Mark the fields as illustrative placeholders that cannot be implemented until ticket 5.2 approves the provider mapping, or keep the cross-layer contract abstract until that decision is recorded. Do not encode an employee key into Zod or persistence solely from this companion.

### Medium — FTS5 is a justified but unverified local search dependency

AD-6 and the shared locale/search contract select FTS5 and `unicode61` for local matching. The docs correctly acknowledge tokenization limits and now require ticket 5.1 to verify availability on supported Bun/SQLite builds. The cited Bun docs establish a native SQLite driver and show virtual-table/FTS references, but the scaffold still needs a direct capability check on the team’s supported systems before search implementation is committed.

**Recommendation:** Keep the dependency conditional on an executable scaffold smoke check that creates and queries an FTS5 table on each supported development platform; record the fallback/decision path if it fails. The PO review of bilingual search acceptance examples is also a useful implementation prerequisite, not an architectural blocker.

### Low — API convention rows are duplicated

The Consistency Conventions table repeats API routing in two rows (lines 167 and 175). The same contract also appears in AD-14 and the companion. This does not create a material architectural divergence but adds maintenance cost.

**Recommendation:** Consolidate the two API rows when polishing the spine.

### Low — Final status and proposal labels need a quick consistency check

The spine frontmatter says `status: final`, while several structural decisions remain tagged `[PROPOSED]` (AD-1 through AD-7), and the team has explicitly selected only the technology baseline. These may be intentional because source/identity details are gated; however, “final” could be read as user approval of all proposed domain rules.

**Recommendation:** Confirm whether `final` means the architecture authoring pass is complete or all rules are adopted. If the latter, retain `[PROPOSED]` only for decisions awaiting business/owner approval and make that distinction clear in the status convention or handoff note.

## Rubric coverage

- **Divergence points:** Strong coverage of stack boundaries, API contracts, authorization, provenance, import retries, locale, and search. The employee-identity contract remains slightly over-specified ahead of its decision ticket.
- **Enforceability:** Most rules are operational and testable. AD-3’s per-action and per-search-hit authorization rule and AD-4’s partial-run behavior are particularly clear. AD-10 needs the explicit production-access gate; AD-6 should make the FTS5 capability check a release criterion.
- **Decision/deferred coverage at initiative altitude:** The production database, identity provider, data owners, hosting, region, delivery provider, and operational targets are named as deferred decisions with owners or timing. Their deferral is appropriate, but it conflicts with the epic’s current production-deployment completion criterion.
- **Operational/environmental envelope:** The spine does not silently skip it. Hosting, deployment/rollback, backups, monitoring, alerting, incident response, operations owner, and recovery/performance targets are explicitly deferred. The non-production preview is separately scoped.
- **Preserved constraints:** Synthetic local data, server-side authorization, no unapproved identity/source assumptions, and employee-record field approval are preserved. The production access gate needs to be copied verbatim in scope from repository policy.
- **Technology fit:** The requested company stack is represented in the right package boundaries and matches the Vike SPA direction in `EXPERIENCE.md`. Drizzle documents a Bun SQLite driver, and SQLite documents FTS5 tokenizer behavior. Exact inter-version compatibility and FTS5 availability remain scaffold checks. Hono’s “latest” evidence is one patch behind the release available on the review date.
- **Ticket compatibility:** Not currently satisfied. The epic overview has changed, but story 5.1 and the story 5.7 TOML entry still bind the retired framework/database/toolchain. They need PO reconciliation before the epic’s implementation tickets are consistent with this spine.
- **Other initiative inputs:** The PRD now records the company stack and leaves production database/hosting open. The brief keeps sources and approvals unconfirmed. The experience contract requires a responsive React SPA with bilingual search, which the Vike SPA assumption can support.

## Reviewed inputs

- `architecture-learning-center/architecture-learning-center.md`
- `architecture-learning-center/shared-contracts.md`
- `initiative-learning-center.md`
- `prd-learning-center/prd-learning-center.md`
- `brief-learning-center/brief-learning-center.md`
- `ux-learning-center/EXPERIENCE.md`
- `tickets/epic-application-foundation/epic-application-foundation.md`
- `tickets/epic-application-foundation/tickets/story-create-the-local-application-scaffold.md`
- `tickets/epic-application-foundation/tickets/tickets.toml`
- Repository-provided `AGENTS.md` instructions
