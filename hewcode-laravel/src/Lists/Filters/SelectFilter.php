<?php

namespace Hewcode\Hewcode\Lists\Filters;

class SelectFilter extends Filter
{
    public string $type = 'select';

    public array $options = [];

    public bool $multiple = false;

    public function options(array|string $options): self
    {
        if (is_string($options) && enum_exists($options)) {
            $this->options = collect($options::cases())
                ->mapWithKeys(function ($case) {
                    if (method_exists($case, 'getLabel')) {
                        return [$case->value => $case->getLabel()];
                    }

                    if (property_exists($case, 'name')) {
                        return [$case->value => $case->name];
                    }

                    return [$case->value => $case->value];
                })
                ->toArray();
        } else {
            $this->options = (array) $options;
        }

        return $this;
    }

    public function multiple(bool $multiple = true): self
    {
        $this->multiple = $multiple;

        return $this;
    }

    public function toData(): array
    {
        return array_merge(parent::toData(), [
            'options' => collect($this->options)
                ->map(function ($label, $value) {
                    return ['label' => $label, 'value' => $value];
                })
                ->values()
                ->toArray(),
            'multiple' => $this->multiple,
        ]);
    }
}
