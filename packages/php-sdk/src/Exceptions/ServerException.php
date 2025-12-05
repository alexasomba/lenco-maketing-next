<?php

declare(strict_types=1);

namespace Lenco\Exceptions;

class ServerException extends LencoException
{
    public function __construct(string $message = 'Internal server error')
    {
        parent::__construct($message, 500, 'SERVER_ERROR');
    }
}
