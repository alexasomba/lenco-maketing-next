"use client";

import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";
import { useState } from "react";

const API_VERSIONS = {
	v2: {
		label: "v2 (Latest)",
		url: "/openapi-v2.yaml",
		title: "Lenco API V2 Reference",
		description: "Lenco API v2 - Collections, Transfers, Settlements",
	},
	v1: {
		label: "v1 (Legacy)",
		url: "/openapi.yaml",
		title: "Lenco API V1 Reference",
		description: "Lenco API v1 - Accounts, Virtual Accounts, Bill Payments, POS",
	},
} as const;

type ApiVersion = keyof typeof API_VERSIONS;

export function APIReference({ defaultVersion = "v2" }: { defaultVersion?: ApiVersion }) {
	const [version, setVersion] = useState<ApiVersion>(defaultVersion);
	const currentApi = API_VERSIONS[version];

	return (
		<div className="flex flex-col h-full">
			{/* Version Switcher */}
			<div className="sticky top-0 z-50 bg-fd-background border-b border-fd-border px-4 py-3">
				<div className="flex items-center gap-4">
					<span className="text-sm font-medium text-fd-foreground">API Version:</span>
					<div className="flex gap-2">
						{(Object.keys(API_VERSIONS) as ApiVersion[]).map((v) => (
							<button
								key={v}
								onClick={() => setVersion(v)}
								className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
									version === v
										? "bg-fd-primary text-fd-primary-foreground"
										: "bg-fd-muted text-fd-muted-foreground hover:bg-fd-accent"
								}`}
							>
								{API_VERSIONS[v].label}
							</button>
						))}
					</div>
					<span className="text-xs text-fd-muted-foreground hidden sm:inline">
						{currentApi.description}
					</span>
				</div>
			</div>

			{/* API Reference */}
			<div className="flex-1">
				<ApiReferenceReact
					key={version} // Force re-mount when version changes
					configuration={{
						url: currentApi.url,
						theme: "default",
						layout: "modern",
						showSidebar: false,
						hideClientButton: false,
						operationTitleSource: "summary",
						persistAuth: false,
						isEditable: false,
						hideModels: false,
						hideTestRequestButton: false,
						hideSearch: false,
						hideDarkModeToggle: false,
						withDefaultFonts: true,
						defaultOpenAllTags: false,
						searchHotKey: "k",
						hideDownloadButton: false,
						metaData: {
							title: currentApi.title,
							description: currentApi.description,
						},
					}}
				/>
			</div>
		</div>
	);
}
