<?php

namespace Hewcode\Hewcode\Actions;

use Hewcode\Hewcode\Concerns\InteractsWithRecord;
use Hewcode\Hewcode\Concerns\HasVisibility;
use Hewcode\Hewcode\Concerns\EvaluatesClosures;
use Hewcode\Hewcode\Contracts\Discoverable;
use Hewcode\Hewcode\Contracts\HasRecord;
use Hewcode\Hewcode\Contracts\WithVisibility;
use Closure;
use Illuminate\Support\Facades\Route;
use function Hewcode\Hewcode\generateComponentHash;

class Action implements Discoverable, HasRecord, WithVisibility
{
    use InteractsWithRecord, HasVisibility, EvaluatesClosures;

    public ?string $component = null;
    public string $name;
    public string $label;
    public string $color = 'primary';
    public ?Closure $action = null;
    public bool|Closure $requiresConfirmation = false;

    public static function make(string $name): static
    {
        return (new static())->name($name);
    }

    public function component(string $component): static
    {
        $this->component = $component;

        return $this;
    }

    public function name(string $name): static
    {
        $this->name = $name;
        $this->label ??= ucfirst($name);

        return $this;
    }

    public function label(string $label): static
    {
        $this->label = $label;

        return $this;
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

    public function getRequiresConfirmation(): bool
    {
        return $this->evaluate($this->requiresConfirmation);
    }

    public function execute(array $args = []): mixed
    {
        if ($this->action) {
            return $this->evaluate($this->action, $args);
        }

        return null;
    }


    protected function getEvaluationParameters(): array
    {
        $parameters = [];

        if ($this->record !== null) {
            $parameters['record'] = $this->record;
        }

        return $parameters;
    }

    public function toData(): array
    {
        return [
            'component' => $this->component,
            'route' => Route::currentRouteName(),
            'name' => $this->name,
            'label' => $this->label,
            'color' => $this->color,
            'hash' => generateComponentHash($this->component, Route::currentRouteName()),
            'requiresConfirmation' => $this->getRequiresConfirmation(),
        ];
    }
}
