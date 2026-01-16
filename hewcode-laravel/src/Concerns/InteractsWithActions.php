<?php

namespace Hewcode\Hewcode\Concerns;

use Hewcode\Hewcode\Actions\Action;
use Hewcode\Hewcode\Contracts\MountsActions;
use Hewcode\Hewcode\Contracts\MountsComponents;
use Hewcode\Hewcode\Hewcode;
use Hewcode\Hewcode\Support\Component;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Support\Collection;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response;

trait InteractsWithActions
{
    public function mountAction(string $name, array $args): mixed
    {
        $actions = $this->filterMountableActions($this->getMountableActions(), $this);

        // Check regular actions first
        /** @var Action|null $action */
        $action = $actions->first(fn (Action $action) => $action->name === $name);

        if (! $action && str_contains($name, '.')) {
            $lastPart = null;
            $lastComponent = null;

            foreach (explode('.', $name) as $part) {
                $currentPart = ($lastPart ? $lastPart . '.' : '') . $part;

                if (! $lastComponent) {
                    $lastComponent = $actions->first(fn (Action $action) => $action->name === $part);
                } else {
                    if ($lastComponent instanceof MountsComponents) {
                        $component = $lastComponent->getComponent($part, $part);

                        if ($component) {
                            $lastComponent = $component;
                            $lastPart = $currentPart;
                            continue;
                        }
                    }

                    if ($lastComponent instanceof MountsActions) {
                        $lastComponent = $this->filterMountableActions($lastComponent->getMountableActions(), $lastComponent)
                            ->first(fn (Action $action) => $action->name === $part);
                    }
                }

                $lastPart = $currentPart;
            }

            if ($lastComponent instanceof Action) {
                $action = $lastComponent;
            }
        }

        if (! $action instanceof Action) {
            throw new InvalidArgumentException("Action [$name] not found.");
        }

        if (! $action->isVisible()) {
            abort(403, 'Unauthorized.');
        }

        $response = $action->execute($args);

        if ($response instanceof Responsable) {
            return $response->toResponse(request());
        }

        if ($response instanceof Response) {
            return $response;
        }

        return Hewcode::response(data: $response ?? []);
    }

    private function filterMountableActions(iterable $actions, Component $parent): Collection
    {
        return collect($actions)
            ->filter(function (Action $action) use ($parent) {
                if ($this instanceof \Hewcode\Hewcode\Contracts\HasRecord) {
                    $action->record($this->getRecord());
                }

                return $action
                    ->parent($action->parent ?? $parent)
                    ->model($this->getModel())
                    ->isVisible();
            });
    }
}
