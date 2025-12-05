import Link from 'next/link';
import { getLocalThumbnail } from '@/lib/cn';

interface FeaturedHeroProps {
  post: {
    url: string;
    title: string;
    description?: string;
    date: string;
    author?: string;
    thumbnail?: string;
    tags?: string[];
  };
}

export function FeaturedHero({ post }: FeaturedHeroProps) {
  return (
    <div className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-4">
            Featured Post
          </h3>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Link href={post.url} className="group block">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg ring-1 ring-border/50">
              <img
                src={getLocalThumbnail(post.thumbnail)}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="flex flex-col gap-5">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground group-hover:text-primary transition-colors leading-[1.15] tracking-tight">
                {post.title}
              </h2>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="font-medium">{post.date}</span>
                {post.author && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span>By {post.author}</span>
                  </>
                )}
              </div>

              {post.description && (
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              )}

              <div className="flex items-center gap-2 text-primary font-semibold mt-2">
                Read article
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
