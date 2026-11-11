---
title: "Learning Center — Experience Contract"
status: draft
created: 2026-11-11
updated: 2026-11-11
---

# Foundation

- Form factor: open question. Planning assumes a browser-accessible internal application; this is not a platform decision.
- Visual identity: see DESIGN.md.
- User roles: employee and learning administrator are confirmed audience categories; exact permissions are open.
- Language: English, Spanish, or both is open.

# Information Architecture

1. Employee home and unified search.
2. Search results with type, source, status, and relevant metadata.
3. Learning item or certification detail.
4. My learning records, if personal history is confirmed in MVP.
5. Administration area for manual entry, corrections, and source status.

Navigation labels and whether these areas are tabs, routes, or pages remain platform decisions.

# Voice and Tone

Use plain, neutral language. State what is known, where it came from, and when it was last updated. Explain errors in terms of the next useful action. Avoid implying completion, validity, or eligibility when the source does not establish it.

# Component Patterns

- Search field: accepts a natural title or subject query; preserve the query when filters change.
- Result row/card: shows title, item type, provider or source when available, status when available, and an authorized detail link.
- Filter control: only offers values present in the result set or agreed taxonomy; selected filters remain visible and removable.
- Source badge: distinguishes manually entered and imported records; includes text, not color alone.
- Sync status: displays last successful time and a human-readable failure state to administrators.
- Admin form: identifies required fields, validates before save, and confirms whether a change was saved.

# State Patterns

- Loading: show that the search or page is working without suggesting there are no results.
- Empty query: explain how to begin searching.
- No results: show the query and available next steps; do not claim no training exists globally.
- Partial or stale source: disclose that the source is delayed or incomplete when this affects results.
- Permission denied: do not reveal the hidden record's title or existence.
- Save failure: preserve entered values when safe and show whether the record was saved.
- Sync failure: retain the last good imported state and show the latest failure to administrators.
- Duplicate warning: identify the likely matching record without silently merging it.

# Interaction Primitives

- Keyboard access to search, filters, result links, forms, and dialogs.
- Visible focus and clear labels for assistive technology.
- Announce result counts and validation feedback to assistive technology.
- Confirm destructive archive or delete actions and state their effect.
- Provide a clear way to reset filters and return to the unfiltered result set.

# Accessibility Floor

The selected UI system must support keyboard navigation, semantic labels, visible focus, screen-reader announcements for result and error changes, and status cues that do not depend on color. The organization must confirm its formal accessibility target before release.

# Key Flows

## Employee searches

An employee opens Learning Center, enters a query, narrows results, and opens a result. The result identifies its type and source. If it is a personal record, the employee sees it only after identity and access checks succeed.

## Administrator adds information

An administrator opens the management area, enters the approved fields, sees validation errors next to the relevant inputs, saves, and receives confirmation. The saved record is marked as manually entered and includes an attributable update time.

## Administrator checks synchronization

An administrator selects a configured source, sees last successful sync and current status, opens an error summary when present, and retries only when the source workflow allows it. The employee view continues to use the last good state while a source is unavailable.

# Open UX Questions

- Confirm browser, mobile, or other platform scope.
- Confirm English and Spanish requirements.
- Confirm whether personal records and an employee profile are in the MVP.
- Confirm exact fields and permitted actions for each role.
- Identify the existing design system and accessibility target.
