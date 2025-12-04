# OpenNext Starter

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Read the documentation at https://opennext.js.org/cloudflare.

## Develop

Run the Next.js development server:

```bash
npm run dev
# or similar package manager command
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Preview

Preview the application locally on the Cloudflare runtime:

```bash
npm run preview
# or similar package manager command
```

## Deploy

Deploy the application to Cloudflare:

```bash
npm run deploy
# or similar package manager command
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Fumadocs (docs) — quick notes

- Fumadocs packages added: `fumadocs-mdx`, `fumadocs-core`, and `fumadocs-ui` (installed via pnpm).
- A sample docs page (Manual Installation / Next) was added at `content/docs/ui/manual-installation/next.mdx`.
- A minimal docs route was created at `/docs` — the content is rendered using the project's MDX setup. You can view it by running the dev server and navigating to `http://localhost:3000/docs`.

Notes: the repository includes the MDX configuration and the auto-generated `.source/*` helpers created by `fumadocs-mdx`. The UI components from `fumadocs-ui` may require a later React/Next version for some features; the project currently renders the MDX statically to ensure compatibility.
