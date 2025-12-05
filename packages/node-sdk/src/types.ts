// Types for API responses and requests

export type Environment = 'production' | 'sandbox';

export interface LencoConfig {
  apiKey: string;
  environment?: Environment;
  timeout?: number;
  maxRetries?: number;
  debug?: boolean;
}

// API Response wrapper
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// Error response
export interface ApiError {
  status: false;
  message: string;
  errorCode: string;
}

// Account types
export interface Account {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  bankCode: string;
  currency: string;
  type: 'current' | 'savings' | 'virtual';
  status: 'active' | 'inactive' | 'blocked';
  createdAt: string;
  updatedAt: string;
}

export interface AccountBalance {
  accountId: string;
  currency: string;
  availableBalance: number;
  ledgerBalance: number;
}

// Bank types
export interface Bank {
  id: string;
  name: string;
  code: string;
  country: string;
  type: 'bank' | 'mobile-money';
  logo?: string;
}

// Recipient types
export type RecipientType = 'bank-account' | 'mobile-money' | 'lenco-money' | 'lenco-merchant';

export interface Recipient {
  id: string;
  name: string;
  type: RecipientType;
  accountNumber?: string;
  bankId?: string;
  bankName?: string;
  phone?: string;
  operator?: MobileMoneyOperator;
  country?: string;
  createdAt: string;
}

// Transfer types
export type TransferStatus = 'pending' | 'processing' | 'successful' | 'failed' | 'reversed';
export type TransferType = 'bank-account' | 'mobile-money' | 'lenco-money' | 'lenco-merchant' | 'account';
export type MobileMoneyOperator = 'airtel' | 'mtn' | 'zamtel' | 'tnm';

export interface Transfer {
  id: string;
  reference: string;
  accountId: string;
  type: TransferType;
  amount: number;
  fee: number;
  currency: string;
  status: TransferStatus;
  narration?: string;
  recipient: Recipient;
  createdAt: string;
  updatedAt: string;
}

export interface TransferToBankAccountParams {
  accountId: string;
  accountNumber: string;
  bankId: string;
  amount: number;
  reference: string;
  narration?: string;
}

export interface TransferToMobileMoneyParams {
  accountId: string;
  phone: string;
  operator: MobileMoneyOperator;
  country: string;
  amount: number;
  reference: string;
  narration?: string;
}

export interface TransferToLencoMoneyParams {
  accountId: string;
  phone: string;
  amount: number;
  reference: string;
  narration?: string;
}

export interface TransferToLencoMerchantParams {
  accountId: string;
  merchantId: string;
  amount: number;
  reference: string;
  narration?: string;
}

export interface TransferToAccountParams {
  accountId: string;
  recipientId: string;
  amount: number;
  reference: string;
  narration?: string;
}

export interface ListTransfersParams {
  page?: number;
  perPage?: number;
  accountId?: string;
  status?: TransferStatus;
  type?: TransferType;
  startDate?: string;
  endDate?: string;
}

// Collection types
export type CollectionStatus = 'pending' | 'processing' | 'successful' | 'failed' | '3ds-auth-required';
export type CollectionType = 'mobile-money' | 'card';

export interface Collection {
  id: string;
  reference: string;
  type: CollectionType;
  amount: number;
  fee: number;
  currency: string;
  status: CollectionStatus;
  customer?: CollectionCustomer;
  paymentDetails?: PaymentDetails;
  meta?: Collection3DSAuthMeta;
  createdAt: string;
  updatedAt: string;
}

export interface CollectionCustomer {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface PaymentDetails {
  operator?: MobileMoneyOperator;
  phone?: string;
  cardBin?: string;
  cardLast4?: string;
  cardBrand?: string;
}

export interface Collection3DSAuthMeta {
  redirectUrl?: string;
}

export interface CollectFromMobileMoneyParams {
  amount: number;
  reference: string;
  phone: string;
  operator: MobileMoneyOperator;
  country: string;
  customer?: CollectionCustomer;
}

export interface CollectFromCardParams {
  amount: number;
  reference: string;
  currency: string;
  encryptedCard: string;
  customer: CollectionCustomer;
  callbackUrl?: string;
}

export interface ListCollectionsParams {
  page?: number;
  perPage?: number;
  status?: CollectionStatus;
  type?: CollectionType;
  startDate?: string;
  endDate?: string;
}

// Settlement types
export type SettlementStatus = 'pending' | 'processing' | 'successful' | 'failed';

export interface Settlement {
  id: string;
  amount: number;
  fee: number;
  currency: string;
  status: SettlementStatus;
  settledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListSettlementsParams {
  page?: number;
  perPage?: number;
  status?: SettlementStatus;
  startDate?: string;
  endDate?: string;
}

// Transaction types
export type TransactionType = 'credit' | 'debit';
export type TransactionCategory = 'transfer' | 'collection' | 'settlement' | 'fee' | 'reversal';

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  fee: number;
  currency: string;
  balanceBefore: number;
  balanceAfter: number;
  reference: string;
  narration?: string;
  createdAt: string;
}

export interface ListTransactionsParams {
  page?: number;
  perPage?: number;
  accountId?: string;
  type?: TransactionType;
  category?: TransactionCategory;
  startDate?: string;
  endDate?: string;
}

// Resolve types
export interface ResolvedBankAccount {
  accountNumber: string;
  accountName: string;
  bankId: string;
  bankName: string;
}

export interface ResolvedMobileMoney {
  phone: string;
  name: string;
  operator: MobileMoneyOperator;
  country: string;
}

export interface ResolvedLencoMoney {
  phone: string;
  name: string;
  email?: string;
}

export interface ResolvedLencoMerchant {
  merchantId: string;
  name: string;
  email?: string;
}

// Encryption
export interface EncryptionKey {
  key: string;
  expiresAt: string;
}

// Webhook
export interface WebhookPayload {
  event: string;
  data: Record<string, unknown>;
  createdAt: string;
}
