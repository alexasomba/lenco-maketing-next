import Link from 'next/link';
import { getLocalThumbnail } from '@/lib/cn';

interface BlogPost {
  url: string;
  title: string;
  description?: string;
  date: string;
  thumbnail?: string;
  tags?: string[];
}

interface ReadMoreSectionProps {
  currentSlug: string;
  currentTags?: string[];
  posts: BlogPost[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ReadMoreSection({
  currentSlug,
  currentTags = [],
  posts,
}: ReadMoreSectionProps) {
  const otherPosts = posts.filter((post) => !post.url.includes(currentSlug));

  const relatedPosts = otherPosts
    .map((post) => {
      const sharedTags =
        post.tags?.filter((tag) => currentTags.includes(tag)).length || 0;
      return { ...post, sharedTags };
    })
    .sort((a, b) => {
      if (b.sharedTags !== a.sharedTags) return b.sharedTags - a.sharedTags;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">Read More</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post) => (
            <Link key={post.url} href={post.url} className="group block">
              <article className="border border-border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={getLocalThumbnail(post.thumbnail)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {post.description}
                    </p>
                  )}
                  <time className="text-xs text-muted-foreground">
                    {formatDate(post.date)}
                  </time>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
