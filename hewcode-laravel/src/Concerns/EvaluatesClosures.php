<?php

namespace Hewcode\Hewcode\Concerns;

use Closure;
use Hewcode\Hewcode\Contracts\HasRecord;
use Hewcode\Hewcode\Support\Context;

trait EvaluatesClosures
{
    protected array $sharedEvaluationParameters = [];

    public function shareEvaluationParameters(array $parameters): static
    {
        $this->sharedEvaluationParameters = array_merge(
            $this->sharedEvaluationParameters,
            $parameters,
        );

        return $this;
    }

    protected function evaluate(mixed $callback, array $additionalParameters = []): mixed
    {
        if (! $callback instanceof Closure) {
            return $callback;
        }

        // Get class-specific evaluation parameters
        $globalParameters = $this->getEvaluationParameters();

        // Merge with any shared evaluation parameters
        $globalParameters = array_merge(
            $globalParameters,
            $this->sharedEvaluationParameters,
        );

        // Merge with any additional parameters passed to this call
        $parameters = array_merge($globalParameters, $additionalParameters);

        $parameters['component'] = $this;

        if ($this instanceof HasRecord && ! array_key_exists('record', $parameters)) {
            $parameters['record'] = $this->getRecord();
        }

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
        if (property_exists($this, 'context') && $this->context instanceof Context) {
            return [
                'context' => $this->context,
            ];
        }

        return [];
    }
}
