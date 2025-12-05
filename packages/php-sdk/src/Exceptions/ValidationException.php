<?php

declare(strict_types=1);

namespace Lenco\Exceptions;

class ValidationException extends LencoException
{
    /**
     * @param array<string, mixed>|null $response
     */
    public function __construct(string $message, string $errorCode = 'VALIDATION_ERROR', ?array $response = null)
    {
        parent::__construct($message, 400, $errorCode, $response);
    }
}
