<?php

namespace Hewcode\Hewcode\Widgets;

use Hewcode\Hewcode\Concerns;
use Hewcode\Hewcode\Contracts;
use Hewcode\Hewcode\Support\Component;
use Hewcode\Hewcode\Support\Container;

class Widgets extends Container implements Contracts\HasVisibility, Contracts\MountsComponents
{
    use Concerns\RequiresVisibility;

    protected int $columns = 1;

    public function __construct(
        /** @var Widget[] */
        protected array $widgets = []
    ) {
        $this->setUp();
    }

    protected function setUp(): void
    {
        //
    }

    public static function make(array $widgets): static
    {
        return new static($widgets);
    }

    public function columns(int $columns): static
    {
        $this->columns = $columns;

        return $this;
    }

    public function toData(): array
    {
        return array_merge(parent::toData(), [
            'widgets' => collect($this->widgets)
                ->filter(fn (Widget $widget) => $widget->isVisible())
                ->mapWithKeys(fn (Widget $widget) => [
                    $widget->getName() => $widget->parent($this)->toData(),
                ])
                ->toArray(),
            'columns' => $this->columns,
        ]);
    }

    public function getComponent(string $type, string $name): ?Component
    {
        return match ($type) {
            'widgets' => collect($this->widgets)->firstWhere(fn (Widget $widget) => $widget->getName() === $name),
            default => null,
        };
    }
}
