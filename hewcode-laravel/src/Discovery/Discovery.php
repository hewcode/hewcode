<?php

namespace Hewcode\Hewcode\Discovery;

use Exception;
use ReflectionClass;
use ReflectionException;
use ReflectionMethod;
use Hewcode\Hewcode\Lists\Expose as ListingExpose;
use Hewcode\Hewcode\Actions\Expose as ActionsExpose;
use Hewcode\Hewcode\Contracts\Discoverable;
use Illuminate\Contracts\Support\Arrayable;
use RuntimeException;
use InvalidArgumentException;

class Discovery implements Arrayable
{
    protected ?object $controller;
    protected array $data = [];
    protected ?array $only = null;

    public static function for($controller): static
    {
        return new static($controller);
    }

    public function __construct(object $controller)
    {
        $this->controller = $controller;
    }

    public function withData(array $data): static
    {
        $this->data = array_merge($this->data, $data);

        return $this;
    }

    public function with(string $key, $value): static
    {
        $this->data[$key] = $value;

        return $this;
    }

    public function only(array $keys): static
    {
        $this->only = $keys;

        return $this;
    }

    public function toArray(): array
    {
        $discovered = $this->discover();

        return array_merge($this->data, $discovered);
    }

    protected function discover(): array
    {
        if ($this->controller === null) {
            throw new InvalidArgumentException('Controller cannot be null');
        }

        try {
            $reflection = new ReflectionClass($this->controller);
        } catch (ReflectionException) {
            throw new RuntimeException(
                sprintf('Unable to reflect controller class: %s', get_class($this->controller))
            );
        }

        $discoveries = [];

        foreach ($reflection->getMethods() as $method) {
            // Only consider public methods
            if (! $method->isPublic()) {
                continue;
            }

            $listingAttributes = $method->getAttributes(ListingExpose::class);
            $actionsAttributes = $method->getAttributes(ActionsExpose::class);

            if (empty($listingAttributes) && empty($actionsAttributes)) {
                continue;
            }

            // Determine which attribute is present and get the key
            if (! empty($listingAttributes)) {
                $attribute = $listingAttributes[0]->newInstance();
                $key = $attribute->key ?? $method->getName();
            } else {
                $attribute = $actionsAttributes[0]->newInstance();
                $key = $attribute->key ?? $method->getName();
            }

            // Check if we should only discover specific keys
            if ($this->only !== null && ! in_array($key, $this->only)) {
                continue;
            }

            // Check if key already exists in data or discoveries
            if (isset($this->data[$key]) || isset($discoveries[$key])) {
                throw new InvalidArgumentException(
                    sprintf(
                        'Key conflict: "%s" already exists in data or discovered listings. Method %s::%s() conflicts with existing key.',
                        $key,
                        get_class($this->controller),
                        $method->getName()
                    )
                );
            }

            // Call the method to get the listing/actions
            try {
                $result = $method->invoke($this->controller);

                // Validate that result implements Discoverable interface
                if (! $result instanceof Discoverable) {
                    throw new InvalidArgumentException(
                        sprintf(
                            'Method %s::%s() with attribute must return an object implementing Discoverable interface, got %s',
                            get_class($this->controller),
                            $method->getName(),
                            get_class($result)
                        )
                    );
                }

                // Convert to data format
                $discoveries[$key] = $result->component($key)->toData();

            } catch (Exception $e) {
                if ($e instanceof InvalidArgumentException) {
                    throw $e;
                }

                throw new RuntimeException(
                    sprintf(
                        'Error calling listing method %s::%s(): %s',
                        get_class($this->controller),
                        $method->getName(),
                        $e->getMessage()
                    ),
                    0,
                    $e
                );
            }
        }

        return $discoveries;
    }
}
