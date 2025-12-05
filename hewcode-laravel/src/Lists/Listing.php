<?php

namespace Hewcode\Hewcode\Lists;

use BadMethodCallException;
use Hewcode\Hewcode\Concerns;
use Hewcode\Hewcode\Contracts;
use Hewcode\Hewcode\Forms\Form;
use Hewcode\Hewcode\Lists\Drivers\EloquentDriver;
use Hewcode\Hewcode\Lists\Drivers\IterableDriver;
use Hewcode\Hewcode\Lists\Drivers\ListingDriver;
use Hewcode\Hewcode\Actions\Action;
use Hewcode\Hewcode\Actions\BulkAction;
use Hewcode\Hewcode\Lists\Filters\Filter;
use Hewcode\Hewcode\Lists\Schema\Column;
use Hewcode\Hewcode\Lists\Tabs\Tab;
use Hewcode\Hewcode\Support\Container;
use Hewcode\Hewcode\Support\Component;
use Illuminate\Database\Eloquent\Builder;
use Closure;
use Illuminate\Database\Eloquent\Model;
use ReflectionClass;
use Hewcode\Hewcode\Lists\Expose as ListingExpose;
use Hewcode\Hewcode\Actions\Expose as ActionsExpose;
use Hewcode\Hewcode\Support\Expose;
use ReflectionException;

class Listing extends Container implements Contracts\MountsActions, Contracts\MountsComponents, Contracts\ResolvesRecords, Contracts\HasVisibility, Contracts\HasOwnerRecord, Contracts\HasRecord
{
    use Concerns\ResolvesRecords;
    use Concerns\InteractsWithActions;
    use Concerns\RequiresVisibility;
    use Concerns\HasOwnerRecord;
    use Concerns\HasRecord;

    // @todo: create a HasOwnerRecord contract+concern, use here, and then we can do:
    // Listing::make()->ownerRecord($record)->relationship('comments', fn ($query) => ...)
    // then we can create an AttachAction and DetachAction that can be mounted on Listings

    protected ListingDriver $driver;
    protected Closure|null $buildDriverUsing = null;
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
    protected bool $deferFiltering = false;

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
    protected ?string $requestScope = null;

    public array $filtersState = [];

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

    public function buildDriverUsing(Closure $callback): self
    {
        $this->buildDriverUsing = $callback;

        return $this;
    }

    public function query(Builder|Closure $query): self
    {
        $this->buildDriverUsing(function () use ($query) {
            /** @var Builder $query */
            $query = $this->evaluate($query);

            $this->driver = new EloquentDriver($query);

            if (! $this->model) {
                $this->model($query->getModel());
            }
        });

        return $this;
    }

    public function data(iterable|Closure $data): self
    {
        $this->buildDriverUsing(function () use ($data) {
            $data = $this->evaluate($data);

            $this->driver = new IterableDriver($data);
        });

        return $this;
    }

    public function getDriver(): ListingDriver
    {
        if (isset($this->driver)) {
            return $this->driver;
        }

        if ($this->buildDriverUsing instanceof Closure) {
            ($this->buildDriverUsing)();

            return $this->driver;
        }

        throw new BadMethodCallException('You must call either query() or data() on a Listing.');
    }

    /** @param Column[] $columns */
    public function columns(array $columns): self
    {
        $this->columns = $columns;

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

    public function scope(?string $scope): self
    {
        $this->requestScope = $scope;

        return $this;
    }

    public function getRequestScope(): ?string
    {
        return $this->requestScope;
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

    public function deferFiltering(bool $defer = true): self
    {
        $this->deferFiltering = $defer;

        return $this;
    }

    /** @return array<Column> */
    protected function getEvaluationParameters(): array
    {
        $parameters = [];

        if ($model = $this->getModel()) {
            $parameters['model'] = $model;
        }

        if ($ownerRecord = $this->getOwnerRecord()) {
            $parameters['ownerRecord'] = $ownerRecord;
        }

        if ($relationshipName = $this->getRelationshipName()) {
            $parameters['relationshipName'] = $relationshipName;
        }

        return $parameters;
    }

    private function getCachedColumns(): array
    {
        if ($this->cachedColumns === null) {
            $this->cachedColumns = collect($this->columns)
                ->filter(fn (Column $column) => $column
                    ->shareEvaluationParameters($this->getEvaluationParameters())
                    ->model($this->getModel())
                    ->isVisible()
                )
                ->values()
                ->all();
        }

        return $this->cachedColumns;
    }

    private function getSessionKey(): string
    {
        $base = $this->sessionKey ?? 'hewcode_listing_' . static::class;

        if ($this->requestScope) {
            return $base . '_' . $this->requestScope;
        }

        return $base;
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

    private function getRequestKey(string $key): string
    {
        if ($this->requestScope && in_array($key, ['filter', 'search', 'sort', 'direction', 'columns', 'activeTab', 'clear'])) {
            return $this->requestScope . '_' . $key;
        }

        return $key;
    }

    private function getRequestOrSession(string $key, mixed $default = null): mixed
    {
        $requestKey = $this->getRequestKey($key);
        $requestValue = request()->input($requestKey);

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
        if (request()->has($this->getRequestKey('clear')) && $shouldPersistInSession) {
            $clearType = request()->input($this->getRequestKey('clear'));

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

    /** @return array<Filter> */
    private function getFilters(): array
    {
        return collect($this->filters)
            ->filter(fn (Filter $filter) => $filter
                ->shareEvaluationParameters($this->getEvaluationParameters())
                ->model($this->getModel())
                ->isVisible()
            )
            ->values()
            ->all();
    }

    public function prepare(): void
    {
        parent::prepare();

        $this->prepareData();
    }

    private function prepareData(): void
    {
        $this->getDriver();

        $visibleColumns = collect($this->getCachedColumns());

        $searchableFields = $visibleColumns
            ->filter(fn (Column $column) => $column->isSearchable())
            ->map(fn (Column $column) => $column->getSearchField())
            ->toArray();

        if ($searchTerm = $this->getRequestOrSession('search')) {
            $this->driver->applySearch($searchTerm, $searchableFields);
        }

        // Pre-resolve filter values using session-aware logic
        $resolvedFilterValues = $this->getRequestOrSession('filter', []);

        $filters = $this->getFilters();
        $this->filtersState = $resolvedFilterValues ?? [];

        // Call resolveState on each filter to set up their resolved state
        foreach ($filters as $filter) {
            $filter->resolveState($resolvedFilterValues ?? []);
            $this->filtersState[$filter->name] = $filter->getState();
        }

        if (request($this->getRequestKey('clear')) === 'filters') {
            $this->filtersState = [];
        }

        $this->driver->applyFilters($filters);

        $sortableFields = $visibleColumns
            ->filter(fn (Column $column) => $column->isSortable())
            ->mapWithKeys(fn (Column $column) => [$column->getSortField() => $column->getLabel()])
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
        $this->prepare();

        $result = $this->driver->paginate($this->perPage);

        $visibleColumns = $this->getCachedColumns();

        $sortableFields = collect($visibleColumns)
            ->filter(fn (Column $column) => $column->isSortable())
            ->map(fn (Column $column) => $column->getSortField())
            ->toArray();

        $iconRegistry = [];

        return array_merge(parent::toData(), [
            'records' => $result['records']->map(function (Model $record) use ($visibleColumns, &$iconRegistry) {
                $data = [];

                foreach ($visibleColumns as $column) {
                    $columnData = $column->toRecordData($record);

                    $icon = $columnData[$column->getName() . '_icon'] ?? null;

                    // Register icon SVG (deduplicated)
                    if ($icon && isset($icon['name']) && ! isset($iconRegistry[$icon['name']])) {
                        $iconRegistry[$icon['name']] = svg($icon['name'])->toHtml();
                    }

                    $data = array_merge($data, $columnData);
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
                            $carry[$action->name] = $action->parent($this)->toData();

                            return $carry;
                        }, []);
                    }
                }

                return $data;
            })->values()->all(),
            'pagination' => $result['pagination'],
            'columns' => array_map(function (Column $column) {
                return $column->toData();
            }, $visibleColumns),
            'icons' => $iconRegistry,
            // @todo: is this really necessary?
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
            'deferFiltering' => $this->deferFiltering,
            'filtersForm' => ! empty($this->getFilters()) ? $this->filtersForm()->toData() : null,
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
            'requestScope' => $this->requestScope,
            'currentValues' => ([
                'search' => $this->getRequestOrSession('search'),
                'sort' => $this->getRequestOrSession('sort', $this->defaultSort[0] ?? null),
                'direction' => $this->getRequestOrSession('direction', $this->defaultSort[1] ?? 'asc'),
                'filter' => $this->getRequestOrSession('filter', []),
                'columns' => $this->getColumnVisibilityObject(),
            ]),
            'bulkActions' => array_map(function (BulkAction $bulkAction) {
                return $bulkAction->parent($this)->toData();
            }, array_filter($this->bulkActions, fn (BulkAction $bulkAction) => $bulkAction->isVisible())),
            'reorderable' => $this->reorderableColumn,
        ]);
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
        foreach ($this->getFilters() as $filter) {
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

    public function filtersForm(): Form
    {
        return Form::make('filtersForm')
            ->model($this->getModel())
            ->visible($this->visible)
            ->fillUsing(fn () => $this->filtersState)
            ->schema(
                collect($this->getFilters())
                    ->map(fn (Filter $filter) => $filter->getFormSchema())
                    ->filter()
                    ->flatten()
                    ->values()
                    ->all()
            )
            ->submitAction(fn (Action $action) => $action->hidden());
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
