import type { Metadata } from "next";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { HomeLayout } from "fumadocs-ui/layouts/home";

export const metadata: Metadata = {
	title: "API Reference | Lenco Docs",
	description: "Complete API reference for Lenco API",
};

export default function APIReferenceLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<HomeLayout {...baseOptions}>
			<div className="w-full">{children}</div>
		</HomeLayout>
	);
}
