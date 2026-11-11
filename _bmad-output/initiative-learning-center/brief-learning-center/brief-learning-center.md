---
title: "Learning Center"
template: brief
version: 1.1.0
description: "Why to build a product, or pitching it, in a page or two."
status: draft
created: 2026-11-11
updated: 2026-11-11
---

# Learning Center

## Executive summary

Learning Center is a proposed internal application for employees in the United States and Costa Rica to find training and certification information in one place. The team wants the product to search information brought in automatically from other systems, including a possible SharePoint source, and information added manually by an authorized administrator.

The product is employee-first while also supporting HR or learning administrators who maintain information. The need is currently a team hypothesis: the project has not yet measured how employees search today, which systems hold the information, or how much time the current process costs.

## Problem

The team believes training and certification information is spread across multiple systems or locations, making it harder for employees to find. The proposed cost is time spent searching and uncertainty about which information is current. This problem has not yet been validated through employee or administrator interviews.

The SharePoint folder supplied so far is an example location only. Its contents and suitability as an integration source have not been confirmed.

## Solution

Create a single employee-facing place to search available training and certification information. Learning Center would combine information from approved connected sources with records entered manually by authorized administrators. Search results should preserve their source so people can check details in the system that supplied them.

The product is intended to make information easier to find; it is not yet established whether it will deliver courses, issue certificates, or replace any existing system.

## What makes it different

The proposed distinction is a unified, employee-first search experience across information that currently has multiple owners or locations, with an administration path for gaps that cannot be imported. No competitive advantage or market claim is established; this is an internal product concept.

## Who it serves

- Primary: employees in the United States and Costa Rica looking for training, certifications, or their own learning records.
- Secondary: HR or learning administrators who add, correct, and monitor learning information.

The specific employee groups, administrator roles, and visibility rules are not confirmed.

## Success criteria

The team should establish a baseline before setting numeric targets. Proposed measures:

- Time and success rate for an employee to find a relevant training item or personal certification.
- Percentage of in-scope records discoverable through Learning Center.
- Import freshness and successful synchronization rate for each connected source.
- Rate of duplicate, incomplete, or corrected records.
- Administrator effort to add or correct a record.

Search speed should be balanced against data accuracy and unauthorized disclosure; a fast result that is stale or visible to the wrong employee is not success.

## Scope

### Proposed first release

- Employee search across approved, centralized learning information.
- An administration flow for manually adding or correcting in-scope information.
- Automatic synchronization from one approved source, potentially the supplied SharePoint library, after its contents and permissions are verified.
- Clear source attribution and synchronization status.

### Proposed exclusions

- Delivering or hosting courses.
- Issuing certificates or changing the systems that certify completion.
- Replacing the source systems.
- Integrating every system in the company in the first release.
- Recommendations, skill-gap analytics, or automated career planning.

These boundaries are proposals to keep the first release testable; the team has not approved them.

## Vision

If the first release proves useful, Learning Center can become the trusted starting point employees use to discover learning opportunities and understand their own training records, while administrators manage a consistent and traceable view across approved sources.
