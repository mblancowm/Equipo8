# Technology and version-fit review — 2026-11-16

## Verdict

**Approve with minor follow-up.** The selected stack is technically coherent for the stated local-development baseline. Official documentation supports Bun with Hono and SQLite, Drizzle's Bun SQLite driver and migrations, Vike's React integration and SPA mode, Tailwind's Vite integration, and shared Zod runtime validation. I found one stale version claim and one consistency improvement for scaffold work.

## Findings

### Medium — Hono release evidence is already stale

`architecture-learning-center.md:249` calls Hono `4.13.18` the latest stable release as of 2026-11-16. The official Hono release workflow lists `4.13.19` released on November 16, 2026, after `4.13.18` on November 11. Update this evidence to `4.13.19` or avoid describing a patch as current. This does not require changing the version policy: the exact compatible package set remains for ticket 5.1 to lock and validate together.

Source: [Hono release workflow](https://github.com/honojs/hono/actions/workflows/release.yml).

### Low — Apply TypeScript strictness to shared/API packages too

The web requirement is correctly explicit (`apps/web` uses TypeScript `strict`), and Zod's TypeScript inference is a sound fit for runtime schemas shared by browser and API. But AD-8 assumes TypeScript for API and contracts while AD-16 only guarantees `apps/web` is strict. Consider making `strict: true` a shared TypeScript baseline for `apps/api` and `packages/contracts` as well; otherwise the shared schema/type boundary can weaken even though the frontend remains strict. This is a consistency improvement, not a blocker for the chosen stack.

Source: [Zod documentation](https://zod.dev/).

## Compatibility checks that pass

- Hono documents Bun as a supported runtime and provides a Bun starter; Bun documents TypeScript execution and `bun:sqlite`. Sources: [Hono on Bun](https://hono.dev/docs/getting-started/bun), [Bun TypeScript](https://bun.com/docs/runtime/typescript), [Bun SQLite](https://bun.com/docs/runtime/sqlite).
- Drizzle's official Bun SQLite guide shows the `drizzle-orm/bun-sqlite` driver and generated/applied SQL migrations. Its standard ORM schema does not model FTS5 virtual tables, so keeping those statements in SQL migrations/queries inside `apps/api/src/db` is a reasonable boundary. Sources: [Drizzle Bun SQLite](https://orm.drizzle.team/docs/get-started/bun-sqlite-new), [Drizzle SQLite extensions](https://orm.drizzle.team/docs/sqlite/extensions).
- The FTS5 decision is technically compatible with SQLite and its `unicode61` tokenizer documentation supports the described case/diacritic and English-Porter behavior. Bun notes that SQLite builds/options vary, so ticket 5.1's explicit requirement in AD-6 to verify FTS5 on supported systems is an appropriate scaffold gate. Sources: [Bun SQLite runtime notes](https://bun.com/docs/runtime/sqlite), [SQLite FTS5](https://www.sqlite.org/fts5.html).
- Vike documents `vike-react` as its React integration and exposes `ssr: false`; its docs describe SPA rendering. The selected SPA mode is supported, though it is an assumption rather than a default: ticket 5.1 should set and smoke-check it, including the nested-route refresh already required by shared-contracts. Sources: [Vike React integration](https://vike.dev/vike-react), [Vike SPA](https://vike.dev/spa), [Vike prerendering](https://vike.dev/pre-rendering).
- Tailwind's official Vite plugin is a coherent integration with Vike, which uses Vite. Sources: [Tailwind with Vite](https://tailwindcss.com/docs/installation/using-vite), [Vike integration](https://vike.dev/integration).
- Shared Zod schemas can provide runtime parsing plus inferred TypeScript types; placing them in `packages/contracts` and consuming them in browser and API is compatible with the stated architecture. Source: [Zod](https://zod.dev/).
- The named release evidence for Bun `1.4.4`, React `19.3.0`, `vike-react` `0.6.32`, Tailwind `4.3.5`, and Zod `4.6.7` is consistent with official release/version information checked on 2026-11-16. Sources: [Bun releases](https://github.com/oven-sh/bun/releases), [React versions](https://react.dev/versions), [vike-react changelog](https://github.com/vikejs/vike-react/blob/main/packages/vike-react/CHANGELOG.md), [Tailwind releases](https://github.com/tailwindlabs/tailwindcss/releases), [Zod package metadata](https://github.com/colinhacks/zod/blob/main/packages/zod/package.json).

## Scope

This review checked technology fit and named versions in the architecture spine and shared contracts. It did not review application behavior, ticket consistency, security policy, or implementation tests.
