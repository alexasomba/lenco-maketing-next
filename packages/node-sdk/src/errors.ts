import type { ApiError } from './types';

export class LencoError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly response?: ApiError;

  constructor(message: string, status: number, code: string, response?: ApiError) {
    super(message);
    this.name = 'LencoError';
    this.status = status;
    this.code = code;
    this.response = response;
  }
}

export class AuthenticationError extends LencoError {
  constructor(message = 'Invalid API key or unauthorized request') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class ValidationError extends LencoError {
  constructor(message: string, response?: ApiError) {
    super(message, 400, response?.errorCode || 'VALIDATION_ERROR', response);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends LencoError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends LencoError {
  public readonly retryAfter?: number;

  constructor(message = 'Rate limit exceeded', retryAfter?: number) {
    super(message, 429, 'RATE_LIMIT');
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

export class ServerError extends LencoError {
  constructor(message = 'Internal server error') {
    super(message, 500, 'SERVER_ERROR');
    this.name = 'ServerError';
  }
}

export class NetworkError extends LencoError {
  constructor(message = 'Network error occurred') {
    super(message, 0, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}
