import defaultMdxComponents from 'fumadocs-ui/mdx';
import { createAPIPage } from 'fumadocs-openapi/ui';
import { openapi } from '@/lib/openapi';
import type { MDXComponents } from 'mdx/types';

const APIPage = createAPIPage(openapi);

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    APIPage,
    ...components,
  };
}

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return getMDXComponents(components);
}
