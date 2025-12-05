import { openapi } from '@/lib/openapi';

const proxy = openapi.createProxy({
  // Allow requests to Lenco API endpoints
  allowedOrigins: [
    'https://api.lenco.co',
    'https://sandbox.lenco.co',
  ],
});

export const GET = proxy.GET;
export const POST = proxy.POST;
export const PUT = proxy.PUT;
export const DELETE = proxy.DELETE;
export const PATCH = proxy.PATCH;
export const HEAD = proxy.HEAD;
