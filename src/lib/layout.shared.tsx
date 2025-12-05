import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <Image
            src="/lenco-logo.svg"
            alt="Lenco"
            width={80}
            height={24}
            className="dark:invert"
          />
          <span className="text-fd-muted-foreground text-sm">Docs</span>
        </div>
      ),
      url: '/',
    },
    githubUrl: 'https://github.com/lenco-co',
    links: [
      {
        text: 'Dashboard',
        url: 'https://app.lenco.co',
        external: true,
      },
      {
        text: 'Support',
        url: 'mailto:support@lenco.co',
        external: true,
      },
    ],
  };
}
