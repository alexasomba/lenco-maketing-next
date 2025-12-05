<?php

declare(strict_types=1);

namespace Lenco\Resources;

use Lenco\HttpClient;

/**
 * Settlements API resource
 */
class Settlements
{
    public function __construct(private readonly HttpClient $http)
    {
    }

    /**
     * List all settlements
     *
     * @param array<string, mixed>|null $params
     * @return array<int, array<string, mixed>>
     */
    public function list(?array $params = null): array
    {
        return $this->http->get('/settlements', $params);
    }

    /**
     * Get settlement by ID
     *
     * @return array<string, mixed>
     */
    public function get(string $id): array
    {
        return $this->http->get("/settlements/{$id}");
    }
}
