<?php

namespace Hewcode\Hewcode\Concerns;

use Closure;

trait HasVisibility
{
    protected bool|Closure|null $visible = null;

    public function visible(bool|Closure $visible = true): static
    {
        $this->visible = $visible;

        return $this;
    }

    public function isVisible(): bool
    {
        if ($this->visible === null) {
            return true;
        }

        if (is_bool($this->visible)) {
            return $this->visible;
        }

        if ($this->visible instanceof Closure) {
            return (bool) $this->evaluate($this->visible);
        }

        return true;
    }
}
