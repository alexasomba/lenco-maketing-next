'use client';
import React from 'react';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen p-8 bg-white dark:bg-black text-slate-900 dark:text-slate-50">
      {children}
    </div>
  );
}
