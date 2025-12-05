import { generateFiles } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';

const openapi = createOpenAPI({
  input: ['./openapi.yaml'],
});

void generateFiles({
  input: openapi,
  output: './content/docs/api-reference',
  // Include descriptions from OpenAPI schema
  includeDescription: true,
  // Add comment to generated files
  addGeneratedComment: true,
  // No index generation - we'll use meta.json for navigation instead
});
