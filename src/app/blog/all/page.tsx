import Link from 'next/link';
import { blogSource } from '@/lib/blog-source';
import { getAuthors } from '@/lib/authors';
import { cn, getLocalThumbnail } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';

interface BlogPageData {
  url: string;
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  readTimeMinutes?: number;
  author?: string;
  thumbnail?: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const POSTS_PER_PAGE = 9;

export default async function AllArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; page?: string }>;
}) {
  const params = await searchParams;
  const selectedTag = params.tag || 'All';
  const currentPage = Number(params.page) || 1;

  const pages = blogSource.getPages();

  const blogPages: BlogPageData[] = pages.map((page) => {
    const resolved = getAuthors(page.data.author as string | string[] | undefined);
    const authorStr =
      resolved.length === 1
        ? resolved[0].name
        : resolved.length > 1
          ? resolved.map((a) => a.name).join(', ')
          : undefined;

    return {
      url: page.url,
      title: page.data.title,
      description: page.data.description,
      date: page.data.date,
      tags: page.data.tags,
      featured: page.data.featured,
      readTimeMinutes: page.data.readTimeMinutes,
      author: authorStr,
      thumbnail: page.data.thumbnail,
    };
  });

  // Sort by date, newest first
  blogPages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Get all unique tags with counts
  const tagCounts: Record<string, number> = { All: blogPages.length };
  blogPages.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const allTags = ['All', ...Object.keys(tagCounts).filter((t) => t !== 'All').sort()];

  // Format dates
  const formattedPosts = blogPages.map((post) => ({
    ...post,
    date: formatDate(post.date),
  }));

  // Filter posts by tag
  const filteredPosts =
    selectedTag === 'All'
      ? formattedPosts
      : formattedPosts.filter((post) => post.tags?.includes(selectedTag));

  // Pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">All Articles</h1>
          <p className="text-muted-foreground mt-2">
            Browse all {totalPosts} article{totalPosts !== 1 ? 's' : ''}
            {selectedTag !== 'All' && ` tagged with "${selectedTag}"`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-muted/50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">Filter by Tag</h3>
                </div>
                <div className="space-y-1">
                  {allTags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/all?tag=${encodeURIComponent(tag)}&page=1`}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                        selectedTag === tag
                          ? 'bg-primary text-primary-foreground font-medium'
                          : 'text-muted-foreground hover:bg-background hover:text-foreground'
                      )}
                    >
                      <span>{tag}</span>
                      <span
                        className={cn(
                          'text-xs px-2 py-0.5 rounded-full',
                          selectedTag === tag
                            ? 'bg-primary-foreground/20 text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {tagCounts[tag] || 0}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {paginatedPosts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-muted-foreground">No posts found with this tag.</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/blog/all?tag=All&page=1">View all posts</Link>
                </Button>
              </div>
            ) : (
              <>
                {/* Posts Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedPosts.map((post) => (
                    <Link key={post.url} href={post.url} className="group block">
                      <article className="h-full">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 shadow-sm ring-1 ring-border/50 group-hover:shadow-lg transition-all">
                          <img
                            src={getLocalThumbnail(post.thumbnail)}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {post.tags && post.tags.length > 0 && (
                            <div className="absolute top-3 left-3">
                              <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-background/90 backdrop-blur-sm text-foreground rounded-full shadow-sm">
                                {post.tags[0]}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {post.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{post.date}</span>
                            {post.author && (
                              <>
                                <span className="opacity-50">•</span>
                                <span>{post.author}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <Link
                      href={`/blog/all?tag=${encodeURIComponent(selectedTag)}&page=${Math.max(1, currentPage - 1)}`}
                      className={cn(
                        'p-2 rounded-lg border border-border hover:bg-accent transition-colors',
                        currentPage === 1 && 'pointer-events-none opacity-50'
                      )}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Link>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Link
                        key={pageNum}
                        href={`/blog/all?tag=${encodeURIComponent(selectedTag)}&page=${pageNum}`}
                        className={cn(
                          'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                          currentPage === pageNum
                            ? 'bg-primary text-primary-foreground'
                            : 'border border-border hover:bg-accent'
                        )}
                      >
                        {pageNum}
                      </Link>
                    ))}

                    <Link
                      href={`/blog/all?tag=${encodeURIComponent(selectedTag)}&page=${Math.min(totalPages, currentPage + 1)}`}
                      className={cn(
                        'p-2 rounded-lg border border-border hover:bg-accent transition-colors',
                        currentPage === totalPages && 'pointer-events-none opacity-50'
                      )}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
