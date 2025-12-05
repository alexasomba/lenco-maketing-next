'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface TrendingTagsProps {
  tags: string[];
}

const tagDescriptions: Record<string, { description: string; colorClass: string }> = {
  'Business Banking': {
    description:
      'Everything you need to know about managing your business finances, opening accounts, and banking solutions.',
    colorClass: 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700/50',
  },
  'Getting Started': {
    description:
      'Step-by-step guides to help you get up and running with Lenco business banking quickly.',
    colorClass: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700/50',
  },
  'Finance Tips': {
    description:
      'Expert advice on managing cash flow, budgeting, and making smart financial decisions for your business.',
    colorClass: 'bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700/50',
  },
  Guide: {
    description:
      'Comprehensive tutorials and walkthroughs for mastering business finance management.',
    colorClass: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700/50',
  },
  Nigeria: {
    description: 'Insights specific to doing business and banking in Nigeria.',
    colorClass: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700/50',
  },
  'Cash Flow': {
    description:
      'Learn how to optimize your cash flow and keep your business financially healthy.',
    colorClass: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700/50',
  },
  'Small Business': {
    description:
      'Resources and tips specifically designed for small business owners and entrepreneurs.',
    colorClass: 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700/50',
  },
  Finance: {
    description:
      'Deep dives into financial strategies, accounting practices, and money management for businesses.',
    colorClass: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700/50',
  },
  Fintech: {
    description:
      'Explore the latest in financial technology, digital banking, and innovation in Africa.',
    colorClass: 'bg-cyan-50 dark:bg-cyan-900/30 border-cyan-200 dark:border-cyan-700/50',
  },
  Payments: {
    description:
      'Everything about payment processing, transfers, and transaction management.',
    colorClass: 'bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-700/50',
  },
  Security: {
    description:
      'Best practices for keeping your business finances and accounts secure.',
    colorClass: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700/50',
  },
  Taxes: {
    description:
      'Tax planning, compliance, and strategies for Nigerian businesses.',
    colorClass: 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700/50',
  },
  Growth: {
    description:
      'Strategies and insights for scaling your business and increasing revenue.',
    colorClass: 'bg-lime-50 dark:bg-lime-900/30 border-lime-200 dark:border-lime-700/50',
  },
  API: {
    description:
      'Technical guides for integrating Lenco APIs into your applications.',
    colorClass: 'bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-700/50',
  },
  Zambia: {
    description: 'Insights specific to doing business and banking in Zambia.',
    colorClass: 'bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-700/50',
  },
};

export function TrendingTags({ tags }: TrendingTagsProps) {
  if (tags.length <= 1) return null;

  const displayTags = tags.filter((tag) => tag !== 'All');

  return (
    <div className="py-12 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Explore Topics</h3>
            <p className="text-sm text-muted-foreground mt-1">Browse articles by category</p>
          </div>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {displayTags.map((tag, index) => {
              // Fallback colors for tags not in the mapping
              const fallbackColors = [
                'bg-sky-50 dark:bg-sky-900/30 border-sky-200 dark:border-sky-700/50',
                'bg-fuchsia-50 dark:bg-fuchsia-900/30 border-fuchsia-200 dark:border-fuchsia-700/50',
                'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700/50',
                'bg-stone-50 dark:bg-stone-900/30 border-stone-200 dark:border-stone-700/50',
              ];
              const info = tagDescriptions[tag] || {
                description: `Articles about ${tag}`,
                colorClass: fallbackColors[index % fallbackColors.length],
              };
              return (
                <CarouselItem key={tag} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                  <Link
                    href={`/blog/all?tag=${encodeURIComponent(tag)}&page=1`}
                    className="group block h-full"
                  >
                    <Card className={`h-full ${info.colorClass} hover:shadow-lg transition-all duration-300`}>
                      <CardContent className="p-5">
                        <h4 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {tag}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {info.description}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                          Explore
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="-left-4 lg:-left-12" />
            <CarouselNext className="-right-4 lg:-right-12" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
