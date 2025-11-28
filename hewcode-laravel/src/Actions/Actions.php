<?php

namespace Hewcode\Hewcode\Actions;

use Hewcode\Hewcode\Concerns\InteractsWithActions;
use Hewcode\Hewcode\Concerns\InteractsWithModel;
use Hewcode\Hewcode\Concerns\RequiresVisibility;
use Hewcode\Hewcode\Contracts\MountsActions;
use Hewcode\Hewcode\Contracts\ResolvesRecord;
use Hewcode\Hewcode\Contracts\WithVisibility;
use Hewcode\Hewcode\Support\Container;

class Actions extends Container implements MountsActions, ResolvesRecord, WithVisibility
{
    use InteractsWithModel;
    use InteractsWithActions;
    use RequiresVisibility;

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

        if (method_exists($this, 'getModel') && $this->getModel() !== null) {
            $parameters['model'] = $this->getModel();
        }

        return $parameters;
    }

    public function toData(): array
    {
        return array_merge(parent::toData(), [
            'actions' => collect($this->actions)
                ->filter(fn (Action $action) => $action
                    ->model($this->model)
                    ->record($this->record)
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
