<?php

namespace Hewcode\Hewcode;

use Hewcode\Hewcode\Support\Expose;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
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

function generateFieldLabel(string $name): string
{
    // Handle dot notation for labels - convert "category.name" to "Category Name"
    if (str_contains($name, '.')) {
        $parts = explode('.', $name);
        return str(implode(' ', $parts))->title()->toString();
    }

    return str($name)->title()->toString();
}

function resolveLocaleLabel(string $fieldName, ?Model $model = null): string
{
    if (! $model) {
        return generateFieldLabel($fieldName);
    }

    // Handle relationship columns like "category.name"
    if (str_contains($fieldName, '.')) {
        $parts = explode('.', $fieldName);
        $relationshipName = $parts[0];
        $columnName = $parts[1];

        // Try to get the related model's table name
        if ($model->isRelation($relationshipName)) {
            $relationship = $model->{$relationshipName}();
            $relatedModel = $relationship->getRelated();
            $relatedTableName = $relatedModel->getTable();
            $pluralModel = Str::camel($relatedTableName);

            $localeKey = "app.$pluralModel.columns.$columnName";
        } else {
            // Fallback to current model if relationship doesn't exist
            $tableName = $model->getTable();
            $pluralModel = Str::camel($tableName);
            $localeKey = "app.$pluralModel.columns.$fieldName";
        }
    } else {
        // Regular column - use current model
        $tableName = $model->getTable();
        $pluralModel = Str::camel($tableName);
        $localeKey = "app.$pluralModel.columns.$fieldName";
    }

    if (__($localeKey) !== $localeKey) {
        return __($localeKey);
    }

    return generateFieldLabel($fieldName);
}
