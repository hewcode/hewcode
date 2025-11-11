<?php

namespace Hewcode\Hewcode\Forms\Schema;

use Closure;
use Hewcode\Hewcode\Concerns\EvaluatesClosures;
use Hewcode\Hewcode\Concerns\HasVisibility;
use Hewcode\Hewcode\Concerns\InteractsWithRecord;
use Hewcode\Hewcode\Contracts\HasRecord;
use Hewcode\Hewcode\Contracts\WithVisibility;
use Hewcode\Hewcode\Forms\Schema\Concerns\HasValidationRules;
use Hewcode\Hewcode\Support\Component;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use function Hewcode\Hewcode\generateFieldLabel;
use function Hewcode\Hewcode\resolveLocaleLabel;

abstract class Field extends Component implements WithVisibility, HasRecord
{
    use HasVisibility;
    use HasValidationRules;
    use EvaluatesClosures;
    use InteractsWithRecord;

    protected string $name;
    protected ?string $label = null;
    protected ?string $placeholder = null;
    protected mixed $default = null;
    protected ?Model $model = null;
    protected ?Closure $formatStateUsing = null;

    public function __construct(string $name)
    {
        $this->name = $name;
        $this->label = generateFieldLabel($name);

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

    public function label(string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function placeholder(string $placeholder): static
    {
        $this->placeholder = $placeholder;

        return $this;
    }

    public function default(mixed $value): static
    {
        $this->default = $value;

        return $this;
    }

    public function model(?Model $model): static
    {
        $this->model = $model;

        return $this;
    }

    public function formatStateUsing(Closure $callback): static
    {
        $this->formatStateUsing = $callback;

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getLabel(): string
    {
        if ($this->label) {
            return $this->label;
        }

        if ($this->model) {
            return resolveLocaleLabel($this->name, $this->model);
        }

        return Str::headline($this->name);
    }

    public function getPlaceholder(): ?string
    {
        return $this->placeholder;
    }

    public function getDefault(): mixed
    {
        return $this->default;
    }

    public function formatState(mixed $state): mixed
    {
        if ($this->formatStateUsing) {
            return $this->evaluate($this->formatStateUsing, ['state' => $state]);
        }

        return $state;
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
            'name' => $this->name,
            'label' => $this->getLabel(),
            'placeholder' => $this->placeholder,
            'default' => $this->default,
            'required' => $this->isRequired(),
        ], $this->getFieldSpecificData());
    }
}
