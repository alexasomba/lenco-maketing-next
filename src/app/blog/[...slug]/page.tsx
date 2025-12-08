import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogSource } from '@/lib/blog-source';
import { getAuthors } from '@/lib/authors';
import { getMDXComponents } from '@/mdx-components';
import { getLocalThumbnail } from '@/lib/cn';
import { AuthorCard, AuthorsInline, AuthorsStack } from '@/components/blog/author-card';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { PromoContent } from '@/components/blog/promo-content';
import { MobileTableOfContents } from '@/components/blog/mobile-toc';
import { ReadMoreSection } from '@/components/blog/read-more-section';
import { BlogHeaderMap } from '@/components/blog/blog-header-map';
import { ShareButtons } from './share-buttons';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { MDXComponents } from 'mdx/types';
import type { Metadata } from 'next';
import { BlogPostFrontmatter } from '@/types/blog';

interface PageData extends BlogPostFrontmatter {
  body: React.ComponentType<{ components?: MDXComponents }>;
}

export async function generateStaticParams() {
  return blogSource.getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = blogSource.getPage(slug);
  if (!page) return {};

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = blogSource.getPage(slug);
  if (!page) notFound();

  const data = page.data as PageData;
  const MDX = data.body;

  // Resolve authors
  const authors = getAuthors(data.author);

  // Get all posts for "Read More" section
  const allPages = blogSource.getPages();
  const allPosts = allPages.map((p) => {
    const pData = p.data as unknown as BlogPostFrontmatter;
    return {
      url: p.url,
      title: pData.title,
      description: pData.description,
      date: pData.date,
      tags: pData.tags,
      thumbnail: pData.thumbnail,
    };
  });

  const currentSlug = slug?.join('/') || '';

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <header className="relative z-10 border-b border-border overflow-hidden">
        {/* Dotted Map Background */}
        <BlogHeaderMap />
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-6 p-6">
          {/* Back button & Tags */}
          <div className="flex flex-wrap items-center gap-3 gap-y-5 text-sm text-muted-foreground">
            <Button variant="outline" asChild className="h-6 w-6 p-0">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4" />
                <span className="sr-only">Back to all articles</span>
              </Link>
            </Button>
            {data.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 text-muted-foreground">
                {data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="h-6 w-fit px-3 text-sm font-medium bg-muted text-muted-foreground rounded-md border flex items-center justify-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-foreground max-w-4xl">
            {data.title}
          </h1>

          {/* Description */}
          {data.description && (
            <p className="text-lg text-muted-foreground max-w-3xl">
              {data.description}
            </p>
          )}

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {authors.length > 0 && (
              <div className="flex items-center">
                <div className="mr-3">
                  <AuthorsInline authors={authors} />
                </div>
              </div>
            )}
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(data.date)}</span>
            </span>
            {data.readTimeMinutes && (
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{data.readTimeMinutes} min read</span>
              </span>
            )}
            {/* Share buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <ShareButtons title={data.title} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto flex">
        {/* Article Content */}
        <main className="flex-1 min-w-0">
          {/* Featured Image */}
          <div className="p-6">
            <div className="rounded-lg overflow-hidden border border-border">
              <img
                src={getLocalThumbnail(data.thumbnail)}
                alt={data.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <article className="p-6 lg:p-10">
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-medium prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              <MDX components={getMDXComponents()} />
            </div>
          </article>
        </main>

        {/* Sidebar - Desktop Only */}
        <aside className="hidden lg:block w-[350px] shrink-0 p-6 lg:p-10 bg-muted/60 dark:bg-muted/20">
          <div className="sticky top-20 space-y-8">
            {/* Author block */}
            {authors.length > 0 &&
              (authors.length === 1 ? (
                <AuthorCard
                  name={authors[0].name}
                  avatar={authors[0].avatar}
                  position={authors[0].position}
                />
              ) : (
                <AuthorsStack authors={authors} />
              ))}

            {/* Table of Contents */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <TableOfContents />
            </div>

            {/* Promo Content */}
            <PromoContent variant="desktop" />
          </div>
        </aside>
      </div>

      {/* Read More Section */}
      <ReadMoreSection
        currentSlug={currentSlug}
        currentTags={data.tags}
        posts={allPosts}
      />

      {/* Mobile Table of Contents */}
      <MobileTableOfContents />
    </div>
  );
}
