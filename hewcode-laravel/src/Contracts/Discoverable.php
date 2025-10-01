<?php

namespace Hewcode\Hewcode\Contracts;

interface Discoverable
{
    public function component(string $component): static;

    public function toData(): array;
}
