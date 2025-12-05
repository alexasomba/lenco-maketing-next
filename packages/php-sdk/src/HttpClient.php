<?php

declare(strict_types=1);

namespace Lenco;

use GuzzleHttp\Client as GuzzleClient;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Exception\RequestException;
use Lenco\Exceptions\AuthenticationException;
use Lenco\Exceptions\LencoException;
use Lenco\Exceptions\NetworkException;
use Lenco\Exceptions\NotFoundException;
use Lenco\Exceptions\RateLimitException;
use Lenco\Exceptions\ServerException;
use Lenco\Exceptions\ValidationException;

/**
 * HTTP client for Lenco API
 */
class HttpClient
{
    private const BASE_URLS = [
        'production' => 'https://api.lenco.co/access/v2',
        'sandbox' => 'https://sandbox.lenco.co/access/v2',
    ];

    private readonly GuzzleClient $client;
    private readonly int $maxRetries;
    private readonly bool $debug;

    public function __construct(
        string $apiKey,
        string $environment = 'production',
        int $timeout = 30,
        int $maxRetries = 3,
        bool $debug = false,
    ) {
        $baseUrl = self::BASE_URLS[$environment] ?? self::BASE_URLS['production'];

        $this->client = new GuzzleClient([
            'base_uri' => $baseUrl,
            'timeout' => $timeout,
            'headers' => [
                'Authorization' => "Bearer {$apiKey}",
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
                'User-Agent' => 'lenco-php/2.0.0',
            ],
        ]);

        $this->maxRetries = $maxRetries;
        $this->debug = $debug;
    }

    private function log(string $message, mixed $data = null): void
    {
        if ($this->debug) {
            echo "[Lenco SDK] {$message}";
            if ($data !== null) {
                echo ' ' . json_encode($data);
            }
            echo PHP_EOL;
        }
    }

    private function shouldRetry(int $statusCode, int $attempt): bool
    {
        if ($attempt >= $this->maxRetries) {
            return false;
        }
        return $statusCode >= 500 || $statusCode === 429;
    }

    private function getRetryDelay(int $attempt): int
    {
        return min((int) pow(2, $attempt), 10);
    }

    /**
     * @param array<string, mixed>|null $body
     * @param array<string, mixed>|null $query
     * @return mixed
     * @throws LencoException
     */
    public function request(string $method, string $path, ?array $body = null, ?array $query = null): mixed
    {
        $attempt = 0;

        // Filter out null values from query
        if ($query !== null) {
            $query = array_filter($query, fn($v) => $v !== null);
        }

        while (true) {
            try {
                $this->log("{$method} {$path}", $body);

                $options = [];
                if ($body !== null) {
                    $options['json'] = $body;
                }
                if ($query !== null && count($query) > 0) {
                    $options['query'] = $query;
                }

                $response = $this->client->request($method, $path, $options);
                $statusCode = $response->getStatusCode();

                $this->log("Response {$statusCode}");

                $data = json_decode((string) $response->getBody(), true);

                return $data['data'] ?? null;

            } catch (RequestException $e) {
                $response = $e->getResponse();
                
                if ($response === null) {
                    throw new NetworkException($e->getMessage());
                }

                $statusCode = $response->getStatusCode();
                
                if ($this->shouldRetry($statusCode, $attempt)) {
                    $delay = $this->getRetryDelay($attempt);
                    $this->log("Retrying in {$delay}s (attempt " . ($attempt + 1) . "/{$this->maxRetries})");
                    sleep($delay);
                    $attempt++;
                    continue;
                }

                $this->handleError($response);

            } catch (GuzzleException $e) {
                throw new NetworkException($e->getMessage());
            }
        }
    }

    /**
     * @throws LencoException
     */
    private function handleError(\Psr\Http\Message\ResponseInterface $response): never
    {
        $statusCode = $response->getStatusCode();
        $data = json_decode((string) $response->getBody(), true);
        $message = $data['message'] ?? 'An error occurred';
        $errorCode = $data['errorCode'] ?? 'UNKNOWN';

        match ($statusCode) {
            400 => throw new ValidationException($message, $errorCode, $data),
            401 => throw new AuthenticationException($message),
            404 => throw new NotFoundException($message),
            429 => throw new RateLimitException($message, (int) ($response->getHeader('Retry-After')[0] ?? 0)),
            500, 502, 503, 504 => throw new ServerException($message),
            default => throw new LencoException($message, $statusCode, $errorCode, $data),
        };
    }

    /**
     * @param array<string, mixed>|null $query
     * @return mixed
     */
    public function get(string $path, ?array $query = null): mixed
    {
        return $this->request('GET', $path, null, $query);
    }

    /**
     * @param array<string, mixed>|null $body
     * @return mixed
     */
    public function post(string $path, ?array $body = null): mixed
    {
        return $this->request('POST', $path, $body);
    }
}
