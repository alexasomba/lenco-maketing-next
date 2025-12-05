import { source, getPageImage } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { TOCItemType } from 'fumadocs-core/toc';
import type { MDXComponents } from 'mdx/types';
import { Feedback } from '@/components/feedback';
import { onRateAction } from '@/app/actions/feedback';
import { LLMCopyButton, ViewOptions } from '@/components/page-actions';

interface PageData {
  body: React.ComponentType<{ components?: MDXComponents }>;
  toc: TOCItemType[];
  full?: boolean;
  title: string;
  description?: string;
  _openapi?: Record<string, unknown>;
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const data = page.data as PageData;
  const MDX = data.body;

  // Check if this is an OpenAPI-generated page
  const isOpenAPIPage = !!data._openapi;

  // Get file path for GitHub URL (may not exist for generated API docs)
  const filePath = (page as unknown as { file?: { path: string } }).file?.path;
  const githubUrl = filePath
    ? `https://github.com/alexasomba/lenco-maketing-next/blob/main/content/docs/${filePath}`
    : undefined;

  return (
    <DocsPage toc={data.toc} full={data.full}>
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription>{data.description}</DocsDescription>
      {!isOpenAPIPage && (
        <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
          <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
          <ViewOptions
            markdownUrl={`${page.url}.mdx`}
            githubUrl={githubUrl}
          />
        </div>
      )}
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      <Feedback onRateAction={onRateAction} />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const image = getPageImage(page);

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
      images: [
        {
          url: image.url,
          width: 1200,
          height: 630,
          alt: page.data.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [image.url],
    },
  };
}
