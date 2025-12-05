import { HttpClient } from '../http';
import type { Recipient, MobileMoneyOperator } from '../types';

export class RecipientsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all transfer recipients
   */
  async list(page?: number): Promise<Recipient[]> {
    return this.http.get<Recipient[]>('/transfer-recipients', { page });
  }

  /**
   * Get recipient by ID
   */
  async get(id: string): Promise<Recipient> {
    return this.http.get<Recipient>(`/transfer-recipients/${id}`);
  }

  /**
   * Create a bank account recipient
   */
  async createBankAccount(params: {
    name: string;
    accountNumber: string;
    bankId: string;
  }): Promise<Recipient> {
    return this.http.post<Recipient>('/transfer-recipients/bank-account', params);
  }

  /**
   * Create a mobile money recipient
   */
  async createMobileMoney(params: {
    name: string;
    phone: string;
    operator: MobileMoneyOperator;
    country: string;
  }): Promise<Recipient> {
    return this.http.post<Recipient>('/transfer-recipients/mobile-money', params);
  }

  /**
   * Create a Lenco Money recipient
   */
  async createLencoMoney(params: { name: string; phone: string }): Promise<Recipient> {
    return this.http.post<Recipient>('/transfer-recipients/lenco-money', params);
  }

  /**
   * Create a Lenco Merchant recipient
   */
  async createLencoMerchant(params: { merchantId: string }): Promise<Recipient> {
    return this.http.post<Recipient>('/transfer-recipients/lenco-merchant', params);
  }
}
