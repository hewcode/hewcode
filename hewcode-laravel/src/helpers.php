<?php

namespace Hewcode\Hewcode;

use Hewcode\Hewcode\Support\Expose;
use ReflectionMethod;

function flattenLocaleArray(array $array, string $prefix = ''): array
{
    $result = [];

    foreach ($array as $key => $value) {
        // if the key is a class fqn, transform it to a snake case of just the class name
        if (is_string($key) && class_exists($key)) {
            $key = str($key)->afterLast('\\')->snake()->toString();
        }

        $newKey = $prefix === '' ? $key : $prefix . '.' . $key;

        if (is_array($value)) {
            $result += flattenLocaleArray($value, $newKey);
        } else {
            $result[$newKey] = $value;
        }
    }

    return $result;
}

function generateComponentHash(string $component, ?string $route = null): string
{
    $route = $route ?? request()->route()->getName();
    $userId = auth()->id();

    return hash_hmac('sha256', $component . '|' . $route . '|' . $userId, config('app.key'));
}

function exposed(object $component, string $method): bool
{
    return count((new ReflectionMethod($component, $method))->getAttributes(Expose::class)) > 0;
}
