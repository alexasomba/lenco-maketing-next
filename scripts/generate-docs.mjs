import { generateFiles } from "fumadocs-openapi";

await generateFiles({
	input: ["./public/openapi.yaml"],
	output: "./content/docs/api-reference",
	// Group by tag to organize endpoints
	per: "tag",
	// Include endpoint descriptions in the generated MDX
	includeDescription: true,
});

console.log("✅ API docs generated successfully!");
