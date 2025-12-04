Welcome — here's the concise, repo-specific guidance for an AI coding assistant working on this project.

Summary (big picture)
- This is a Next.js app (app dir) configured to run on OpenNext / Cloudflare. Key packages are in package.json — Next 15.x + React 19.x are used.
- This repo includes fumadocs support (MDX-driven docs) via `fumadocs-mdx`, `fumadocs-core`, and an optional `fumadocs-ui` package. The docs content lives in `content/docs` and a generated `.source/` helper is used at runtime.

Key files & where to look first
- next.config.ts — MDX integration via `createMDX` from `fumadocs-mdx/next`.
- source.config.ts — defines the fumadocs collections (dir: `content/docs`).
- .source/ — auto-generated helpers (server/browser/dynamic) created by fumadocs pipeline. Treat this as generated code.
- src/lib/source.ts — a local loader wrapper that mounts `docs.toFumadocsSource()` onto baseUrl `/docs`.
- src/app/docs/* — example route and layout we added; serves `content/docs` MDX files. See `src/app/docs/page.tsx` and `src/app/docs/layout.tsx`.
- package.json scripts — dev, build, preview, deploy and a `cf-typegen` script for Cloudflare types.

Developer workflows & commands (explicit)
- Run locally (fast dev): pnpm dev
- Build for production: pnpm build (Next will generate MDX artifacts at build time) — watch the console for [MDX] generated files messages
- Preview Cloudflare target locally: pnpm preview
- Deploy to Cloudflare via opennext: pnpm deploy (runs opennextjs-cloudflare build && deploy)
- Type-gen for Cloudflare binding types: pnpm cf-typegen

Important project patterns & constraints
- App structure uses the Next.js "app" directory for routes (React server components + client components). Typical files: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/docs/*`.
- Fumadocs MDX flow:
  - Add content under `content/docs/*` as `.md` or `.mdx` files.
  - `source.config.ts` drives what gets collected. `.source/` is generated and referenced using tsconfig path mapping `fumadocs-mdx:collections/*` → `./.source/*`.
  - Server helpers live in `.source/server.ts`, browser helpers under `.source/browser.ts`, and `.source/dynamic.ts` for async/dynamic generation.
  - At runtime you may use `docs.toFumadocsSource()` and `fumadocs-core/loader` to mount docs at `/docs` (see `src/lib/source.ts`).

TypeScript & linting notes (what trips builds)
- tsconfig.json uses strict checks. There is a project-specific path mapping: `fumadocs-mdx:collections/*` → `./.source/*`. Keep it relative (leading `./`) — otherwise Next build fails.
- Add `.d.ts` for MDX imports (we added `src/types/mdx.d.ts`) so `.mdx` imports compile. Prefer `React.ComponentType<Record<string, unknown>>` to avoid `any` lint errors.
- The project uses ESLint via `next lint` and strict TypeScript; aim to satisfy both during edits.

Fumadocs UI compatibility caveat
- `fumadocs-ui` is installed, but some UI components expect React APIs (e.g., `useEffectEvent`) not provided by the currently pinned React 19.1.x. If you want the full UI (sidebar, search, layouts) enabled you should:
  1) Upgrade Next + React to versions compatible with `fumadocs-ui`'s peer deps, or
  2) Replace the docs route with a custom wrapper using `fumadocs-ui/provider/next` or compose UI pieces from `fumadocs-core` and `fumadocs-ui` selectively.

How to add docs quickly (example)
1. Create a file: content/docs/<area>/some-topic.mdx
2. Add frontmatter: title / description — MDX is processed by `fumadocs-mdx`.
3. Import or reference generated helpers if needed: `import { docs } from 'fumadocs-mdx:collections/server';` or `docs.toFumadocsSource()` in `src/lib/source.ts`.
4. The app route `/docs` will pick up and render MDX. If you need a UI wrapper, re-enable `fumadocs-ui/provider/next` once React/Next are compatible.

When editing or debugging docs flows
- Watch for MDX generation logs during `pnpm build` (the tool prints `[MDX] generated files`).
- If you change `source.config.ts` you may need to re-run builds or the dynamic generator to refresh `.source` artifacts.

Quick troubleshooting pointers
- Build errors referencing `useEffectEvent` or other missing React APIs → React/Next version mismatch; either pin compatible versions or avoid specific UI exports until upgraded.
- Type errors around path mapping or `.source/*` imports → ensure tsconfig uses `"./.source/*"` not `.source/*`.
- MDX import type errors → confirm `src/types/mdx.d.ts` exists and is typed to avoid ESLint `no-explicit-any`.

If you need me to (choose one):
- Enable full `fumadocs-ui` by upgrading Next/React and wiring the UI routes (I can perform dependency upgrades and fix resulting issues), or
- Keep docs as MDX static rendering and expand examples, tests, or CI flows for content (smaller, safer change).

Examples of files I used to generate these notes: `next.config.ts`, `source.config.ts`, `src/lib/source.ts`, `src/app/docs/*`, `content/docs/*`, `tsconfig.json` and `package.json`.

If anything above looks missing or there's a different workflow (CI, external services) you rely on, tell me and I'll update these instructions.
