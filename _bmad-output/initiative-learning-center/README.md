# Learning Center — BMad planning package

Status: draft for team review\
Created: 2026-11-11\
Method: BMad Method 7 artifact structure

## What is in this package

- Product brief: why the team proposes Learning Center.
- PRD: product outcomes, user journeys, requirements, risks, and open questions.
- UX contracts: DESIGN.md for visual direction and EXPERIENCE.md for behavior.
- Architecture spine: the approved Python backend and React frontend direction plus the cross-epic rules that keep the product consistent.
- Initiative ticket and four proposed epics with candidate story entries.
- User discovery notes: a traceable record of statements supplied so far.

## Confirmed by the user

- The product is called Learning Center.
- It is intended to bring employee training and certifications in the United States and Costa Rica into one place and make information easier to find.
- Employees are the primary audience; HR or learning administrators also need to use it.
- The product should automatically bring in information from other systems and allow people on the team to add information manually.
- A SharePoint folder is an example of a possible source. Its contents and integration permissions have not been verified.
- Python is the backend language direction and React is the frontend direction; specific frameworks and versions remain open.

## Draft assumptions

- The first version is an internal employee-facing application with a separate administration flow.
- The product will search both learning opportunities and employee-specific completion or certification records. The exact record types remain unconfirmed.
- A first integration will connect to one approved SharePoint library, if the library contains in-scope data and the organization authorizes access.
- Manual entries will be managed by an authorized learning administrator.
- Source links and provenance should be retained so employees and administrators can understand where a record came from.

## Not decided

The organization has not yet confirmed source systems, supported file formats, identity provider, employee identifier, field ownership, synchronization frequency, regional data rules, retention, English/Spanish localization, design system, Python/React frameworks and versions, database, hosting, numeric success targets, or launch date. The documents mark these as open questions rather than settled facts.

## BMad execution note

Sofia's renderer ran successfully with the system Python after `uv run --no-cache` could not reach PyPI for Jinja2. The initiative tree passed its Tree and Dependencies checks with no undeclared or conflicting dependencies. The identity/access spike (1.1) is refined and passed its Ticket check; the other 11 entries remain gated by dependencies or unresolved decisions.

The architecture spine records Python backend and React frontend as the approved language direction. Frameworks, versions, database, identity provider, hosting, CI, and deployment remain open. No implementation, legal assessment, source-system audit, user research, or production integration was performed. The SharePoint folder contents remain unverified.

## Recommended next step

Run the refined identity/access spike with the Product Owner, IT/Identity, HR/Learning, and Security/Privacy, then record the approved policy under architecture AD-3. Next, resolve the learning-record fields and verify the candidate SharePoint source before refining dependent stories. A BRD, business case, PRFAQ, and launch plan were not added because the available information does not establish a separate contracting party, funding decision, concept-validation study, or launch date.
