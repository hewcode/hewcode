<?php

namespace Hewcode\Hewcode\Actions;

use Hewcode\Hewcode\Concerns;
use Hewcode\Hewcode\Contracts;
use Closure;
use Hewcode\Hewcode\Hewcode;
use Hewcode\Hewcode\Support\Component;
use Illuminate\Database\Eloquent\Model;

class Action extends Component implements Contracts\HasRecord, Contracts\HasVisibility, Contracts\MountsComponents
{
    use Concerns\InteractsWithRecord;
    use Concerns\HasVisibility;
    use Concerns\HasLabel;
    use Concerns\HasForm;
    use Concerns\HasModel;

    public string $color = 'primary';
    public ?Closure $action = null;
    public bool|Closure $requiresConfirmation = false;
    public array $context = [];
    public array|Closure $args = [];
    public Closure|string|null $modalHeading = null;
    public Closure|string|null $modalDescription = null;
    public bool $shouldClose = false;

    public function __construct()
    {
        $this->setUp();
    }

    public function setUp(): void
    {
        //
    }

    public static function make(string $name): static
    {
        return (new static())->name($name);
    }

    public function color(string $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function action(?Closure $action): static
    {
        $this->action = $action;

        return $this;
    }

    public function requiresConfirmation(bool|Closure $requiresConfirmation = true): static
    {
        $this->requiresConfirmation = $requiresConfirmation;

        return $this;
    }

    public function args(array|Closure $args): static
    {
        $this->args = $args;

        return $this;
    }

    public function modalHeading(Closure|string|null $modalHeading): static
    {
        $this->modalHeading = $modalHeading;

        return $this;
    }

    public function modalDescription(Closure|string|null $modalDescription): static
    {
        $this->modalDescription = $modalDescription;

        return $this;
    }

    public function close(): static
    {
        $this->shouldClose = true;

        Hewcode::shareWithResponse('actions', $this->getName(), [
            'shouldClose' => true,
        ]);

        return $this;
    }

    public function getModalHeading(): ?string
    {
        return $this->evaluate($this->modalHeading);
    }

    public function getModalDescription(): ?string
    {
        return $this->evaluate($this->modalDescription);
    }

    public function getRequiresConfirmation(): bool
    {
        return $this->evaluate($this->requiresConfirmation);
    }

    public function getArgs(): array
    {
        return $this->evaluate($this->args);
    }

    public function execute(array $args = []): mixed
    {
        if (! empty($this->getFormSchema())) {
            return [
                'form' => $this->getForm()->toData(),
            ];
        }

        if ($this->action) {
            return $this->evaluate($this->action, $args);
        }

        return null;
    }


    protected function getEvaluationParameters(): array
    {
        $parameters = [
            'action' => $this,
        ];

        if ($this->record !== null) {
            $parameters['record'] = $this->record;
        }

        if ($this->model !== null) {
            $parameters['model'] = $this->model;
        }

        return $parameters;
    }

    public function toData(): array
    {
        $context = $this->context;

        if ($this->record) {
            $context['recordId'] = $this->record instanceof Model
                ? (string) $this->record->getKey()
                : null;
        }

        if ($this->model) {
            $context['model'] = $this->model->getMorphClass();
        }

        return [
            'path' => $this->getPath(),
            'name' => $this->getName(),
            'label' => $this->getLabel(),
            'color' => $this->color,
            'requiresConfirmation' => $this->getRequiresConfirmation(),
            'context' => $context,
            'args' => $this->getArgs(),
            'mountsModal' => ! empty($this->getFormSchema()),
            'modalHeading' => $this->getModalHeading() ?? $this->getLabel(),
            'modalDescription' => $this->getModalDescription(),
        ];
    }

    public function getComponent(string $type, string $name): ?Component
    {
        return match ($type) {
            'form' => $this->getForm(),
            default => null,
        };
    }
}
