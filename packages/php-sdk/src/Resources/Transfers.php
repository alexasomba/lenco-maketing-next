<?php

declare(strict_types=1);

namespace Lenco\Resources;

use Lenco\HttpClient;

/**
 * Transfers API resource
 */
class Transfers
{
    public function __construct(private readonly HttpClient $http)
    {
    }

    /**
     * List all transfers
     *
     * @param array<string, mixed>|null $params
     * @return array<int, array<string, mixed>>
     */
    public function list(?array $params = null): array
    {
        return $this->http->get('/transfers', $params);
    }

    /**
     * Get transfer by ID
     *
     * @return array<string, mixed>
     */
    public function get(string $id): array
    {
        return $this->http->get("/transfers/{$id}");
    }

    /**
     * Get transfer by reference
     *
     * @return array<string, mixed>
     */
    public function getByReference(string $reference): array
    {
        return $this->http->get("/transfers/reference/{$reference}");
    }

    /**
     * Transfer to a bank account
     *
     * @param array{
     *     accountId: string,
     *     accountNumber: string,
     *     bankId: string,
     *     amount: int,
     *     reference: string,
     *     narration?: string
     * } $params
     * @return array<string, mixed>
     */
    public function toBankAccount(array $params): array
    {
        return $this->http->post('/transfers/bank-account', $params);
    }

    /**
     * Transfer to mobile money
     *
     * @param array{
     *     accountId: string,
     *     phone: string,
     *     operator: string,
     *     country: string,
     *     amount: int,
     *     reference: string,
     *     narration?: string
     * } $params
     * @return array<string, mixed>
     */
    public function toMobileMoney(array $params): array
    {
        return $this->http->post('/transfers/mobile-money', $params);
    }

    /**
     * Transfer to Lenco Money
     *
     * @param array{
     *     accountId: string,
     *     phone: string,
     *     amount: int,
     *     reference: string,
     *     narration?: string
     * } $params
     * @return array<string, mixed>
     */
    public function toLencoMoney(array $params): array
    {
        return $this->http->post('/transfers/lenco-money', $params);
    }

    /**
     * Transfer to Lenco Merchant
     *
     * @param array{
     *     accountId: string,
     *     merchantId: string,
     *     amount: int,
     *     reference: string,
     *     narration?: string
     * } $params
     * @return array<string, mixed>
     */
    public function toLencoMerchant(array $params): array
    {
        return $this->http->post('/transfers/lenco-merchant', $params);
    }

    /**
     * Transfer to a saved recipient
     *
     * @param array{
     *     accountId: string,
     *     recipientId: string,
     *     amount: int,
     *     reference: string,
     *     narration?: string
     * } $params
     * @return array<string, mixed>
     */
    public function toRecipient(array $params): array
    {
        return $this->http->post('/transfers/account', $params);
    }
}
