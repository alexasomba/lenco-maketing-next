import Link from 'next/link';
import { blogSource } from '@/lib/blog-source';
import { getAuthors } from '@/lib/authors';
import { FeaturedSlider } from '@/components/blog/featured-slider';
import { NewsletterSection } from '@/components/blog/newsletter-section';
import { TrendingTags } from '@/components/blog/trending-tags';
import { FeaturedHero } from '@/components/blog/featured-hero';
import { PostGrid } from '@/components/blog/post-grid';
import { ResourcesSection } from '@/components/blog/resources-section';
import { RecentPostsGrid } from '@/components/blog/recent-posts-grid';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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

export default function BlogPage() {
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

  // Get all unique tags
  const allTags = [
    'All',
    ...Array.from(new Set(blogPages.flatMap((blog) => blog.tags || []))).sort(),
  ];

  // Get featured posts
  const featuredPosts = blogPages.filter((post) => post.featured);

  // Format dates for display
  const formattedPosts = blogPages.map((post) => ({
    ...post,
    date: formatDate(post.date),
  }));

  const formattedFeaturedPosts = featuredPosts.map((post) => ({
    ...post,
    date: formatDate(post.date),
  }));

  const mainFeaturedPost = formattedFeaturedPosts[0] || undefined;

  const sliderPosts = formattedPosts.slice(0, 8);
  const gridPosts = formattedPosts.slice(0, 4);
  const recentPosts = formattedPosts.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Featured posts slider */}
      <div className="border-b border-border py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <FeaturedSlider posts={sliderPosts} />
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Trending Tags */}
      <TrendingTags tags={allTags} />

      {/* Featured Hero Post */}
      {mainFeaturedPost && <FeaturedHero post={mainFeaturedPost} />}

      {/* Regular post grid */}
      <PostGrid posts={gridPosts} columns={4} />

      {/* Resources Section */}
      <ResourcesSection />

      {/* Recent Posts */}
      <RecentPostsGrid posts={recentPosts} />

      {/* View All CTA */}
      <div className="py-12 px-6 text-center">
        <Button asChild size="lg">
          <Link href="/blog/all?tag=All&page=1">
            View All Articles
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
