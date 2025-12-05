'use client';

import { useState, useEffect } from 'react';
import { List, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { TableOfContents } from './table-of-contents';
import { PromoContent } from './promo-content';

export function MobileTableOfContents() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Open table of contents"
      >
        <List size={20} />
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={cn(
          'lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border rounded-t-lg z-50 max-h-[70vh] overflow-hidden flex flex-col transition-transform duration-300 ease-out',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold">Table of Contents</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          <TableOfContents />
        </div>

        <PromoContent variant="mobile" />
      </div>
    </>
  );
}
