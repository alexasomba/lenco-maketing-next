import type { LencoConfig } from './types';
import { HttpClient } from './http';
import {
  AccountsResource,
  BanksResource,
  RecipientsResource,
  TransfersResource,
  CollectionsResource,
  SettlementsResource,
  TransactionsResource,
  EncryptionResource,
  WebhooksResource,
} from './resources';

export class Lenco {
  public readonly accounts: AccountsResource;
  public readonly banks: BanksResource;
  public readonly recipients: RecipientsResource;
  public readonly transfers: TransfersResource;
  public readonly collections: CollectionsResource;
  public readonly settlements: SettlementsResource;
  public readonly transactions: TransactionsResource;
  public readonly encryption: EncryptionResource;
  public readonly webhooks: WebhooksResource;

  constructor(config: LencoConfig) {
    if (!config.apiKey) {
      throw new Error('API key is required');
    }

    const http = new HttpClient(config);

    this.accounts = new AccountsResource(http);
    this.banks = new BanksResource(http);
    this.recipients = new RecipientsResource(http);
    this.transfers = new TransfersResource(http);
    this.collections = new CollectionsResource(http);
    this.settlements = new SettlementsResource(http);
    this.transactions = new TransactionsResource(http);
    this.encryption = new EncryptionResource(http);
    this.webhooks = new WebhooksResource();
  }
}

// Export types
export * from './types';

// Export errors
export * from './errors';

// Default export
export default Lenco;
