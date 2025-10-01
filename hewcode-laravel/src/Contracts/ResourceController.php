<?php

namespace Hewcode\Hewcode\Contracts;

interface ResourceController
{
    public function canAccess(?string $method = '__invoke'): bool;
}
