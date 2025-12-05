import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <span className="font-bold text-lg">Lenco</span>
          <span className="text-fd-muted-foreground text-sm ml-1">API</span>
        </>
      ),
      url: '/docs/v1',
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
