import { generateFiles } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';

// v1 OpenAPI
const openapi = createOpenAPI({
  input: ['./openapi.yaml'],
});

// v2 OpenAPI
const openapiV2 = createOpenAPI({
  input: ['./openapi-v2.yaml'],
});

// Generate v1 API docs
void generateFiles({
  input: openapi,
  output: './content/docs/v1/api-reference',
  // Include descriptions from OpenAPI schema
  includeDescription: true,
  // Add comment to generated files
  addGeneratedComment: true,
  // Group by tag (Accounts, Banks, etc.)
  groupBy: 'tag',
});

// Generate v2 API docs
void generateFiles({
  input: openapiV2,
  output: './content/docs/v2/api-reference',
  // Include descriptions from OpenAPI schema
  includeDescription: true,
  // Add comment to generated files
  addGeneratedComment: true,
  // Group by tag (Accounts, Banks, etc.)
  groupBy: 'tag',
  // Use APIPageV2 component for v2 docs
  renderer: (props) => `<APIPageV2 ${props} />`,
});
