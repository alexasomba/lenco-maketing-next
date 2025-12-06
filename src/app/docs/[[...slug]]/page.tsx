import { source } from "@/lib/source";
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { Metadata } from "next";

// Force dynamic rendering for Cloudflare Workers compatibility
export const dynamic = "force-dynamic";

interface PageProps {
	params: Promise<{ slug?: string[] }>;
}

export default async function Page(props: PageProps) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const data = page.data as any;
	const MDX = data.body;

	return (
		<DocsPage toc={data.toc} full={data.full}>
			<DocsTitle>{data.title}</DocsTitle>
			<DocsDescription>{data.description}</DocsDescription>
			<DocsBody>
				<MDX components={{ ...defaultMdxComponents }} />
			</DocsBody>
		</DocsPage>
	);
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	return {
		title: page.data.title,
		description: page.data.description,
	};
}
