<?php

namespace Hewcode\Hewcode\Panel\Navigation;

class Navigation
{
    use Concerns\HasItems;

    protected string $panel;

    public function __construct(string $panel)
    {
        $this->panel = $panel;
    }

    /**
     * Serialize the navigation to an array.
     */
    public function toData(): array
    {
        return [
            'items' => collect($this->items)
                ->sortBy(fn (NavigationItem $item) => $item->getOrder() ?? PHP_INT_MAX)
                ->map(fn (NavigationItem $item) => $item->toData())
                ->values()
                ->all(),
        ];
    }
}
