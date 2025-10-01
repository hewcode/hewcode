<?php

namespace Hewcode\Hewcode\Contracts;

use Illuminate\Support\Collection;

interface ResolvesRecord
{
    public function resolveRecord(int|string $id): static;

    public function resolveRecords(array $ids): Collection;

    public function model(object $model): static;
}
