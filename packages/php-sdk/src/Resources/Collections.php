<?php

declare(strict_types=1);

namespace Lenco\Resources;

use Lenco\HttpClient;

/**
 * Collections API resource
 */
class Collections
{
    public function __construct(private readonly HttpClient $http)
    {
    }

    /**
     * List all collections
     *
     * @param array<string, mixed>|null $params
     * @return array<int, array<string, mixed>>
     */
    public function list(?array $params = null): array
    {
        return $this->http->get('/collections', $params);
    }

    /**
     * Get collection by ID
     *
     * @return array<string, mixed>
     */
    public function get(string $id): array
    {
        return $this->http->get("/collections/{$id}");
    }

    /**
     * Get collection by reference
     *
     * @return array<string, mixed>
     */
    public function getByReference(string $reference): array
    {
        return $this->http->get("/collections/status/{$reference}");
    }

    /**
     * Collect from mobile money
     *
     * @param array{
     *     amount: int,
     *     reference: string,
     *     phone: string,
     *     operator: string,
     *     country: string,
     *     customer?: array{email?: string, firstName?: string, lastName?: string, phone?: string}
     * } $params
     * @return array<string, mixed>
     */
    public function fromMobileMoney(array $params): array
    {
        return $this->http->post('/collections/mobile-money', $params);
    }

    /**
     * Collect from card
     *
     * @param array{
     *     amount: int,
     *     reference: string,
     *     currency: string,
     *     encryptedCard: string,
     *     customer: array{email?: string, firstName?: string, lastName?: string, phone?: string},
     *     callbackUrl?: string
     * } $params
     * @return array<string, mixed>
     */
    public function fromCard(array $params): array
    {
        return $this->http->post('/collections/card', $params);
    }
}
