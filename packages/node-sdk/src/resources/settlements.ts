import { HttpClient } from '../http';
import type { Settlement, ListSettlementsParams } from '../types';

export class SettlementsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all settlements
   */
  async list(params?: ListSettlementsParams): Promise<Settlement[]> {
    return this.http.get<Settlement[]>('/settlements', params as Record<string, string | number>);
  }

  /**
   * Get settlement by ID
   */
  async get(id: string): Promise<Settlement> {
    return this.http.get<Settlement>(`/settlements/${id}`);
  }
}
