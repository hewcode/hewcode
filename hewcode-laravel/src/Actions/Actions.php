<?php

namespace Hewcode\Hewcode\Actions;

use Hewcode\Hewcode\Concerns;
use Hewcode\Hewcode\Contracts;
use Hewcode\Hewcode\Support\Container;

class Actions extends Container implements Contracts\MountsActions, Contracts\ResolvesRecord, Contracts\HasVisibility
{
    use Concerns\InteractsWithModel;
    use Concerns\InteractsWithActions;
    use Concerns\RequiresVisibility;

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
