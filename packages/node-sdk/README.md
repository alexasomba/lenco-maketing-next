# @lenco/sdk

Official Lenco API SDK for Node.js

## Installation

```bash
npm install @lenco/sdk
# or
yarn add @lenco/sdk
# or
pnpm add @lenco/sdk
```

## Quick Start

```typescript
import { Lenco } from '@lenco/sdk';

const lenco = new Lenco({
  apiKey: process.env.LENCO_API_KEY,
  environment: 'production', // or 'sandbox'
});

// Get accounts
const accounts = await lenco.accounts.list();

// Transfer to bank account
const transfer = await lenco.transfers.toBankAccount({
  accountId: 'your-account-uuid',
  accountNumber: '0123456789',
  bankId: 'bank-uuid',
  amount: 10000,
  reference: 'payment-001',
  narration: 'Payment for services',
});

// Collect via mobile money
const collection = await lenco.collections.fromMobileMoney({
  amount: 5000,
  reference: 'order-123',
  phone: '0971234567',
  operator: 'airtel',
  country: 'zm',
});
```

## Features

- ✅ Full TypeScript support
- ✅ Accounts, Banks, Transfers, Collections, Settlements, Transactions APIs
- ✅ Webhook signature verification
- ✅ Automatic retries with exponential backoff
- ✅ Request/response logging
- ✅ ESM and CommonJS support

## Documentation

Full documentation available at [docs.lenco.co](https://docs.lenco.co/docs/v2/sdks#nodejs)

## License

MIT
