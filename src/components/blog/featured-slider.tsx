'use client';

import Link from 'next/link';
import { getLocalThumbnail } from '@/lib/cn';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

interface FeaturedPost {
  url: string;
  title: string;
  date: string;
  author?: string;
  thumbnail?: string;
}

interface FeaturedSliderProps {
  posts: FeaturedPost[];
}

export function FeaturedSlider({ posts }: FeaturedSliderProps) {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  if (posts.length === 0) return null;

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="-ml-2">
        {posts.map((post) => (
          <CarouselItem
            key={post.url}
            className="pl-2 basis-full sm:basis-1/2 lg:basis-1/4"
          >
            <Link href={post.url} className="group block">
              <div className="flex gap-4 items-start p-3 rounded-xl hover:bg-accent/50 transition-colors">
                <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden shadow-sm ring-1 ring-border">
                  <img
                    src={getLocalThumbnail(post.thumbnail)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    {post.author && (
                      <>
                        <span className="opacity-50">•</span>
                        <span>{post.author}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      {posts.length > 4 && (
        <div className="hidden lg:block">
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </div>
      )}
    </Carousel>
  );
}
