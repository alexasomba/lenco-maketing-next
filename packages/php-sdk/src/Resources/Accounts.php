<?php

declare(strict_types=1);

namespace Lenco\Resources;

use Lenco\HttpClient;

/**
 * Accounts API resource
 */
class Accounts
{
    public function __construct(private readonly HttpClient $http)
    {
    }

    /**
     * List all accounts
     *
     * @return array<int, array<string, mixed>>
     */
    public function list(?int $page = null): array
    {
        return $this->http->get('/accounts', ['page' => $page]);
    }

    /**
     * Get account by ID
     *
     * @return array<string, mixed>
     */
    public function get(string $id): array
    {
        return $this->http->get("/accounts/{$id}");
    }

    /**
     * Get account balance
     *
     * @return array<string, mixed>
     */
    public function getBalance(string $id): array
    {
        return $this->http->get("/accounts/{$id}/balance");
    }
}
