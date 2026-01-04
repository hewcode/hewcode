<?php

namespace Hewcode\Hewcode\Support;

use Hewcode\Hewcode\Concerns\EvaluatesClosures;

class Component
{
    use EvaluatesClosures;

    protected ?string $name = null;

    protected ?self $parent = null;

    public function name(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function parent(?self $parent): static
    {
        $this->parent = $parent;

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getParent(): ?self
    {
        return $this->parent;
    }

    public function getPath(): string
    {
        if ($this->parent) {
            return $this->parent->getPath() . '.' . $this->getName();
        }

        return $this->getName();
    }

    public function toData(): array
    {
        return [
            'name' => $this->name,
        ];
    }
}
