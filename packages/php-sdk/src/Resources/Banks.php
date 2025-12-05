<?php

declare(strict_types=1);

namespace Lenco\Resources;

use Lenco\HttpClient;

/**
 * Banks API resource
 */
class Banks
{
    public function __construct(private readonly HttpClient $http)
    {
    }

    /**
     * List all banks
     *
     * @return array<int, array<string, mixed>>
     */
    public function list(?string $country = null): array
    {
        return $this->http->get('/banks', ['country' => $country]);
    }

    /**
     * Resolve a bank account
     *
     * @return array<string, mixed>
     */
    public function resolveBankAccount(string $accountNumber, string $bankId): array
    {
        return $this->http->post('/banks/resolve', [
            'accountNumber' => $accountNumber,
            'bankId' => $bankId,
        ]);
    }

    /**
     * Resolve a mobile money account
     *
     * @return array<string, mixed>
     */
    public function resolveMobileMoney(string $phone, string $operator, string $country): array
    {
        return $this->http->post('/banks/resolve/mobile-money', [
            'phone' => $phone,
            'operator' => $operator,
            'country' => $country,
        ]);
    }

    /**
     * Resolve a Lenco Money account
     *
     * @return array<string, mixed>
     */
    public function resolveLencoMoney(string $phone): array
    {
        return $this->http->post('/banks/resolve/lenco-money', [
            'phone' => $phone,
        ]);
    }

    /**
     * Resolve a Lenco Merchant
     *
     * @return array<string, mixed>
     */
    public function resolveLencoMerchant(string $merchantId): array
    {
        return $this->http->post('/banks/resolve/lenco-merchant', [
            'merchantId' => $merchantId,
        ]);
    }
}
