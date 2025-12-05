<?php

declare(strict_types=1);

namespace Lenco\Exceptions;

class RateLimitException extends LencoException
{
    public function __construct(string $message = 'Rate limit exceeded', public readonly int $retryAfter = 0)
    {
        parent::__construct($message, 429, 'RATE_LIMIT');
    }
}
