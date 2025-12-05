import Link from 'next/link';
import { getLocalThumbnail } from '@/lib/cn';

interface Post {
  url: string;
  title: string;
  description?: string;
  date: string;
  author?: string;
  thumbnail?: string;
  tags?: string[];
}

interface PostGridProps {
  posts: Post[];
  title?: string;
  columns?: 3 | 4;
}

export function PostGrid({ posts, title, columns = 3 }: PostGridProps) {
  if (posts.length === 0) return null;

  return (
    <div className="py-12 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {title && (
          <h3 className="text-lg font-semibold text-foreground mb-8">{title}</h3>
        )}

        <div
          className={`grid gap-8 ${
            columns === 4
              ? 'sm:grid-cols-2 lg:grid-cols-4'
              : 'sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {posts.map((post) => (
            <Link key={post.url} href={post.url} className="group block">
              <article className="h-full">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 shadow-sm ring-1 ring-border/50 group-hover:shadow-lg group-hover:ring-border transition-all duration-300">
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
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
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
      </div>
    </div>
  );
}
