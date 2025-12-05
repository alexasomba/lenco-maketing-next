import { HttpClient } from '../http';
import type { EncryptionKey } from '../types';

export class EncryptionResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get encryption key for card data
   */
  async getKey(): Promise<EncryptionKey> {
    return this.http.get<EncryptionKey>('/collections/encryption-key');
  }
}
