<?php

declare(strict_types=1);

namespace Lenco\Exceptions;

/**
 * Base exception for Lenco SDK errors
 */
class LencoException extends \Exception
{
    /**
     * @param array<string, mixed>|null $response
     */
    public function __construct(
        string $message,
        public readonly int $statusCode = 0,
        public readonly string $errorCode = 'UNKNOWN_ERROR',
        public readonly ?array $response = null,
    ) {
        parent::__construct($message);
    }
}
