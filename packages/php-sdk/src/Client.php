<?php

declare(strict_types=1);

namespace Lenco;

use Lenco\Resources\Accounts;
use Lenco\Resources\Banks;
use Lenco\Resources\Collections;
use Lenco\Resources\Encryption;
use Lenco\Resources\Recipients;
use Lenco\Resources\Settlements;
use Lenco\Resources\Transactions;
use Lenco\Resources\Transfers;

/**
 * Lenco API Client
 */
class Client
{
    public readonly Accounts $accounts;
    public readonly Banks $banks;
    public readonly Recipients $recipients;
    public readonly Transfers $transfers;
    public readonly Collections $collections;
    public readonly Settlements $settlements;
    public readonly Transactions $transactions;
    public readonly Encryption $encryption;

    private readonly HttpClient $http;

    /**
     * @param array{
     *     api_key: string,
     *     environment?: 'production'|'sandbox',
     *     timeout?: int,
     *     max_retries?: int,
     *     debug?: bool
     * } $config
     */
    public function __construct(array $config)
    {
        if (empty($config['api_key'])) {
            throw new \InvalidArgumentException('API key is required');
        }

        $this->http = new HttpClient(
            apiKey: $config['api_key'],
            environment: $config['environment'] ?? 'production',
            timeout: $config['timeout'] ?? 30,
            maxRetries: $config['max_retries'] ?? 3,
            debug: $config['debug'] ?? false,
        );

        $this->accounts = new Accounts($this->http);
        $this->banks = new Banks($this->http);
        $this->recipients = new Recipients($this->http);
        $this->transfers = new Transfers($this->http);
        $this->collections = new Collections($this->http);
        $this->settlements = new Settlements($this->http);
        $this->transactions = new Transactions($this->http);
        $this->encryption = new Encryption($this->http);
    }

    /**
     * Verify webhook signature
     */
    public function verifyWebhook(string $payload, string $signature, string $secret): bool
    {
        return Webhook::verify($payload, $signature, $secret);
    }
}
