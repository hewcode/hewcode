<?php

namespace Hewcode\Hewcode\Concerns;

use Hewcode\Hewcode\Actions\Action;
use Hewcode\Hewcode\Actions\BulkAction;
use InvalidArgumentException;

trait InteractsWithActions
{
    public function mountAction(string $name, array $args): mixed
    {
        // Check regular actions first
        /** @var Action|null $action */
        $action = collect($this->getMountableActions())
            ->first(fn (Action $action) => $action->name === $name);

        if (! $action) {
            throw new InvalidArgumentException("Action [$name] not found.");
        }

        // For regular actions, set the record if available
        if ($this->record) {
            $action->record($this->record);
        }

        if (! $action->isVisible()) {
            abort(403, 'Unauthorized.');
        }

        return $action->execute($args);
    }
}
