'use client';

import Link from 'next/link';
import { getLocalThumbnail } from '@/lib/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const visiblePosts = 4;
  const maxIndex = Math.max(0, posts.length - visiblePosts);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  if (posts.length === 0) return null;

  return (
    <div className="relative py-2">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visiblePosts)}%)` }}
        >
          {posts.map((post) => (
            <div
              key={post.url}
              className="shrink-0 w-full sm:w-1/2 lg:w-1/4 px-2"
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
            </div>
          ))}
        </div>
      </div>

      {posts.length > visiblePosts && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-1">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-1.5 rounded-full bg-background border border-border text-foreground disabled:opacity-30 hover:bg-accent shadow-sm transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="p-1.5 rounded-full bg-background border border-border text-foreground disabled:opacity-30 hover:bg-accent shadow-sm transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
