import type { Metadata } from 'next';

const siteConfig = {
  name: 'Lenco',
  title: 'Lenco API Documentation',
  description: 'Complete API documentation for Lenco banking platform. Build banking integrations with accounts, transfers, payments, and more.',
  url: 'https://docs.lenco.co',
} as const;

/**
 * Creates metadata with consistent defaults and OG image support.
 */
export function createMetadata(override: Metadata = {}): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    openGraph: {
      title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`,
      },
      description: siteConfig.description,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`,
      },
      description: siteConfig.description,
      ...override.twitter,
    },
    ...override,
  };
}

export { siteConfig };
