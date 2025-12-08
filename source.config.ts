import { defineDocs, defineConfig, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

// Author and tag lists for blog
const BLOG_AUTHORS = ['alex-asomba', 'lenco-team'] as const;
const BLOG_TAGS = [
  'Getting Started',
  'Business',
  'Nigeria',
  'API',
  'Business Banking',
  'Guide',
  'Cash Flow',
  'Finance Tips',
  'Small Business',
  'Tips',
  'Finance',
  'Zambia',
  'Operations',
  'Business Growth',
  'Strategy',
  'Fintech',
  'Africa',
  'Security',
  'Mobile Banking',
  'Budgeting',
  'Team Building',
] as const;

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

// Blog collection
export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
      tags: z.array(z.enum(BLOG_TAGS)).optional(),
      featured: z.boolean().optional().default(false),
      readTimeMinutes: z.number().int().positive().optional(),
      author: z.union([
        z.enum(BLOG_AUTHORS),
        z.array(z.enum(BLOG_AUTHORS)),
      ]).optional(),
      thumbnail: z.string().optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  // Disable shiki syntax highlighting for Cloudflare Workers compatibility
  // shiki uses dynamic imports that don't work in the Workers runtime
  mdxOptions: {
    rehypeCodeOptions: false,
  },
});