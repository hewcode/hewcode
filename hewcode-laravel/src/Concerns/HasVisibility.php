<?php

namespace Hewcode\Hewcode\Concerns;

use Closure;

trait HasVisibility
{
    protected bool|Closure $visible = true;

    public function visible(bool|Closure $visible): static
    {
        $this->visible = $visible;

        return $this;
    }

    public function isVisible(): bool
    {
        if (is_bool($this->visible)) {
            return $this->visible;
        }

        if ($this->visible instanceof Closure) {
            return (bool) $this->evaluate($this->visible);
        }

        return true;
    }
}