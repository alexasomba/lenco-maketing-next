import { HttpClient } from '../http';
import type { Account, AccountBalance } from '../types';

export class AccountsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all accounts
   */
  async list(page?: number): Promise<Account[]> {
    return this.http.get<Account[]>('/accounts', { page });
  }

  /**
   * Get account by ID
   */
  async get(id: string): Promise<Account> {
    return this.http.get<Account>(`/accounts/${id}`);
  }

  /**
   * Get account balance
   */
  async getBalance(id: string): Promise<AccountBalance> {
    return this.http.get<AccountBalance>(`/accounts/${id}/balance`);
  }
}
