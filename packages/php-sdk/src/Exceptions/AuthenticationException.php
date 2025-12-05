<?php

declare(strict_types=1);

namespace Lenco\Exceptions;

class AuthenticationException extends LencoException
{
    public function __construct(string $message = 'Invalid API key or unauthorized request')
    {
        parent::__construct($message, 401, 'AUTHENTICATION_ERROR');
    }
}
