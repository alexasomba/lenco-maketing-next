import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "API Reference | Lenco",
	description: "Complete API reference for Lenco API v1",
};

export default function APIReferenceLayout({
	children,
}: {
	children: ReactNode;
}) {
	return children;
}
