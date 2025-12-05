<?php

declare(strict_types=1);

namespace Lenco;

/**
 * Webhook verification utilities
 */
class Webhook
{
    /**
     * Verify a webhook signature
     *
     * @param string|array<string, mixed> $payload The raw request body or parsed array
     * @param string $signature The X-Lenco-Signature header value
     * @param string $secret Your API key (used as the signing secret)
     * @return bool True if the signature is valid
     */
    public static function verify(string|array $payload, string $signature, string $secret): bool
    {
        if (is_array($payload)) {
            $payload = json_encode($payload, JSON_UNESCAPED_SLASHES);
        }

        $expectedSignature = hash_hmac('sha512', $payload, $secret);

        return hash_equals($expectedSignature, $signature);
    }

    /**
     * Parse and verify a webhook
     *
     * @param string $rawBody The raw request body
     * @param string $signature The X-Lenco-Signature header value
     * @param string $secret Your API key
     * @return array<string, mixed>|null The parsed webhook data or null if verification fails
     */
    public static function parseAndVerify(string $rawBody, string $signature, string $secret): ?array
    {
        if (!self::verify($rawBody, $signature, $secret)) {
            return null;
        }

        try {
            return json_decode($rawBody, true, 512, JSON_THROW_ON_ERROR);
        } catch (\JsonException) {
            return null;
        }
    }
}
