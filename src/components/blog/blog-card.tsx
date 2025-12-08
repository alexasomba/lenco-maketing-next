import Link from 'next/link';
import { cn, getLocalThumbnail } from '@/lib/cn';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  url: string;
  title: string;
  description: string;
  date: string;
  thumbnail?: string;
  tags?: string[];
  showRightBorder?: boolean;
}

export function BlogCard({
  url,
  title,
  description,
  date,
  thumbnail,
  tags,
  showRightBorder = true,
}: BlogCardProps) {
  return (
    <Link
      href={url}
      className={cn(
        "group block",
        showRightBorder && 'md:border-r border-border'
      )}
    >
      <Card className="border-0 shadow-none rounded-none h-full transition-colors hover:bg-accent/50 py-0 gap-0">
        <div className="flex flex-col h-full">
          {thumbnail && (
            <div className="relative w-full h-48 overflow-hidden">
              <img
                src={getLocalThumbnail(thumbnail)}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {tags && tags.length > 0 && (
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                    {tags[0]}
                  </Badge>
                </div>
              )}
            </div>
          )}
          <CardContent className="flex-1 flex flex-col gap-2 p-6">
            <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 flex-1">
              {description}
            </p>
            <time className="block text-sm font-medium text-muted-foreground">
              {date}
            </time>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
