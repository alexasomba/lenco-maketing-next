import { HttpClient } from '../http';
import type {
  Bank,
  ResolvedBankAccount,
  ResolvedMobileMoney,
  ResolvedLencoMoney,
  ResolvedLencoMerchant,
  MobileMoneyOperator,
} from '../types';

export class BanksResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * List all banks
   */
  async list(country?: string): Promise<Bank[]> {
    return this.http.get<Bank[]>('/banks', { country });
  }

  /**
   * Resolve a bank account
   */
  async resolveBankAccount(params: {
    accountNumber: string;
    bankId: string;
  }): Promise<ResolvedBankAccount> {
    return this.http.post<ResolvedBankAccount>('/banks/resolve', params);
  }

  /**
   * Resolve a mobile money account
   */
  async resolveMobileMoney(params: {
    phone: string;
    operator: MobileMoneyOperator;
    country: string;
  }): Promise<ResolvedMobileMoney> {
    return this.http.post<ResolvedMobileMoney>('/banks/resolve/mobile-money', params);
  }

  /**
   * Resolve a Lenco Money account
   */
  async resolveLencoMoney(params: { phone: string }): Promise<ResolvedLencoMoney> {
    return this.http.post<ResolvedLencoMoney>('/banks/resolve/lenco-money', params);
  }

  /**
   * Resolve a Lenco Merchant
   */
  async resolveLencoMerchant(params: { merchantId: string }): Promise<ResolvedLencoMerchant> {
    return this.http.post<ResolvedLencoMerchant>('/banks/resolve/lenco-merchant', params);
  }
}
