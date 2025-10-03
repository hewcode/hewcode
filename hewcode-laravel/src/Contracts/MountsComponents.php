<?php

namespace Hewcode\Hewcode\Contracts;

use Hewcode\Hewcode\Support\Component;

interface MountsComponents
{
    public function getComponent(string $type, string $name): ?Component;
}
