<?php

namespace Hewcode\Hewcode\Lists\Filters;

use Hewcode\Hewcode\Support\Expose;
use Illuminate\Database\Eloquent\Model;

class SelectFilter extends Filter
{
    public string $type = 'select';

    public array $options = [];

    public bool $multiple = false;

    public bool $searchable = false;

    public ?string $relationshipName = null;

    public ?string $relationshipTitleColumn = null;

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

    public function searchable(bool $searchable = true): self
    {
        $this->searchable = $searchable;

        return $this;
    }

    public function relationship(string $relationshipName, string $titleColumn = 'name'): self
    {
        $this->relationshipName = $relationshipName;
        $this->relationshipTitleColumn = $titleColumn;

        return $this;
    }

    #[Expose]
    public function getSearchResults(string $query): array
    {
        if (!$this->searchable || !$this->relationshipName) {
            return [];
        }

        // Get the model class from the field name
        // Assuming the field follows Laravel convention: category_id -> Category
        $relationshipClass = $this->getRelationshipModelClass();

        if (!$relationshipClass || !class_exists($relationshipClass)) {
            return [];
        }

        return $relationshipClass::where($this->relationshipTitleColumn, 'like', "%{$query}%")
            ->limit(10)
            ->get(['id', $this->relationshipTitleColumn])
            ->map(fn($model) => [
                'value' => $model->id,
                'label' => $model->{$this->relationshipTitleColumn},
            ])
            ->toArray();
    }

    protected function getRelationshipModelClass(): ?string
    {
        if (!$this->relationshipName) {
            return null;
        }

        // Convert relationship name to model class name
        // e.g., 'category' -> 'App\\Models\\Category'
        $modelName = str($this->relationshipName)->studly()->toString();

        // Try common namespaces
        $namespaces = ['App\\Models\\', 'App\\'];

        foreach ($namespaces as $namespace) {
            $class = $namespace . $modelName;
            if (class_exists($class)) {
                return $class;
            }
        }

        return null;
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
            'searchable' => $this->searchable,
            'relationshipName' => $this->relationshipName,
            'relationshipTitleColumn' => $this->relationshipTitleColumn,
        ]);
    }
}
