<?php

declare(strict_types=1);

namespace Lenco\Resources;

use Lenco\HttpClient;

/**
 * Recipients API resource
 */
class Recipients
{
    public function __construct(private readonly HttpClient $http)
    {
    }

    /**
     * List all recipients
     *
     * @return array<int, array<string, mixed>>
     */
    public function list(?int $page = null): array
    {
        return $this->http->get('/transfer-recipients', ['page' => $page]);
    }

    /**
     * Get recipient by ID
     *
     * @return array<string, mixed>
     */
    public function get(string $id): array
    {
        return $this->http->get("/transfer-recipients/{$id}");
    }

    /**
     * Create a bank account recipient
     *
     * @return array<string, mixed>
     */
    public function createBankAccount(string $name, string $accountNumber, string $bankId): array
    {
        return $this->http->post('/transfer-recipients/bank-account', [
            'name' => $name,
            'accountNumber' => $accountNumber,
            'bankId' => $bankId,
        ]);
    }

    /**
     * Create a mobile money recipient
     *
     * @return array<string, mixed>
     */
    public function createMobileMoney(string $name, string $phone, string $operator, string $country): array
    {
        return $this->http->post('/transfer-recipients/mobile-money', [
            'name' => $name,
            'phone' => $phone,
            'operator' => $operator,
            'country' => $country,
        ]);
    }

    /**
     * Create a Lenco Money recipient
     *
     * @return array<string, mixed>
     */
    public function createLencoMoney(string $name, string $phone): array
    {
        return $this->http->post('/transfer-recipients/lenco-money', [
            'name' => $name,
            'phone' => $phone,
        ]);
    }

    /**
     * Create a Lenco Merchant recipient
     *
     * @return array<string, mixed>
     */
    public function createLencoMerchant(string $merchantId): array
    {
        return $this->http->post('/transfer-recipients/lenco-merchant', [
            'merchantId' => $merchantId,
        ]);
    }
}
