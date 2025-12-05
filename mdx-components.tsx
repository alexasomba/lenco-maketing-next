import defaultMdxComponents from 'fumadocs-ui/mdx';
import { createAPIPage } from 'fumadocs-openapi/ui';
import { openapi } from '@/lib/openapi';
import type { MDXComponents } from 'mdx/types';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { File, Folder, Files } from 'fumadocs-ui/components/files';
import { TypeTable } from 'fumadocs-ui/components/type-table';

const APIPage = createAPIPage(openapi);

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    APIPage,
    // Additional components
    Accordion,
    Accordions,
    Tab,
    Tabs,
    Step,
    Steps,
    File,
    Folder,
    Files,
    TypeTable,
    ...components,
  };
}

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return getMDXComponents(components);
}
