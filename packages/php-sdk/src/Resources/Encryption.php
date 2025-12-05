<?php

declare(strict_types=1);

namespace Lenco\Resources;

use Lenco\HttpClient;

/**
 * Encryption API resource
 */
class Encryption
{
    public function __construct(private readonly HttpClient $http)
    {
    }

    /**
     * Get encryption key for card data
     *
     * @return array<string, mixed>
     */
    public function getKey(): array
    {
        return $this->http->get('/collections/encryption-key');
    }
}
