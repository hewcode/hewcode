<?php

namespace Hewcode\Hewcode\Lists\Schema;

use Closure;
use Hewcode\Hewcode\Concerns\HasVisibility;
use Hewcode\Hewcode\Concerns\EvaluatesClosures;
use Hewcode\Hewcode\Contracts\WithVisibility;
use Hewcode\Hewcode\Support\Component;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

abstract class Column extends Component implements WithVisibility
{
    use HasVisibility, EvaluatesClosures;

    protected string $name;
    protected string $label;
    protected bool $sortable = false;
    protected bool $searchable = false;
    protected ?Closure $getStateUsing = null;
    protected ?Closure $formatStateUsing = null;
    protected ?string $sortField = null;
    protected ?string $searchField = null;
    protected bool $wrap = false;
    protected bool $badge = false;
    protected ?string $badgeVariant = null;
    protected ?Closure $colorUsing = null;
    protected ?Closure $beforeUsing = null;
    protected ?Closure $afterUsing = null;
    protected ?Closure $omitUsing = null;
    protected ?Model $model = null;
    protected bool $labelExplicitlySet = false;
    protected bool $togglable = false;
    protected bool $isToggledHiddenByDefault = false;

    public function __construct(string $name)
    {
        $this->name = $name;

        // Handle dot notation for labels - convert "category.name" to "Category Name"
        if (str_contains($name, '.')) {
            $parts = explode('.', $name);
            $this->label = str(implode(' ', $parts))->title()->toString();
        } else {
            $this->label = str($name)->title()->toString();
        }

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
        $this->labelExplicitlySet = true;

        return $this;
    }

    public function sortable(bool $sortable = true, ?string $field = null): static
    {
        $this->sortable = $sortable;
        $this->sortField = $field;

        return $this;
    }

    public function searchable(bool $searchable = true, ?string $field = null): static
    {
        $this->searchable = $searchable;
        $this->searchField = $field;

        return $this;
    }

    public function getStateUsing(Closure $callback): static
    {
        $this->getStateUsing = $callback;

        return $this;
    }

    public function formatStateUsing(Closure $callback): static
    {
        $this->formatStateUsing = $callback;

        return $this;
    }


    public function wrap(bool $wrap = true): static
    {
        $this->wrap = $wrap;

        return $this;
    }

    public function badge(bool $badge = true, ?string $variant = null): static
    {
        $this->badge = $badge;
        $this->badgeVariant = $variant;

        return $this;
    }

    public function color(Closure $callback): static
    {
        $this->colorUsing = $callback;

        return $this;
    }

    public function before(Closure $callback): static
    {
        $this->beforeUsing = $callback;

        return $this;
    }

    public function after(Closure $callback): static
    {
        $this->afterUsing = $callback;

        return $this;
    }

    public function omit(Closure $callback): static
    {
        $this->omitUsing = $callback;

        return $this;
    }

    public function togglable(bool $togglable = true, bool $isToggledHiddenByDefault = false): static
    {
        $this->togglable = $togglable;
        $this->isToggledHiddenByDefault = $isToggledHiddenByDefault;

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function model(?Model $model): static
    {
        $this->model = $model;

        // If no label was explicitly set, try to resolve it from locale
        if (!$this->labelExplicitlySet && $model) {
            $this->resolveLocaleLabel();
        }

        return $this;
    }

    protected function resolveLocaleLabel(): void
    {
        if (!$this->model) {
            return;
        }

        // Handle relationship columns like "category.name"
        if (str_contains($this->name, '.')) {
            $parts = explode('.', $this->name);
            $relationshipName = $parts[0];
            $columnName = $parts[1];

            // Try to get the related model's table name
            if ($this->model->isRelation($relationshipName)) {
                $relationship = $this->model->{$relationshipName}();
                $relatedModel = $relationship->getRelated();
                $relatedTableName = $relatedModel->getTable();
                $pluralModel = Str::camel($relatedTableName);

                $localeKey = "app.{$pluralModel}.columns.{$columnName}";
            } else {
                // Fallback to current model if relationship doesn't exist
                $tableName = $this->model->getTable();
                $pluralModel = Str::camel($tableName);
                $localeKey = "app.{$pluralModel}.columns.{$this->name}";
            }
        } else {
            // Regular column - use current model
            $tableName = $this->model->getTable();
            $pluralModel = Str::camel($tableName);
            $localeKey = "app.{$pluralModel}.columns.{$this->name}";
        }

        if (function_exists('trans') && trans($localeKey) !== $localeKey) {
            $this->label = trans($localeKey);
        }
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function isSortable(): bool
    {
        return $this->sortable;
    }

    public function isSearchable(): bool
    {
        return $this->searchable;
    }

    public function getSortField(): string
    {
        return $this->sortField ?? $this->name;
    }

    public function getSearchField(): string
    {
        return $this->searchField ?? $this->name;
    }


    public function shouldWrap(): bool
    {
        return $this->wrap;
    }

    public function shouldShowBadge(): bool
    {
        return $this->badge;
    }

    public function getBadgeVariant(): ?string
    {
        return $this->badgeVariant;
    }

    public function getColor($record): ?string
    {
        return $this->colorUsing ? $this->evaluate($this->colorUsing, ['record' => $record]) : null;
    }

    public function getBeforeContent($record): ?string
    {
        return $this->beforeUsing ? $this->evaluate($this->beforeUsing, ['record' => $record]) : null;
    }

    public function getAfterContent($record): ?string
    {
        return $this->afterUsing ? $this->evaluate($this->afterUsing, ['record' => $record]) : null;
    }

    public function isTogglable(): bool
    {
        return $this->togglable;
    }

    public function isToggledHiddenByDefault(): bool
    {
        return $this->isToggledHiddenByDefault;
    }

    public function getValue($record)
    {
        if ($this->omitUsing && $this->evaluate($this->omitUsing, ['record' => $record])) {
            return null;
        }

        $value = $this->getStateUsing
            ? $this->evaluate($this->getStateUsing, ['record' => $record])
            : $this->getDefaultValue($record);

        return $this->formatStateUsing
            ? $this->evaluate($this->formatStateUsing, ['value' => $value, 'record' => $record])
            : $value;
    }

    protected function getEvaluationParameters(): array
    {
        $parameters = [];

        if ($this->model !== null) {
            $parameters['model'] = $this->model;
        }

        return $parameters;
    }

    protected function getDefaultValue($record)
    {
        if ($record instanceof Model) {
            // Handle dot notation for relationships
            if (str_contains($this->name, '.')) {
                return data_get($record, $this->name);
            }

            return $record->getAttribute($this->name);
        }

        return data_get($record, $this->name);
    }
}
