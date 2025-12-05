# lenco-sdk

Official Lenco API SDK for Python

## Installation

```bash
pip install lenco-sdk
# or
poetry add lenco-sdk
```

## Quick Start

```python
from lenco import Lenco

client = Lenco(
    api_key="your-api-key",
    environment="production"  # or "sandbox"
)

# Get accounts
accounts = client.accounts.list()

# Transfer to bank account
transfer = client.transfers.to_bank_account(
    account_id="your-account-uuid",
    account_number="0123456789",
    bank_id="bank-uuid",
    amount=10000,
    reference="payment-001",
    narration="Payment for services"
)

# Collect via mobile money
collection = client.collections.from_mobile_money(
    amount=5000,
    reference="order-123",
    phone="0971234567",
    operator="airtel",
    country="zm"
)
```

## Async Support

```python
import asyncio
from lenco import AsyncLenco

async def main():
    client = AsyncLenco(api_key="your-api-key")
    
    # Concurrent requests
    accounts, banks = await asyncio.gather(
        client.accounts.list(),
        client.banks.list(country="ng")
    )
    
    print(f"Found {len(accounts)} accounts")
    print(f"Found {len(banks)} banks")

asyncio.run(main())
```

## Features

- ✅ Full type hints support
- ✅ Sync and async clients
- ✅ Accounts, Banks, Transfers, Collections, Settlements, Transactions APIs
- ✅ Webhook signature verification
- ✅ Automatic retries with exponential backoff
- ✅ Pydantic models for request/response validation

## Documentation

Full documentation available at [docs.lenco.co](https://docs.lenco.co/docs/v2/sdks#python)

## License

MIT
