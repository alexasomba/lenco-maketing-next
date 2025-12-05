# lenco-node

Node.js SDK for Lenco API - Payments, Transfers, Collections

## Installation

```bash
npm install lenco-node
# or
yarn add lenco-node
# or
pnpm add lenco-node
```

## Quick Start

```typescript
import { Lenco } from 'lenco-node';

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

- [x] Full TypeScript support
- [x] Accounts, Banks, Transfers, Collections, Settlements, Transactions APIs
- [x] Webhook signature verification
- [x] Automatic retries with exponential backoff
- [x] Request/response logging
- [x] ESM and CommonJS support

## Documentation

Full API documentation available at [docs.lenco.co](https://docs.lenco.co)

## Author

Alexander Asomba ([@alexasomba](https://github.com/alexasomba)) · [𝕏 @alexasomba](https://x.com/alexasomba)

## License

MIT
