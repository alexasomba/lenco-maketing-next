<?php

declare(strict_types=1);

namespace Lenco\Resources;

use Lenco\HttpClient;

/**
 * Transactions API resource
 */
class Transactions
{
    public function __construct(private readonly HttpClient $http)
    {
    }

    /**
     * List all transactions
     *
     * @param array<string, mixed>|null $params
     * @return array<int, array<string, mixed>>
     */
    public function list(?array $params = null): array
    {
        return $this->http->get('/transactions', $params);
    }

    /**
     * Get transaction by ID
     *
     * @return array<string, mixed>
     */
    public function get(string $id): array
    {
        return $this->http->get("/transactions/{$id}");
    }
}
