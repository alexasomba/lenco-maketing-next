import type { LencoConfig, ApiResponse, ApiError } from './types';
import {
  LencoError,
  AuthenticationError,
  ValidationError,
  NotFoundError,
  RateLimitError,
  ServerError,
  NetworkError,
} from './errors';

const BASE_URLS = {
  production: 'https://api.lenco.co/access/v2',
  sandbox: 'https://sandbox.lenco.co/access/v2',
} as const;

export class HttpClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly timeout: number;
  private readonly maxRetries: number;
  private readonly debug: boolean;

  constructor(config: LencoConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = BASE_URLS[config.environment || 'production'];
    this.timeout = config.timeout || 30000;
    this.maxRetries = config.maxRetries ?? 3;
    this.debug = config.debug || false;
  }

  private log(message: string, data?: unknown): void {
    if (this.debug) {
      console.log(`[Lenco SDK] ${message}`, data ?? '');
    }
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private getRetryDelay(attempt: number): number {
    // Exponential backoff: 1s, 2s, 4s...
    return Math.min(1000 * Math.pow(2, attempt), 10000);
  }

  private shouldRetry(status: number, attempt: number): boolean {
    if (attempt >= this.maxRetries) return false;
    // Retry on 5xx errors and 429 (rate limit)
    return status >= 500 || status === 429;
  }

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    body?: Record<string, unknown>,
    query?: Record<string, string | number | undefined>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);

    // Add query parameters
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': '@lenco/sdk/2.0.0',
    };

    let attempt = 0;

    while (true) {
      try {
        this.log(`${method} ${url.toString()}`, body);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const response = await fetch(url.toString(), {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const responseData = await response.json() as ApiResponse<T> | ApiError;

        this.log(`Response ${response.status}`, responseData);

        if (!response.ok) {
          // Check if we should retry
          if (this.shouldRetry(response.status, attempt)) {
            const delay = this.getRetryDelay(attempt);
            this.log(`Retrying in ${delay}ms (attempt ${attempt + 1}/${this.maxRetries})`);
            await this.sleep(delay);
            attempt++;
            continue;
          }

          // Throw appropriate error
          this.handleError(response.status, responseData as ApiError);
        }

        return (responseData as ApiResponse<T>).data;
      } catch (error) {
        if (error instanceof LencoError) {
          throw error;
        }

        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            throw new NetworkError('Request timed out');
          }
          throw new NetworkError(error.message);
        }

        throw new NetworkError('An unknown error occurred');
      }
    }
  }

  private handleError(status: number, response: ApiError): never {
    const message = response?.message || 'An error occurred';

    switch (status) {
      case 400:
        throw new ValidationError(message, response);
      case 401:
        throw new AuthenticationError(message);
      case 404:
        throw new NotFoundError(message);
      case 429:
        throw new RateLimitError(message);
      case 500:
      case 502:
      case 503:
      case 504:
        throw new ServerError(message);
      default:
        throw new LencoError(message, status, response?.errorCode || 'UNKNOWN_ERROR', response);
    }
  }

  async get<T>(path: string, query?: Record<string, string | number | undefined>): Promise<T> {
    return this.request<T>('GET', path, undefined, query);
  }

  async post<T>(path: string, body?: Record<string, unknown>): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  async put<T>(path: string, body?: Record<string, unknown>): Promise<T> {
    return this.request<T>('PUT', path, body);
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }
}
