# lenco/lenco-php

Official Lenco API SDK for PHP

## Installation

```bash
composer require lenco/lenco-php
```

## Quick Start

```php
<?php

use Lenco\Client;

$lenco = new Client([
    'api_key' => getenv('LENCO_API_KEY'),
    'environment' => 'production', // or 'sandbox'
]);

// Get accounts
$accounts = $lenco->accounts->list();

// Transfer to bank account
$transfer = $lenco->transfers->toBankAccount([
    'accountId' => 'your-account-uuid',
    'accountNumber' => '0123456789',
    'bankId' => 'bank-uuid',
    'amount' => 10000,
    'reference' => 'payment-001',
    'narration' => 'Payment for services',
]);

// Collect via mobile money
$collection = $lenco->collections->fromMobileMoney([
    'amount' => 5000,
    'reference' => 'order-123',
    'phone' => '0971234567',
    'operator' => 'airtel',
    'country' => 'zm',
]);
```

## Laravel Integration

```php
// config/services.php
'lenco' => [
    'key' => env('LENCO_API_KEY'),
    'environment' => env('LENCO_ENVIRONMENT', 'production'),
],

// app/Providers/AppServiceProvider.php
use Lenco\Client;

public function register()
{
    $this->app->singleton(Client::class, function ($app) {
        return new Client([
            'api_key' => config('services.lenco.key'),
            'environment' => config('services.lenco.environment'),
        ]);
    });
}
```

## Features

- ✅ Full PHP 8.1+ support
- ✅ Accounts, Banks, Transfers, Collections, Settlements, Transactions APIs
- ✅ Webhook signature verification
- ✅ Automatic retries with exponential backoff
- ✅ Laravel service provider included

## Documentation

Full documentation available at [docs.lenco.co](https://docs.lenco.co/docs/v2/sdks#php)

## License

MIT
