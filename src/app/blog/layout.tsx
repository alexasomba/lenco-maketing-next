import type { ReactNode } from 'react';
import LencoHeader from '@/components/LencoHeader';
import LencoFooter from '@/components/LencoFooter';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <LencoHeader />
      <main className="flex-1">{children}</main>
      <LencoFooter />
    </>
  );
}
