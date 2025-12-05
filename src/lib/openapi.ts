import { createOpenAPI } from 'fumadocs-openapi/server';

export const openapi = createOpenAPI({
  // Path to the OpenAPI schema file
  input: ['./openapi.yaml'],
  
  // Proxy URL for the API playground to avoid CORS issues
  proxyUrl: '/api/proxy',
});
