# Copilot Instructions — Lenco Marketing (Next.js + Fumadocs)

## Stack & Architecture
- **Next.js 16** (app router, Turbopack dev) with **Fumadocs** for MDX-powered docs
- **Cloudflare/OpenNext** deployment via `@opennextjs/cloudflare`
- MDX content lives in `content/docs/`; generated helpers in `.source/`

## Key Files
| Path | Purpose |
|------|---------|
| `next.config.mjs` | Wraps config with `createMDX()` for fumadocs-mdx virtual imports |
| `source.config.ts` | Defines MDX collections; set `mdxOptions.providerImportSource` here |
| `src/lib/source.ts` | Converts generated collections → fumadocs-core loader (`source.pageTree`, `getPage`) |
| `mdx-components.tsx` | Must export `getMDXComponents` **and** `useMDXComponents` |
| `src/app/docs/layout.tsx` | Wraps docs in `DocsLayout` with `source.pageTree` |
| `src/app/docs/[[...slug]]/page.tsx` | Dynamic docs page; uses `(page.data as any).body` for MDX |

## Commands
```bash
pnpm dev          # Turbopack dev server
pnpm build        # Production build
pnpm preview      # Local Cloudflare runtime preview
pnpm deploy       # Deploy to Cloudflare
pnpm cf-typegen   # Regenerate CloudflareEnv types
```

## Conventions & Gotchas
1. **Virtual imports**: `fumadocs-mdx:collections/*` resolves to `.source/*`. If you see "UnhandledSchemeError", ensure `createMDX()` is applied in `next.config.mjs`.
2. **Type casts**: fumadocs-core's `PageData` is minimal; MDX fields (`body`, `toc`) require `(page.data as any)` casts.
3. **Version alignment**: fumadocs-ui v16 needs React with `useEffectEvent` (canary). For stable React, use fumadocs v15.
4. **MDX provider**: If `providerImportSource` is set, `mdx-components.tsx` must export `useMDXComponents`.

## Adding Docs
1. Create `.mdx` in `content/docs/...`
2. Run `pnpm build` or `pnpm dev` — `.source/` regenerates automatically
3. Access via `source.getPage(slug)` and `source.pageTree`

## Common Patterns
```tsx
// Render MDX page
const page = source.getPage(params.slug);
const MDX = (page.data as any).body;
return <MDX components={getMDXComponents()} />;

// Docs layout
<DocsLayout tree={source.pageTree} {...baseOptions()}>{children}</DocsLayout>
```
