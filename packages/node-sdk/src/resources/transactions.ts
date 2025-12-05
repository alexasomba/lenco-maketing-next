import { HttpClient } from '../http';
import type { Transaction, ListTransactionsParams } from '../types';

export class TransactionsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all transactions
   */
  async list(params?: ListTransactionsParams): Promise<Transaction[]> {
    return this.http.get<Transaction[]>('/transactions', params as Record<string, string | number>);
  }

  /**
   * Get transaction by ID
   */
  async get(id: string): Promise<Transaction> {
    return this.http.get<Transaction>(`/transactions/${id}`);
  }
}
