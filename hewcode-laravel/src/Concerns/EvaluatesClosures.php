<?php

namespace Hewcode\Hewcode\Concerns;

use Closure;

trait EvaluatesClosures
{
    protected function evaluate(mixed $callback, array $additionalParameters = []): mixed
    {
        if (! $callback instanceof Closure) {
            return $callback;
        }

        // Get class-specific evaluation parameters
        $globalParameters = method_exists($this, 'getEvaluationParameters')
            ? $this->getEvaluationParameters()
            : [];

        // Merge with any additional parameters passed to this call
        $parameters = array_merge($globalParameters, $additionalParameters);

        $parameters['component'] = $this;

        return app()->call($callback, $parameters);
    }

    /**
     * Override this method in implementing classes to provide global parameters
     * that should be available to all closure evaluations in that class.
     *
     * @return array<string, mixed>
     */
    protected function getEvaluationParameters(): array
    {
        return [];
    }
}
