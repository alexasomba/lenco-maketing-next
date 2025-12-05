import { HttpClient } from '../http';
import type {
  Collection,
  CollectFromMobileMoneyParams,
  CollectFromCardParams,
  ListCollectionsParams,
} from '../types';

export class CollectionsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all collections
   */
  async list(params?: ListCollectionsParams): Promise<Collection[]> {
    return this.http.get<Collection[]>('/collections', params as Record<string, string | number>);
  }

  /**
   * Get collection by ID
   */
  async get(id: string): Promise<Collection> {
    return this.http.get<Collection>(`/collections/${id}`);
  }

  /**
   * Get collection by reference
   */
  async getByReference(reference: string): Promise<Collection> {
    return this.http.get<Collection>(`/collections/status/${reference}`);
  }

  /**
   * Collect from mobile money
   */
  async fromMobileMoney(params: CollectFromMobileMoneyParams): Promise<Collection> {
    return this.http.post<Collection>('/collections/mobile-money', params as unknown as Record<string, unknown>);
  }

  /**
   * Collect from card (direct API integration)
   */
  async fromCard(params: CollectFromCardParams): Promise<Collection> {
    return this.http.post<Collection>('/collections/card', params as unknown as Record<string, unknown>);
  }
}
