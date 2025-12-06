# Copilot Instructions for Lenco Marketing Next.js Project

This document provides guidance for AI coding agents working with this codebase.

## Project Overview

This is a **Next.js 15** documentation and marketing site for Lenco, using:
- **Fumadocs** (v15) for documentation system
- **Cloudflare Workers** deployment via `@opennextjs/cloudflare`
- **Tailwind CSS 4** for styling
- **shadcn/ui** for UI components
- **TypeScript** for type safety
- **pnpm** as the package manager

## Architecture

### Directory Structure

```
├── content/docs/           # MDX documentation files
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── docs/           # Documentation routes
│   │   │   ├── [[...slug]]/ # Dynamic docs pages
│   │   │   └── layout.tsx  # DocsLayout wrapper
│   │   ├── layout.tsx      # Root layout with RootProvider
│   │   ├── layout.config.tsx # Base layout options
│   │   └── globals.css     # Global styles + Tailwind
│   ├── components/ui/      # shadcn/ui components
│   ├── lib/
│   │   ├── source.ts       # Fumadocs source configuration
│   │   └── utils.ts        # Utility functions (cn helper)
│   └── types/              # TypeScript type definitions
├── .source/                # Generated fumadocs-mdx output (gitignored)
├── source.config.ts        # Fumadocs MDX collection config
├── mdx-components.tsx      # MDX component mappings
├── wrangler.jsonc          # Cloudflare Workers config
└── open-next.config.ts     # OpenNext Cloudflare config
```

## Key Patterns & Conventions

### 1. Fumadocs Documentation

#### Source Configuration
- MDX docs are defined in `source.config.ts` using `defineDocs()`
- The source loader is configured in `src/lib/source.ts`
- Generated content is output to `.source/` directory

```typescript
// source.config.ts pattern
import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

export const docs = defineDocs({
  dir: 'content/docs',
});

export default defineConfig();
```

```typescript
// src/lib/source.ts pattern
import { docs } from "@/.source/server";
import { loader } from "fumadocs-core/source";

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});
```

#### Creating New Documentation Pages
1. Add `.mdx` files to `content/docs/`
2. Include frontmatter with `title` and `description`
3. The page tree is automatically generated

Example MDX frontmatter:
```mdx
---
title: Page Title
description: Brief description for SEO and page header
---
```

### 2. Cloudflare Workers Compatibility

**IMPORTANT**: This project is deployed to Cloudflare Workers, which has specific constraints:

- Use `export const dynamic = "force-dynamic"` for pages that need dynamic rendering
- Avoid Node.js-specific APIs not available in Workers runtime
- Use `wrangler.jsonc` for Cloudflare configuration
- The `nodejs_compat` compatibility flag is enabled

```typescript
// Example for dynamic pages
export const dynamic = "force-dynamic";
```

### 3. Styling Guidelines

#### Tailwind CSS 4
- CSS is configured with Tailwind 4's CSS-first approach
- Import order in `globals.css`:
  1. `@import "tailwindcss"`
  2. `@import "fumadocs-ui/css/neutral.css"`
  3. `@import "fumadocs-ui/css/preset.css"`
  4. Custom theme variables

#### Using cn() Utility
Always use the `cn()` utility from `@/lib/utils` for conditional class names:
```typescript
import { cn } from "@/lib/utils";

<div className={cn("base-class", condition && "conditional-class")} />
```

### 4. Component Patterns

#### shadcn/ui Components
- Components are in `src/components/ui/`
- Use the shadcn CLI to add new components: `pnpm dlx shadcn@latest add <component>`
- Components use class-variance-authority (CVA) for variants

#### MDX Components
- Custom MDX components are defined in `mdx-components.tsx`
- Extend `defaultMdxComponents` from `fumadocs-ui/mdx`

### 5. TypeScript Conventions

#### Path Aliases
Use the configured path aliases:
- `@/*` → `./src/*`
- `@/.source/*` → `./.source/*`
- `@/mdx-components` → `./mdx-components.tsx`

#### Type Imports
Prefer type-only imports where applicable:
```typescript
import type { Metadata } from "next";
import type { ReactNode, FC } from "react";
```

### 6. Layout Structure

#### Root Layout (`src/app/layout.tsx`)
- Wraps entire app with `RootProvider` from fumadocs-ui
- Includes Inter font and global CSS
- Sets `suppressHydrationWarning` for theme handling

#### Docs Layout (`src/app/docs/layout.tsx`)
- Uses `DocsLayout` from fumadocs-ui
- Receives `source.pageTree` for navigation
- Extends `baseOptions` from layout.config

#### Base Options (`src/app/layout.config.tsx`)
- Defines shared layout options (nav title, links, etc.)
- Type: `BaseLayoutProps` from fumadocs-ui

## Development Commands

```bash
# Development
pnpm preview              # Start dev server compatible with Cloudflare Workers

# Build & Deploy
pnpm build            # Build for production
pnpm preview          # Preview on Cloudflare runtime locally
pnpm deploy           # Deploy to Cloudflare

# Linting
pnpm lint             # Run ESLint

# Cloudflare Types
pnpm cf-typegen       # Generate Cloudflare environment types
```

## Common Tasks

### Adding a New Documentation Page
1. Create `content/docs/<page-name>.mdx`
2. Add frontmatter with title and description
3. Write content using MDX

### Adding a New UI Component
```bash
pnpm dlx shadcn@latest add button
```

### Modifying Navigation
Edit `src/app/layout.config.tsx` to customize nav options.

### Adding API Routes
- For Cloudflare compatibility, use Edge runtime or ensure Node.js APIs are available
- Place routes in `src/app/api/`

## Important Notes

1. **Build Generation**: The `.source/` directory is auto-generated by fumadocs-mdx - don't edit files there directly.

2. **Theme Support**: The project supports dark mode via fumadocs-ui's theme system with `suppressHydrationWarning`.

3. **React 19**: This project uses React 19.1.2 - be aware of concurrent rendering patterns.

4. **Next.js 15**: Using App Router exclusively, no Pages Router.

5. **Package Manager**: Use `pnpm` for all package operations.

## Fumadocs Version Compatibility

Currently using fumadocs v15 which is compatible with v14 documentation patterns. Key imports:

```typescript
// Provider
import { RootProvider } from "fumadocs-ui/provider";

// Layouts
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

// Page components
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from "fumadocs-ui/page";

// MDX components
import defaultMdxComponents from "fumadocs-ui/mdx";

// Source
import { loader } from "fumadocs-core/source";
```

## Error Handling

When encountering build errors:
1. Check that `.source/` directory exists (run `pnpm preview` to generate)
2. Verify MDX frontmatter syntax
3. Ensure dynamic pages have `export const dynamic = "force-dynamic"` for Cloudflare
4. Check fumadocs-mdx version compatibility with fumadocs-core and fumadocs-ui
