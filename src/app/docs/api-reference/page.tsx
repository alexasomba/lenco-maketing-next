"use client";

import nextDynamic from "next/dynamic";

// Dynamically import the API Reference component to avoid SSR issues
const APIReference = nextDynamic(
	() => import("@/components/api-reference").then((mod) => mod.APIReference),
	{
		ssr: false,
		loading: () => (
			<div className="flex items-center justify-center min-h-[60vh]">
				<div className="animate-pulse text-fd-muted-foreground">
					Loading API Reference...
				</div>
			</div>
		),
	}
);

export default function APIReferencePage() {
	return (
		<div className="min-h-screen w-full">
			<APIReference />
		</div>
	);
}
