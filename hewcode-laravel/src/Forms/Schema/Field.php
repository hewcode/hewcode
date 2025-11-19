<?php

namespace Hewcode\Hewcode\Forms\Schema;

use Closure;
use Hewcode\Hewcode\Concerns\HasDefault;
use Hewcode\Hewcode\Concerns\HasLabel;
use Hewcode\Hewcode\Concerns\HasModel;
use Hewcode\Hewcode\Concerns\HasPlaceholder;
use Hewcode\Hewcode\Concerns\HasVisibility;
use Hewcode\Hewcode\Concerns\InteractsWithRecord;
use Hewcode\Hewcode\Contracts\HasRecord;
use Hewcode\Hewcode\Contracts\WithVisibility;
use Hewcode\Hewcode\Forms\Schema\Concerns\HasValidationRules;
use Hewcode\Hewcode\Support\Component;

abstract class Field extends Component implements WithVisibility, HasRecord
{
    use HasLabel;
    use HasPlaceholder;
    use HasDefault;
    use HasModel;
    use HasVisibility;
    use HasValidationRules;
    use InteractsWithRecord;

    protected string $name;
    protected bool $dehydrated = true;
    protected ?Closure $formatStateUsing = null;
    protected ?Closure $dehydrateStateUsing = null;
    protected ?Closure $saveUsing = null;

    public function __construct(string $name)
    {
        $this->name = $name;

        $this->setUp();
    }

    protected function setUp(): void
    {
        //
    }

    public static function make(string $name): static
    {
        return new static($name);
    }

    public function dehydrated(bool $dehydrated = true): static
    {
        $this->dehydrated = $dehydrated;

        return $this;
    }

    public function formatStateUsing(Closure $callback): static
    {
        $this->formatStateUsing = $callback;

        return $this;
    }

    public function setStateUsing(Closure $callback): static
    {
        $this->dehydrateStateUsing = $callback;

        return $this;
    }

    public function saveUsing(Closure $callback): static
    {
        $this->saveUsing = $callback;

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getPlaceholder(): ?string
    {
        return $this->placeholder;
    }

    public function getDehydrated(): bool
    {
        return $this->dehydrated;
    }

    public function formatState(mixed $state): mixed
    {
        if ($this->formatStateUsing) {
            return $this->evaluate($this->formatStateUsing, ['state' => $state]);
        }

        return $state;
    }

    public function dehydrateState(mixed $state, array $data, array $params): mixed
    {
        if (! $this->dehydrated) {
            return $state;
        }

        if ($this->dehydrateStateUsing) {
            return $this->evaluate($this->dehydrateStateUsing, array_merge([
                'state' => $state,
                'data' => $data,
            ], $params));
        }

        return $state;
    }

    public function saveState(mixed $state, array $data): void
    {
        if (! $this->saveUsing) {
            return;
        }

        $this->evaluate($this->saveUsing, [
            'state' => $state,
            'data' => $data,
        ]);
    }

    /**
     * Get field-specific data to merge with base field data
     * Override in subclasses to add field-type-specific properties
     */
    protected function getFieldSpecificData(): array
    {
        return [];
    }

    /**
     * Get the field type identifier (e.g., 'text-input', 'select', 'textarea')
     */
    abstract protected function getFieldType(): string;

    /**
     * Base toData that combines common field data with field-specific data
     */
    public function toData(): array
    {
        return array_merge([
            'type' => $this->getFieldType(),
            'name' => $this->getName(),
            'label' => $this->getLabel(),
            'placeholder' => $this->getPlaceholder(),
            'default' => $this->getDefault(),
            'required' => $this->isRequired(),
        ], $this->getFieldSpecificData());
    }
}
