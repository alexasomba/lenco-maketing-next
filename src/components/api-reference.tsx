"use client";

import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";

export function APIReference() {
	return (
		<ApiReferenceReact
			configuration={{
				url: "/openapi.yaml",
				layout: "classic",
				theme: "kepler",
				hideClientButton: false,
				hideDownloadButton: false,
			}}
		/>
	);
}
