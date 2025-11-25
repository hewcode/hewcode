<?php

namespace Hewcode\Hewcode\Forms;

use Closure;
use Hewcode\Hewcode\Actions\Action;
use Hewcode\Hewcode\Concerns\InteractsWithActions;
use Hewcode\Hewcode\Concerns\InteractsWithModel;
use Hewcode\Hewcode\Concerns\InteractsWithRecord;
use Hewcode\Hewcode\Concerns\RequiresVisibility;
use Hewcode\Hewcode\Contracts\HasRecord;
use Hewcode\Hewcode\Contracts\MountsActions;
use Hewcode\Hewcode\Contracts\MountsComponents;
use Hewcode\Hewcode\Contracts\ResolvesRecord;
use Hewcode\Hewcode\Contracts\WithVisibility;
use Hewcode\Hewcode\Forms\Schema\Field;
use Hewcode\Hewcode\Support\Container;
use Hewcode\Hewcode\Support\Component;
use Hewcode\Hewcode\Toasts\Toast;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use RuntimeException;

class Form extends Container implements ResolvesRecord, HasRecord, WithVisibility, MountsActions, MountsComponents
{
    use InteractsWithModel;
    use InteractsWithRecord;
    use InteractsWithActions;
    use RequiresVisibility;

    /** @var array<Field> */
    protected array $fields = [];
    protected array $state = [];
    protected ?Closure $submitUsing = null;
    protected ?Closure $submitAction = null;
    protected ?Closure $fillUsing = null;
    /** @var array<Action> */
    protected array $footerActions = [];

    public function __construct()
    {
        $this->setUp();
    }

    protected function setUp(): void
    {
        $this->fillUsing($this->fillForm(...));
    }

    public static function make(?string $name = 'form'): static
    {
        return (new static())->name($name);
    }

    public function schema(array $fields): static
    {
        $this->fields = $fields;

        return $this;
    }

    public function fillUsing(?Closure $callback): static
    {
        $this->fillUsing = $callback;

        return $this;
    }

    public function submitUsing(?Closure $callback): static
    {
        $this->submitUsing = $callback;

        return $this;
    }

    public function submitAction(Closure $callback): static
    {
        $this->submitAction = $callback;

        return $this;
    }

    /** @return array<Field> */
    public function getFields(): array
    {
        return array_map(
            fn (Field $field) => $field
                ->record($this->record)
                ->model($this->model instanceof Model ? $this->model : null),
            array_filter(
                $this->fields,
                fn (Field $field) => $field->isVisible()
            )
        );
    }

    public function getValidationRules(): array
    {
        return collect($this->getFields())
            ->mapWithKeys(fn (Field $field) => [$field->getName() => $field->getRules()])
            ->toArray();
    }

    protected function getEvaluationParameters(): array
    {
        $parameters = [];

        if ($this->record !== null) {
            $parameters['record'] = $this->record;
        }

        return $parameters;
    }

    public function fillForm(): array
    {
        $state = [];

        foreach ($this->getFields() as $field) {
            $state[$field->getName()] = $field->formatState(
                $this->record ? data_get($this->record, $field->getName()) : $field->getDefault()
            );
        }

        return $state;
    }

    protected function getFillUsing(): array
    {
        if (! $this->fillUsing) {
            return [];
        }

        return $this->evaluate($this->fillUsing, $this->getEvaluationParameters());
    }

    public function toData(): array
    {
        if (! $this->isVisible()) {
            return [];
        }

        $this->state = $this->getFillUsing();

        return array_merge(parent::toData(), [
            'recordId' => $this->record instanceof Model ? $this->record->getKey() : null,
            'fields' => array_map(
                fn (Field $field) => $field->toData(),
                $this->getFields()
            ),
            'state' => $this->state,
            'footerActions' => collect($this->getFooterActions())
                ->filter(fn (Action $action) => $action
                    ->parent($this)
                    ->record($this->getRecord())
                    ->args([
                        'data' => $this->state,
                    ])
                    ->isVisible()
                )
                ->map(fn (Action $action) => $action->toData())
                ->values()
                ->toArray(),
        ]);
    }

    public function getState(): array
    {
        $attributes = collect($this->getFields())
            ->mapWithKeys(fn (Field $field) => [$field->getName() => $field->getLabel()])
            ->toArray();

        return Validator::validate($this->state, $this->getValidationRules(), [], $attributes);
    }

    protected function submit(array $data): void
    {
        $fields = $this->getFields();

        $this->state = $data;

        $state = $this->getState();

        DB::transaction(function () use ($state, $fields) {
            foreach ($fields as $field) {
                if (! $field->getDehydrated()) {
                    continue;
                }

                $state[$field->getName()] = $field->dehydrateState($state[$field->getName()] ?? null, $state, []);
            }

            if ($this->submitUsing) {
                $this->evaluate($this->submitUsing, [
                    'data' => $state,
                    'record' => $this->record,
                ]);
            } else {
                if (! $this->model instanceof Model) {
                    throw new RuntimeException('Either define a submitUsing handler or use an Eloquent model.');
                }

                $record = $this->record instanceof Model && $this->record->exists
                    ? $this->record
                    : $this->model->newInstance();

                $record->fill($state);
                $record->save();

                foreach ($fields as $field) {
                    $field->saveState($state[$field->getName()] ?? null, $state);
                }

                Toast::make()
                    ->success()
                    ->send();
            }
        });
    }

    function getMountableActions(): array
    {
        return $this->getFooterActions();
    }

    protected function getFooterActions(): array
    {
        return array_merge($this->footerActions, [
            $this->getSubmitAction()
        ]);
    }

    public function getSubmitAction(): Action
    {
        $action = Action::make('submit')
            ->action(fn (array $data) => $this->submit($data));

        if ($this->submitAction) {
            $this->evaluate($this->submitAction, ['action' => $action]);
        }

        return $action;
    }

    public function getComponent(string $type, string $name): ?Component
    {
        return match ($type) {
            'fields' => $this->getField($name),
            default => null,
        };
    }

    protected function getField(string $name): ?Field
    {
        foreach ($this->getFields() as $field) {
            if ($field->getName() === $name) {
                return $field;
            }
        }

        return null;
    }
}
