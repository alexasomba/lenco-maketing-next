import Link from 'next/link';
import { getLocalThumbnail } from '@/lib/cn';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Post {
  url: string;
  title: string;
  description?: string;
  date: string;
  author?: string;
  thumbnail?: string;
  tags?: string[];
}

interface RecentPostsGridProps {
  posts: Post[];
}

export function RecentPostsGrid({ posts }: RecentPostsGridProps) {
  if (posts.length === 0) return null;

  const largePosts = posts.slice(0, 2);
  const smallPosts = posts.slice(2, 8);

  return (
    <div className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Posts</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Stay up to date with the latest articles
            </p>
          </div>
          <Link
            href="/blog/all?tag=All&page=1"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
          >
            View all articles
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {largePosts.map((post) => (
              <Link key={post.url} href={post.url} className="group block">
                <Card className="overflow-hidden border-border/50 hover:shadow-lg hover:border-border transition-all duration-300 py-0 gap-0">
                  <div className="grid md:grid-cols-2 gap-0 items-center">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={getLocalThumbnail(post.thumbnail)}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {post.tags && post.tags.length > 0 && (
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm shadow-sm">
                            {post.tags[0]}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 space-y-3">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      {post.description && (
                        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                          {post.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium">{post.date}</span>
                        {post.author && (
                          <>
                            <span className="opacity-50">•</span>
                            <span>{post.author}</span>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <Card className="h-fit py-4 gap-0">
            <CardContent className="p-4 pt-0 space-y-2">
              <h4 className="text-sm font-semibold text-foreground mb-4 px-2">More Articles</h4>
              {smallPosts.map((post) => (
                <Link key={post.url} href={post.url} className="group block">
                  <div className="flex gap-3 p-2 rounded-lg hover:bg-accent transition-colors">
                    <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden ring-1 ring-border">
                      <img
                        src={getLocalThumbnail(post.thumbnail)}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h5>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {post.date}
                        </span>
                        {post.tags && post.tags[0] && (
                          <>
                            <span className="text-muted-foreground/50">•</span>
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                              {post.tags[0]}
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
