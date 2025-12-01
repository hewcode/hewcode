<?php

namespace Hewcode\Hewcode\Actions;

use Hewcode\Hewcode\Concerns;
use Hewcode\Hewcode\Contracts;
use Hewcode\Hewcode\Support\Container;

class Actions extends Container implements Contracts\MountsActions, Contracts\ResolvesRecords, Contracts\HasVisibility, Contracts\HasRecord
{
    use Concerns\ResolvesRecords;
    use Concerns\InteractsWithActions;
    use Concerns\RequiresVisibility;
    use Concerns\HasRecord;

    public function __construct(
        /** @var Action[] $actions */
        protected array $actions = []
    ) {
    }

    public static function make(array $actions): static
    {
        return new static($actions);
    }

    protected function getEvaluationParameters(): array
    {
        $parameters = [];

        if ($model = $this->getModel()) {
            $parameters['model'] = $model;
        }

        return $parameters;
    }

    public function toData(): array
    {
        return array_merge(parent::toData(), [
            'actions' => collect($this->actions)
                ->filter(fn (Action $action) => $action
                    ->model($this->getModel())
                    ->record($this->getRecord())
                    ->isVisible()
                )
                ->mapWithKeys(fn (Action $action) => [
                    $action->name => $action->parent($this)->toData(),
                ])
                ->toArray(),
        ]);
    }

    public function getMountableActions(): array
    {
        return $this->actions;
    }
}
