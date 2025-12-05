import { docs } from 'fumadocs-mdx:collections/server';
import { loader, type InferPageType } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

/**
 * Get the OG image URL for a documentation page.
 * The image is generated at build time via the /og/docs/[...slug] route.
 */
export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];
  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}