import { source, getPageImage } from '@/lib/source';
import { generateOGImage } from 'fumadocs-ui/og';
import { notFound } from 'next/navigation';

export function generateStaticParams(): { slug: string[] }[] {
  return source.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}

export async function GET(
  _req: Request,
  props: { params: Promise<{ slug: string[] }> }
): Promise<Response> {
  const params = await props.params;
  // Remove 'image.png' from the end to get the actual page slug
  const pageSlug = params.slug.slice(0, -1);
  const page = source.getPage(pageSlug);

  if (!page) notFound();

  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: 'Lenco',
    primaryColor: '#0284c7', // sky-600
    primaryTextColor: '#ffffff',
  });
}
