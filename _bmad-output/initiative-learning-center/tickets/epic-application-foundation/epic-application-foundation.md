---
tracker_id: ""
type: epic
title: "Application foundation"
parent: "initiative-learning-center"
covers: ["RULE-1", "RULE-3", "RULE-6"]
sources:
  - _bmad-output/initiative-learning-center/initiative-learning-center.md
companions:
  - _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md
  - _bmad-output/initiative-learning-center/architecture-learning-center/shared-contracts.md
after: []
refined: true
risk: medium
---

# Application foundation

## Description

Establish a reproducible local baseline and shared identity, catalog, and source contracts so four engineers can build independently. The epic starts with four parallel tickets; CI and non-production deployment use later tickets after the organization confirms its delivery platform.

## Outcome

The four-person team can start on one local scaffold and three independently owned decisions without inventing incompatible identity, catalog, or source behavior.

## Requirements

- R1 (parent RULE-6): Four contributors can start and change the application from one reproducible local baseline without choosing incompatible API or runtime conventions.
- R2 (parent RULE-1, RULE-3): Manual and imported catalog work uses one canonical LearningItem schema that preserves approved provenance and field ownership.

## Constraints

- C1 (architecture AD-11, AD-14, AD-16): Use the selected framework versions, origin-relative API route, and locked dependency files.
- C2 (architecture AD-10, AD-13): Use only synthetic identity and data in local development.
- C3 (shared contract): The local authentication adapter must not be available in a production configuration.

## Done when

- A new contributor can start the React SPA, Django API, and PostgreSQL using the committed local instructions and lockfiles.
- One canonical LearningItem model and migration implement the catalog dictionary approved in ticket 5.3; manual entry and source import consume the same schema.
- The browser reaches the API through the agreed /api/v1 proxy and client routes load through the SPA fallback.
- Identity/access, catalog fields, and SharePoint discovery have approved results or explicit named owner gates; no unapproved product or source behavior is assumed.
- The repository owner approves the CI provider and Operations approves a non-production deployment target; the agreed delivery path is configured and manually verified.
- The integrated application foundation is deployed to the approved production target and verified before the initiative release is declared complete. Until the target and owner are approved, this epic cannot be marked done.

## Boundaries

- No employee-facing product interface, real identity-provider integration, real employee data, or SharePoint connection. The shared schema story creates persistence only.
- No production host or data region is selected by this epic; those remain organizational decisions.

## References

- parent — _bmad-output/initiative-learning-center/initiative-learning-center.md, Constraints RULE-1, RULE-3, and RULE-6
- architecture — _bmad-output/initiative-learning-center/architecture-learning-center/architecture-learning-center.md, AD-10 through AD-16
- contract — _bmad-output/initiative-learning-center/architecture-learning-center/shared-contracts.md, API, identity, and local development

## Notes

- Open question: repository owner and Operations must name the CI provider, approved non-production target, deployment owner, and required release checks before the delivery-path ticket starts.
- Decision: 2026-11-11 — Keep the local scaffold independent of organization identity, SharePoint access, and production hosting.
- Decision: 2026-11-11 — Story 5.7 owns the canonical LearningItem model and migration after the local scaffold and catalog dictionary are ready. Manual-entry story 2.2 and import story 3.2 consume that shared schema; employee-linked records remain in story 2.3 after spike 2.4.
