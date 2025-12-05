import { HttpClient } from '../http';
import type {
  Transfer,
  TransferToBankAccountParams,
  TransferToMobileMoneyParams,
  TransferToLencoMoneyParams,
  TransferToLencoMerchantParams,
  TransferToAccountParams,
  ListTransfersParams,
} from '../types';

export class TransfersResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all transfers
   */
  async list(params?: ListTransfersParams): Promise<Transfer[]> {
    return this.http.get<Transfer[]>('/transfers', params as Record<string, string | number>);
  }

  /**
   * Get transfer by ID
   */
  async get(id: string): Promise<Transfer> {
    return this.http.get<Transfer>(`/transfers/${id}`);
  }

  /**
   * Get transfer by reference
   */
  async getByReference(reference: string): Promise<Transfer> {
    return this.http.get<Transfer>(`/transfers/reference/${reference}`);
  }

  /**
   * Transfer to a bank account
   */
  async toBankAccount(params: TransferToBankAccountParams): Promise<Transfer> {
    return this.http.post<Transfer>('/transfers/bank-account', params as unknown as Record<string, unknown>);
  }

  /**
   * Transfer to mobile money
   */
  async toMobileMoney(params: TransferToMobileMoneyParams): Promise<Transfer> {
    return this.http.post<Transfer>('/transfers/mobile-money', params as unknown as Record<string, unknown>);
  }

  /**
   * Transfer to Lenco Money
   */
  async toLencoMoney(params: TransferToLencoMoneyParams): Promise<Transfer> {
    return this.http.post<Transfer>('/transfers/lenco-money', params as unknown as Record<string, unknown>);
  }

  /**
   * Transfer to Lenco Merchant
   */
  async toLencoMerchant(params: TransferToLencoMerchantParams): Promise<Transfer> {
    return this.http.post<Transfer>('/transfers/lenco-merchant', params as unknown as Record<string, unknown>);
  }

  /**
   * Transfer to a saved recipient
   */
  async toRecipient(params: TransferToAccountParams): Promise<Transfer> {
    return this.http.post<Transfer>('/transfers/account', params as unknown as Record<string, unknown>);
  }
}
