<?php

namespace Hewcode\Hewcode\Lists\Schema;

use Closure;
use Hewcode\Hewcode\Concerns\HasVisibility;
use Hewcode\Hewcode\Contracts\WithVisibility;
use Hewcode\Hewcode\Support\Component;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use function Hewcode\Hewcode\generateFieldLabel;
use function Hewcode\Hewcode\resolveLocaleLabel;

abstract class Column extends Component implements WithVisibility
{
    use HasVisibility;

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
    protected bool $togglable = false;
    protected bool $isToggledHiddenByDefault = false;
    protected string|Closure|null $iconUsing = null;
    protected string $iconPosition = 'before';
    protected int $iconSize = 16;

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

    public function icon(string|Closure $icon, string $position = 'before', int $size = 16): static
    {
        $this->iconUsing = $icon;
        $this->iconPosition = $position;
        $this->iconSize = $size;

        return $this;
    }

    public function getIcon($record): ?array
    {
        if (!$this->iconUsing) {
            return null;
        }

        $iconName = $this->iconUsing instanceof Closure
            ? $this->evaluate($this->iconUsing, ['record' => $record])
            : $this->iconUsing;

        if (!$iconName) {
            return null;
        }

        return [
            'name' => $iconName,
            'position' => $this->iconPosition,
            'size' => $this->iconSize,
        ];
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

        return $this;
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

    protected function getDefaultValue(mixed $record)
    {
        return data_get($record, $this->name);
    }
}
