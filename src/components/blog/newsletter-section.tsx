'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, CheckCircle2 } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="relative bg-gradient-to-b from-muted/80 to-muted py-16 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="relative max-w-2xl mx-auto">
        <Card className="border-0 shadow-lg bg-background/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Dive into top stories, trends, and gems you&apos;ll love. Subscribe!
            </h2>
            <p className="text-muted-foreground mb-8">
              Get the latest insights delivered straight to your inbox.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch gap-3 max-w-xl mx-auto"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 h-12 px-5 rounded-full"
                disabled={status === 'loading'}
              />
              <Button
                type="submit"
                disabled={status === 'loading' || !email}
                className="h-12 px-8 rounded-full font-semibold shadow-sm hover:shadow-md transition-all"
              >
                {status === 'loading' ? (
                  'Subscribing...'
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Subscribed!
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </form>
            {status === 'success' && (
              <p className="text-primary text-sm mt-4 font-medium flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Thanks for subscribing! Check your inbox.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
