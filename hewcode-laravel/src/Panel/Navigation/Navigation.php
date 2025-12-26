<?php

namespace Hewcode\Hewcode\Panel\Navigation;

use Hewcode\Hewcode\Support\Concerns\HasIconRegistry;

class Navigation
{
    use Concerns\HasItems;
    use HasIconRegistry;

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
        $items = collect($this->items)
            ->sortBy(fn (NavigationItem $item) => $item->getOrder() ?? PHP_INT_MAX)
            ->map(function (NavigationItem $item) {
                $data = $item->toData();

                // Register icon and replace with reference
                if (isset($data['icon'])) {
                    $data['icon'] = $this->registerIcon($data['icon']);
                }

                return $data;
            })
            ->values()
            ->all();

        return [
            'items' => $items,
            'icons' => $this->getIconRegistry(),
        ];
    }
}
