import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
	nav: {
		title: "Lenco Docs",
	},
	links: [
		{
			text: "Documentation",
			url: "/docs",
		},
		{
			text: "API Reference",
			url: "/docs/api-reference",
		},
	],
};
