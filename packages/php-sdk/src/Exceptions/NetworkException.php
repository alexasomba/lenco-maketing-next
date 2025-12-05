<?php

declare(strict_types=1);

namespace Lenco\Exceptions;

class NetworkException extends LencoException
{
    public function __construct(string $message = 'Network error occurred')
    {
        parent::__construct($message, 0, 'NETWORK_ERROR');
    }
}
