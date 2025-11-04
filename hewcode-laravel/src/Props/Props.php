<?php

namespace Hewcode\Hewcode\Props;

use Exception;
use ReflectionClass;
use ReflectionException;
use Hewcode\Hewcode\Lists\Expose as ListingExpose;
use Hewcode\Hewcode\Actions\Expose as ActionsExpose;
use Illuminate\Contracts\Support\Arrayable;
use RuntimeException;
use InvalidArgumentException;

class Props implements Arrayable
{
    protected array $data = [];
    protected ?object $controller = null;
    protected array $componentNames = [];

    public static function make(?object $controller, array $data = []): static
    {
        return new static($controller, $data);
    }

    public function __construct(?object $controller, array $data = [])
    {
        $this->controller = $controller;
        $this->data = $data;
    }

    public function components(array $names): static
    {
        $this->componentNames = $names;

        return $this;
    }

    public static function for(?object $controller): static
    {
        return new static($controller);
    }

    public function toArray(): array
    {
        $discovered = $this->discoverComponents();
        return array_merge($this->data, $discovered);
    }

    protected function discoverComponents(): array
    {
        if ($this->controller === null) {
            throw new InvalidArgumentException('Controller must be set via components() method or forController()');
        }

        if (empty($this->componentNames)) {
            return [];
        }

        try {
            $reflection = new ReflectionClass($this->controller);
        } catch (ReflectionException) {
            throw new RuntimeException(
                sprintf('Unable to reflect controller class: %s', get_class($this->controller))
            );
        }

        $discovered = [];

        foreach ($this->componentNames as $componentName) {
            // Try to find a method with this name
            if (! $reflection->hasMethod($componentName)) {
                throw new InvalidArgumentException(
                    sprintf(
                        'Method %s::%s() does not exist',
                        get_class($this->controller),
                        $componentName
                    )
                );
            }

            $method = $reflection->getMethod($componentName);

            // Method must be public
            if (! $method->isPublic()) {
                throw new InvalidArgumentException(
                    sprintf(
                        'Method %s::%s() must be public',
                        get_class($this->controller),
                        $componentName
                    )
                );
            }

            // Method must have either Lists\Expose or Actions\Expose attribute
            $listingAttributes = $method->getAttributes(ListingExpose::class);
            $actionsAttributes = $method->getAttributes(ActionsExpose::class);

            if (empty($listingAttributes) && empty($actionsAttributes)) {
                throw new InvalidArgumentException(
                    sprintf(
                        'Method %s::%s() must have either #[Lists\\Expose] or #[Actions\\Expose] attribute',
                        get_class($this->controller),
                        $componentName
                    )
                );
            }

            // Check for method name conflicts with existing data
            if (isset($this->data[$componentName]) || isset($discovered[$componentName])) {
                throw new InvalidArgumentException(
                    sprintf(
                        'Key conflict: "%s" already exists in data or discovered components. Method %s::%s() conflicts with existing key.',
                        $componentName,
                        get_class($this->controller),
                        $componentName
                    )
                );
            }

            // Call the method to get the component
            try {
                $result = $method->invoke($this->controller);

                // Validate that result implements Discoverable interface
                if (! method_exists($result, 'component') || ! method_exists($result, 'toData')) {
                    throw new InvalidArgumentException(
                        sprintf(
                            'Method %s::%s() must return an object with component() and toData() methods',
                            get_class($this->controller),
                            $componentName
                        )
                    );
                }

                // Convert to data format
                $discovered[$componentName] = $result->component($componentName)->toData();

            } catch (Exception $e) {
                if ($e instanceof InvalidArgumentException) {
                    throw $e;
                }

                throw new RuntimeException(
                    sprintf(
                        'Error calling component method %s::%s(): %s',
                        get_class($this->controller),
                        $componentName,
                        $e->getMessage()
                    ),
                    0,
                    $e
                );
            }
        }

        return $discovered;
    }
}
