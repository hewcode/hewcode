<?php

namespace Hewcode\Hewcode\Contracts;

use Closure;

interface WithVisibility
{
    public function visible(bool|Closure $visible): static;

    public function isVisible(): bool;
}