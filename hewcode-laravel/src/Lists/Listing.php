<?php

namespace Hewcode\Hewcode\Lists;

use BadMethodCallException;
use Hewcode\Hewcode\Concerns\InteractsWithActions;
use Hewcode\Hewcode\Concerns\InteractsWithModel;
use Hewcode\Hewcode\Concerns\EvaluatesClosures;
use Hewcode\Hewcode\Concerns\RequiresVisibility;
use Hewcode\Hewcode\Contracts\MountsActions;
use Hewcode\Hewcode\Contracts\MountsComponents;
use Hewcode\Hewcode\Contracts\ResolvesRecord;
use Hewcode\Hewcode\Contracts\WithVisibility;
use Hewcode\Hewcode\Lists\Drivers\EloquentDriver;
use Hewcode\Hewcode\Lists\Drivers\IterableDriver;
use Hewcode\Hewcode\Lists\Drivers\ListingDriver;
use Hewcode\Hewcode\Actions\Action;
use Hewcode\Hewcode\Actions\BulkAction;
use Hewcode\Hewcode\Lists\Filters\Filter;
use Hewcode\Hewcode\Lists\Schema\Column;
use Hewcode\Hewcode\Lists\Tabs\Tab;
use Hewcode\Hewcode\Support\Component;
use Illuminate\Database\Eloquent\Builder;
use Closure;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Route;
use ReflectionClass;
use Hewcode\Hewcode\Lists\Expose as ListingExpose;
use Hewcode\Hewcode\Actions\Expose as ActionsExpose;
use Hewcode\Hewcode\Support\Expose;
use Hewcode\Hewcode\Contracts\Discoverable;
use ReflectionException;
use Illuminate\Support\Facades\Hash;
use function Hewcode\Hewcode\generateComponentHash;

class Listing implements Discoverable, MountsActions, MountsComponents, ResolvesRecord, WithVisibility
{
    use InteractsWithModel;
    use InteractsWithActions;
    use RequiresVisibility;
    use EvaluatesClosures;

    protected ListingDriver $driver;
    public ?string $component = null;
    /** @var array<Column> */
    public array $columns = [];
    /** @var array<Column>|null */
    private ?array $cachedColumns = null;
    public ?array $defaultSort = null;
    /** @var array<Filter> */
    public array $filters = [];
    /** @var array<Tab> */
    public array $tabs = [];
    public ?string $defaultTab = null;
    public ?string $activeTab = null;
    /** @var array<Action> */
    public array $actions = [];
    /** @var array<BulkAction> */
    public array $bulkActions = [];
    public int $perPage = 15;
    protected ?Closure $bgColorUsing = null;
    protected ?string $reorderableColumn = null;

    // URL persistence settings
    protected bool $persistFiltersInUrl = false;
    protected bool $persistSortInUrl = false;
    protected bool $persistColumnsInUrl = false;
    protected bool $persistSearchInUrl = false;

    // Session persistence settings
    protected bool $persistFiltersInSession = false;
    protected bool $persistSortInSession = false;
    protected bool $persistColumnsInSession = false;
    protected bool $persistSearchInSession = false;
    protected bool $persistTabInSession = false;
    protected ?string $sessionKey = null;

    public static function make(): self
    {
        // Validate that this method is called from a method with the #[Listing] attribute
        $backtrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);

        // Find the calling method (skip the current make() call)
        $caller = null;
        for ($i = 1; $i < count($backtrace); $i++) {
            if (isset($backtrace[$i]['class']) && isset($backtrace[$i]['function'])) {
                $caller = $backtrace[$i];
                break;
            }
        }

        if (!$caller) {
            throw new BadMethodCallException('Lists\Listing::make() must be called from a method with the #[Listing] attribute');
        }

        try {
            $reflectionClass = new ReflectionClass($caller['class']);
            $reflectionMethod = $reflectionClass->getMethod($caller['function']);

            $listingAttributes = $reflectionMethod->getAttributes(ListingExpose::class);
            $actionsAttributes = $reflectionMethod->getAttributes(ActionsExpose::class);

            if (empty($listingAttributes) && empty($actionsAttributes)) {
                throw new BadMethodCallException(
                    sprintf(
                        'Lists\Listing::make() can only be called from methods with the #[Listing] or #[Actions] attribute. ' .
                        'Method %s::%s() is missing the required attribute.',
                        $caller['class'],
                        $caller['function']
                    )
                );
            }
        } catch (ReflectionException) {
            throw new BadMethodCallException('Unable to validate calling method for Lists\Listing::make()');
        }

        return new self();
    }

    public function component(string $component): static
    {
        $this->component = $component;

        return $this;
    }

    public function query(Builder $query): self
    {
        $this->driver = new EloquentDriver($query);

        // Set model context on existing columns
        $this->setModelContextOnColumns($query->getModel());

        return $this;
    }

    public function data(iterable $data): self
    {
        $this->driver = new IterableDriver($data);

        return $this;
    }

    /** @param Column[] $columns */
    public function columns(array $columns): self
    {
        $this->columns = $columns;

        // If we already have a driver with a model, set the context on new columns
        if (isset($this->driver) && $this->driver instanceof EloquentDriver) {
            $model = $this->getModel();

            $this->model($model);

            $this->setModelContextOnColumns($model);
        }

        return $this;
    }

    public function defaultSort(string $column, string $direction = 'asc'): self
    {
        $this->defaultSort = [$column, $direction];

        return $this;
    }

    /** @param Filter[] $filters */
    public function filters(array $filters): self
    {
        $this->filters = $filters;

        return $this;
    }

    /** @param Tab[] $tabs */
    public function tabs(array $tabs): self
    {
        $this->tabs = $tabs;

        return $this;
    }

    public function defaultTab(string $tabName): self
    {
        $this->defaultTab = $tabName;

        return $this;
    }

    /** @param Action[] $actions */
    public function actions(array $actions): self
    {
        $this->actions = $actions;

        return $this;
    }

    /** @param BulkAction[] $bulkActions */
    public function bulkActions(array $bulkActions): self
    {
        $this->bulkActions = $bulkActions;

        return $this;
    }

    public function perPage(int $perPage): self
    {
        $this->perPage = $perPage;

        return $this;
    }

    public function bgColor(Closure $callback): self
    {
        $this->bgColorUsing = $callback;

        return $this;
    }

    public function reorderable(?string $column = 'order'): self
    {
        $this->reorderableColumn = $column;
        $this->defaultSort ??= [$column, 'asc'];

        return $this;
    }

    public function persistFiltersInUrl(bool $persist = true): self
    {
        $this->persistFiltersInUrl = $persist;

        return $this;
    }

    public function persistSortInUrl(bool $persist = true): self
    {
        $this->persistSortInUrl = $persist;

        return $this;
    }

    public function persistColumnsInUrl(bool $persist = true): self
    {
        $this->persistColumnsInUrl = $persist;

        return $this;
    }

    public function persistSearchInUrl(bool $persist = true): self
    {
        $this->persistSearchInUrl = $persist;

        return $this;
    }

    public function persistInUrl(bool $persist = true): self
    {
        $this->persistFiltersInUrl = $persist;
        $this->persistSortInUrl = $persist;
        $this->persistColumnsInUrl = $persist;
        $this->persistSearchInUrl = $persist;

        return $this;
    }

    public function persistFiltersInSession(bool $persist = true): self
    {
        $this->persistFiltersInSession = $persist;

        return $this;
    }

    public function persistSortInSession(bool $persist = true): self
    {
        $this->persistSortInSession = $persist;

        return $this;
    }

    public function persistColumnsInSession(bool $persist = true): self
    {
        $this->persistColumnsInSession = $persist;

        return $this;
    }

    public function persistSearchInSession(bool $persist = true): self
    {
        $this->persistSearchInSession = $persist;

        return $this;
    }

    public function persistTabInSession(bool $persist = true): self
    {
        $this->persistTabInSession = $persist;

        return $this;
    }

    public function persistInSession(bool $persist = true): self
    {
        $this->persistFiltersInSession = $persist;
        $this->persistSortInSession = $persist;
        $this->persistColumnsInSession = $persist;
        $this->persistSearchInSession = $persist;
        $this->persistTabInSession = $persist;

        return $this;
    }

    public function sessionKey(string $key): self
    {
        $this->sessionKey = $key;

        return $this;
    }

    /** @return array<Column> */
    protected function getEvaluationParameters(): array
    {
        $parameters = [];

        if (method_exists($this, 'getModel') && $this->getModel() !== null) {
            $parameters['model'] = $this->getModel();
        }

        return $parameters;
    }

    private function getCachedColumns(): array
    {
        if ($this->cachedColumns === null) {
            $this->cachedColumns = collect($this->columns)
                ->filter(fn(Column $column) => $column->isVisible())
                ->values()
                ->all();
        }

        return $this->cachedColumns;
    }

    private function getSessionKey(): string
    {
        return $this->sessionKey ?? 'chisel_listing_' . static::class;
    }

    private function getColumnVisibilityObject(): array
    {
        $visibleColumnsArray = $this->getRequestOrSession('columns', []);

        // Convert array format ['col1', 'col2'] to object format {col1: true, col2: true, col3: false}
        $columnVisibility = [];

        // If empty array (no columns saved yet), use defaults
        if (empty($visibleColumnsArray)) {
            foreach ($this->columns as $column) {
                if ($column->isTogglable()) {
                    $columnVisibility[$column->getName()] = !$column->isToggledHiddenByDefault();
                }
            }
        } else {
            foreach ($this->columns as $column) {
                if ($column->isTogglable()) {
                    $columnVisibility[$column->getName()] = in_array($column->getName(), $visibleColumnsArray);
                }
            }
        }

        return $columnVisibility;
    }

    private function getFromSession(string $key, mixed $default = null): mixed
    {
        $sessionKey = $this->getSessionKey();
        return session()->get("{$sessionKey}.{$key}", $default);
    }

    private function putInSession(string $key, mixed $value): void
    {
        $sessionKey = $this->getSessionKey();
        session()->put("{$sessionKey}.{$key}", $value);
    }

    private function getRequestOrSession(string $key, mixed $default = null): mixed
    {
        $requestValue = request()->input($key);

        // If we have a request value, store it in session (if session persistence is enabled)
        $shouldPersistInSession = match ($key) {
            'search' => $this->persistSearchInSession,
            'sort', 'direction' => $this->persistSortInSession,
            'filter' => $this->persistFiltersInSession,
            'columns' => $this->persistColumnsInSession,
            'activeTab' => $this->persistTabInSession,
            default => false,
        };

        // Handle explicit clear request
        if (request()->has('clear') && $shouldPersistInSession) {
            $clearType = request()->input('clear');

            // Clear specific types or all if clear=true (backward compatibility)
            if ($clearType === true || $clearType === 'filters' && $key === 'filter' ||
                $clearType === 'columns' && $key === 'columns' ||
                $clearType ===  'activeTab' && $key === 'activeTab'
            ) {
                $this->putInSession($key, null);
                return $default;
            }
        }

        // Store in session if persistence is enabled and we have a request value
        if ($requestValue !== null && $shouldPersistInSession) {
            $this->putInSession($key, $requestValue);
        }

        // Return request value -> session value -> default
        return $requestValue ?? ($shouldPersistInSession ? $this->getFromSession($key, $default) : $default);
    }

    private function prepareData(): void
    {
        if (!isset($this->driver)) {
            throw new BadMethodCallException('You must call either query() or data() before calling toData()');
        }

        $visibleColumns = collect($this->getCachedColumns());

        $searchableFields = $visibleColumns
            ->filter(fn(Column $column) => $column->isSearchable())
            ->map(fn(Column $column) => $column->getSearchField())
            ->toArray();

        if ($searchTerm = $this->getRequestOrSession('search')) {
            $this->driver->applySearch($searchTerm, $searchableFields);
        }

        // Pre-resolve filter values using session-aware logic
        $resolvedFilterValues = $this->getRequestOrSession('filter', []);

        // Call resolveState on each filter to set up their resolved state
        foreach ($this->filters as $filter) {
            $filter->resolveState($resolvedFilterValues ?? []);
        }

        $this->driver->applyFilters($this->filters);

        $sortableFields = $visibleColumns
            ->filter(fn(Column $column) => $column->isSortable())
            ->mapWithKeys(fn(Column $column) => [$column->getSortField() => $column->getLabel()])
            ->toArray();

        $sortField = $this->getRequestOrSession('sort', $this->defaultSort[0] ?? null);
        $sortDirection = $this->getRequestOrSession('direction', $this->defaultSort[1] ?? 'asc');

        if ($this->activeTab = ($this->getRequestOrSession('activeTab', $this->defaultTab) ?? $this->defaultTab)) {
            $this->driver->applyTab(
                collect($this->tabs)->firstWhere('name', $this->activeTab)->active()
            );
        }

        $this->driver->applySort(
            $sortField,
            $sortDirection,
            $sortableFields,
            $this->defaultSort,
            $this->reorderableColumn,
        );
    }

    public function toData(): array
    {
        $this->prepareData();

        $result = $this->driver->paginate($this->perPage);

        $visibleColumns = $this->getCachedColumns();

        $sortableFields = collect($visibleColumns)
            ->filter(fn(Column $column) => $column->isSortable())
            ->map(fn(Column $column) => $column->getSortField())
            ->toArray();

        $iconRegistry = [];

        return [
            'component' => $this->component,
            'hash' => generateComponentHash($this->component),
            'route' => Route::currentRouteName(),
            'records' => $result['records']->map(function (Model $record) use ($visibleColumns, &$iconRegistry) {
                $data = [];

                foreach ($visibleColumns as $column) {
                    $data[$column->getName()] = $column->getValue($record);

                    if ($before = $column->getBeforeContent($record)) {
                        $data[$column->getName() . '_before'] = $before;
                    }

                    if ($after = $column->getAfterContent($record)) {
                        $data[$column->getName() . '_after'] = $after;
                    }

                    if ($color = $column->getColor($record)) {
                        $data[$column->getName() . '_color'] = $color;
                    }

                    if ($icon = $column->getIcon($record)) {
                        $data[$column->getName() . '_icon'] = $icon;

                        // Register icon SVG (deduplicated)
                        if (!isset($iconRegistry[$icon['name']])) {
                            $iconRegistry[$icon['name']] = svg($icon['name'])->toHtml();
                        }
                    }
                }

                // Add row background color if specified
                if ($this->bgColorUsing) {
                    $data['_row_bg_color'] = $this->evaluate($this->bgColorUsing, ['record' => $record]);
                }

                // Add row actions if specified
                if (! empty($this->actions)) {
                    $visibleActions = array_filter($this->actions, function (Action $action) use ($record) {
                        return $action->record($record)->isVisible();
                    });

                    if (!empty($visibleActions)) {
                        $data['_row_actions'] = array_reduce($visibleActions, function ($carry, Action $action) use ($record) {
                            $carry[$action->name] = array_merge($action->component($this->component)->toData(), [
                                'recordId' => $record->getKey(),
                            ]);
                            return $carry;
                        }, []);
                    }
                }

                return $data;
            })->values()->all(),
            'pagination' => $result['pagination'],
            'columns' => array_map(function (Column $column) {
                return [
                    'key' => $column->getName(),
                    'label' => $column->getLabel(),
                    'wrap' => $column->shouldWrap(),
                    'badge' => $column->shouldShowBadge(),
                    'badgeVariant' => $column->getBadgeVariant(),
                    'togglable' => $column->isTogglable(),
                    'isToggledHiddenByDefault' => $column->isToggledHiddenByDefault(),
                    'hidden' => !$column->isVisible(),
                ];
            }, $visibleColumns),
            'icons' => $iconRegistry,
            'allColumns' => array_map(function (Column $column) {
                return [
                    'key' => $column->getName(),
                    'label' => $column->getLabel(),
                    'togglable' => $column->isTogglable(),
                    'isToggledHiddenByDefault' => $column->isToggledHiddenByDefault(),
                    'hidden' => !$column->isVisible(),
                ];
            }, $this->columns),
            'sortable' => array_values($sortableFields),
            'filters' => array_map(function (Filter $filter) {
                return $filter->toData();
            }, $this->filters),
            'tabs' => array_map(function (Tab $tab) {
                return $tab->toData();
            }, $this->tabs),
            'activeTab' => $this->activeTab,
            'urlPersistence' => [
                'persistFiltersInUrl' => $this->persistFiltersInUrl,
                'persistSortInUrl' => $this->persistSortInUrl,
                'persistColumnsInUrl' => $this->persistColumnsInUrl,
                'persistSearchInUrl' => $this->persistSearchInUrl,
            ],
            'sessionPersistence' => [
                'persistFiltersInSession' => $this->persistFiltersInSession,
                'persistSortInSession' => $this->persistSortInSession,
                'persistColumnsInSession' => $this->persistColumnsInSession,
                'persistSearchInSession' => $this->persistSearchInSession,
                'sessionKey' => $this->getSessionKey(),
            ],
            'currentValues' => ([
                'search' => $this->getRequestOrSession('search'),
                'sort' => $this->getRequestOrSession('sort', $this->defaultSort[0] ?? null),
                'direction' => $this->getRequestOrSession('direction', $this->defaultSort[1] ?? 'asc'),
                'filter' => $this->getRequestOrSession('filter', []),
                'columns' => $this->getColumnVisibilityObject(),
            ]),
            'bulkActions' => array_map(function (BulkAction $bulkAction) {
                return $bulkAction->component($this->component)->toData();
            }, array_filter($this->bulkActions, fn (BulkAction $bulkAction) => $bulkAction->isVisible())),
            'reorderable' => $this->reorderableColumn,
        ];
    }

    protected function setModelContextOnColumns(Model $model): void
    {
        foreach ($this->columns as $column) {
            $column->model($model);
        }
    }

    protected function getModel(): ?Model
    {
        if (isset($this->driver) && $this->driver instanceof EloquentDriver) {
            return $this->getQueryFromDriver()->getModel();
        }

        return null;
    }

    protected function getQueryFromDriver(): ?Builder
    {
        if (isset($this->driver) && $this->driver instanceof EloquentDriver) {
            // We need to access the protected query property
            $reflection = new ReflectionClass($this->driver);
            $queryProperty = $reflection->getProperty('query');
            $queryProperty->setAccessible(true);

            return $queryProperty->getValue($this->driver);
        }

        return null;
    }

    public function getMountableActions(): array
    {
        return array_merge($this->actions, $this->bulkActions);
    }

    public function getComponent(string $type, string $name): ?Component
    {
        return match ($type) {
            'columns' => $this->getColumn($name),
            'filters' => $this->getFilter($name),
            default => null,
        };
    }

    public function getFilter(string $name): ?Filter
    {
        foreach ($this->filters as $filter) {
            if ($filter->name === $name) {
                return $filter;
            }
        }

        return null;
    }

    public function getColumn(string $name): ?Column
    {
        foreach ($this->columns as $column) {
            if ($column->getName() === $name) {
                return $column;
            }
        }

        return null;
    }

    #[Expose]
    public function reorder(int $recordId, int $newPosition): bool
    {
        if (!$this->reorderableColumn || !isset($this->driver)) {
            return false;
        }

        return $this->driver->reorder($recordId, $newPosition, $this->reorderableColumn);
    }
}
