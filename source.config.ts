import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

// define `docs` collection (combined docs + meta)
export const docs = defineDocs({
  dir: 'content/docs',
});

export default defineConfig();