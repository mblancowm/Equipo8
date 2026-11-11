# Learning Center — BMad planning package

Status: draft for team review\
Created: 2026-11-11\
Method: BMad Method 7 artifact structure

## What is in this package

- Product brief: why the team proposes Learning Center.
- PRD: product outcomes, user journeys, requirements, risks, and open questions.
- UX contracts: DESIGN.md for visual direction and EXPERIENCE.md for behavior.
- Architecture spine: technology-neutral rules that should stay consistent across epics.
- Initiative ticket and four proposed epics with candidate story entries.
- User discovery notes: a traceable record of statements supplied so far.

## Confirmed by the user

- The product is called Learning Center.
- It is intended to bring employee training and certifications in the United States and Costa Rica into one place and make information easier to find.
- Employees are the primary audience; HR or learning administrators also need to use it.
- The product should automatically bring in information from other systems and allow people on the team to add information manually.
- A SharePoint folder is an example of a possible source. Its contents and integration permissions have not been verified.

## Draft assumptions

- The first version is an internal employee-facing application with a separate administration flow.
- The product will search both learning opportunities and employee-specific completion or certification records. The exact record types remain unconfirmed.
- A first integration will connect to one approved SharePoint library, if the library contains in-scope data and the organization authorizes access.
- Manual entries will be managed by an authorized learning administrator.
- Source links and provenance should be retained so employees and administrators can understand where a record came from.

## Not decided

The organization has not yet confirmed source systems, supported file formats, identity provider, employee identifier, field ownership, synchronization frequency, regional data rules, retention, language requirements, design system, hosting, stack, numeric success targets, or launch date. The documents mark these as open questions rather than settled facts.

## BMad execution note

The installed Sofia ticket workflow could not render because uv could not reach PyPI to download jinja2 (DNS failure). These files are therefore a BMad-structured draft, not a result validated by Sofia's ticket checks. Canonical memlogs were not generated because the workflow did not complete and its memlog scripts were not run. Candidate stories are intentionally marked for refinement and must not be treated as ready-to-build tickets.

No implementation, legal assessment, source-system audit, user research, or production integration was performed. The SharePoint connector search in this session did not verify the contents of the supplied folder.

## Recommended next step

Have the Product Owner settle the open questions that block identity, source access, and record definitions. Then run Sofia's refinement and validation workflow before starting implementation. A BRD, business case, PRFAQ, and launch plan were not added because the available information does not establish a separate contracting party, funding decision, concept-validation study, or launch date.
