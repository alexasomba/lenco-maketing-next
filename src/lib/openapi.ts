import { createOpenAPI } from 'fumadocs-openapi/server';

// v1 OpenAPI instance
export const openapi = createOpenAPI({
  // Path to the OpenAPI schema file
  input: ['./openapi.yaml'],
  
  // Proxy URL for the API playground to avoid CORS issues
  proxyUrl: '/api/proxy',
});

// v2 OpenAPI instance
export const openapiV2 = createOpenAPI({
  // Path to the v2 OpenAPI schema file
  input: ['./openapi-v2.yaml'],
  
  // Proxy URL for the API playground to avoid CORS issues
  proxyUrl: '/api/proxy',
});
