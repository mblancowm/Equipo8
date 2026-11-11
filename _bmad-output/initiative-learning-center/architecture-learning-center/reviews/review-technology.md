# Technology review — follow-up on the development baseline

Date: 2026-11-11

## Current verdict

**Pass for the planning baseline.** The prior review's version and reproducibility findings have been resolved in the architecture and scaffold ticket. The opening story still needs to install and verify its actual dependency lockfiles; no application package manifests exist yet.

## Selected baseline

| Area | Current decision |
| --- | --- |
| Backend | Python 3.14.10, Django 5.2.19 LTS, Django REST framework 3.18.3 |
| Storage | PostgreSQL 18.6 through local Compose |
| Frontend | Node.js 26.13.1 LTS, React 19.3.0, React Router 8.5.1 Framework Mode SPA, Vite 8.3.8 |
| Tooling | uv 0.13.2 with uv.lock; npm with package-lock.json |

## Resolved findings from the first review

- Vite was updated to 8.3.8, the official release dated 2026-11-11.
- Node.js 26.13.1 was selected as the current Active LTS release. The scaffold ticket pins it in `.nvmrc`; Python 3.14.10 is pinned in `.python-version`.
- uv 0.13.2 is selected and enforced with `tool.uv.required-version`.
- Vite binds to `127.0.0.1` by default; the scaffold ticket prohibits network exposure and checks direct refresh of a nested SPA route.

## Remaining verification

Ticket 5.1 must create the manifests and resolve actual package versions into committed lockfiles. A clean install, local database/API/SPA start, proxy, health route, and nested-route refresh must be checked manually before dependent implementation begins. This planning review did not run application tests or validate a running application.

## Primary sources checked

- [Django 5.2 release notes](https://docs.djangoproject.com/en/5.2/releases/5.2/) and [Django 5.2.19 security release](https://docs.djangoproject.com/en/6.1/releases/5.2.19/)
- [Django REST framework release notes](https://www.django-rest-framework.org/community/release-notes/)
- [React versions](https://react.dev/versions) and [React Router SPA mode](https://reactrouter.com/how-to/spa)
- [Node.js 26.13.1 release](https://nodejs.org/en/blog/release/v26.13.1) and [Node.js release schedule](https://github.com/nodejs/Release)
- [Vite 8.3.8 release](https://github.com/vitejs/vite/releases/tag/v8.3.8), [Vite Node requirements](https://vite.dev/guide/), and [Vite dev-server security advisory](https://github.com/vitejs/vite/security/advisories/GHSA-p4f5-76q4-ffq7)
- [uv 0.13.2 release](https://github.com/astral-sh/uv/releases/tag/0.13.2) and [uv required-version setting](https://docs.astral.sh/uv/reference/settings/#required-version)
- [PostgreSQL versioning policy](https://www.postgresql.org/support/versioning/) and [official PostgreSQL Docker image tags](https://hub.docker.com/_/postgres)
