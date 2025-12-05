<?php

declare(strict_types=1);

namespace Lenco\Exceptions;

class NotFoundException extends LencoException
{
    public function __construct(string $message = 'Resource not found')
    {
        parent::__construct($message, 404, 'NOT_FOUND');
    }
}
