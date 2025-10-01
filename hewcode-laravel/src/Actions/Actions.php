<?php

namespace Hewcode\Hewcode\Actions;

use Hewcode\Hewcode\Concerns\InteractsWithActions;
use Hewcode\Hewcode\Concerns\InteractsWithModel;
use Hewcode\Hewcode\Concerns\HasVisibility;
use Hewcode\Hewcode\Concerns\EvaluatesClosures;
use Hewcode\Hewcode\Contracts\Discoverable;
use Hewcode\Hewcode\Contracts\MountsActions;
use Hewcode\Hewcode\Contracts\ResolvesRecord;
use Hewcode\Hewcode\Contracts\WithVisibility;
use function Hewcode\Hewcode\generateComponentHash;

class Actions implements Discoverable, MountsActions, ResolvesRecord, WithVisibility
{
    use InteractsWithModel;
    use InteractsWithActions;
    use HasVisibility;
    use EvaluatesClosures;

    protected ?string $component = null;

    public function __construct(
        /** @var Action[] $actions */
        protected array $actions = []
    ) {
    }

    public static function make(array $actions): static
    {
        return new static($actions);
    }

    public function component(string $component): static
    {
        $this->component = $component;

        return $this;
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
        return collect($this->actions)
            ->filter(fn (Action $action) => $action->isVisible())
            ->mapWithKeys(fn (Action $action) => [
                $action->name => $action->component($this->component)->toData(),
            ])
            ->toArray();
    }

    public function getMountableActions(): array
    {
        return $this->actions;
    }
}
