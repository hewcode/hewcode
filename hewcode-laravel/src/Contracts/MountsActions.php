<?php

namespace Hewcode\Hewcode\Contracts;

interface MountsActions
{
    function getMountableActions(): array;

    public function mountAction(string $name, array $args): mixed;
}
