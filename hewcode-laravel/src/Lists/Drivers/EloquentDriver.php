<?php

namespace Hewcode\Hewcode\Lists\Drivers;

use Hewcode\Hewcode\Lists\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;

class EloquentDriver implements ListingDriver
{
    public function __construct(
        protected Builder $query
    ) {}

    public function applySearch(string $searchTerm, array $searchableFields): void
    {
        if (empty($searchableFields)) {
            return;
        }

        $this->query->where(function (Builder $query) use ($searchTerm, $searchableFields) {
            foreach ($searchableFields as $field) {
                if (str_contains($field, '.')) {
                    $parts = explode('.', $field);

                    $query->orWhereHas($parts[0], function (Builder $query) use ($parts, $searchTerm) {
                        $query->whereLike(str($parts[1])->snake()->toString(), "%$searchTerm%");
                    });
                } else {
                    $query->orWhereLike($field, "%$searchTerm%");
                }
            }
        });
    }

    public function applyFilters(array $filters): void
    {
        foreach ($filters as $filter) {
            $this->applyFilterToQuery($filter, $this->query);
        }
    }

    public function applyFilterToQuery(Filter $filter, Builder $query): Builder
    {
        $filter->filterUsing?->__invoke($query);

        return $query->when($filter->filled(), function (Builder $query) use ($filter) {
            $value = $filter->getState();

            $filter->validate();

            $filter->modifyQuery($query, $value);
        });
    }

    public function applySort(?string $sortField, ?string $sortDirection, array $sortableFields): void
    {
        if (! $sortField || ! array_key_exists($sortField, $sortableFields)) {
            return;
        }

        $sortDirection = $sortDirection === 'desc' ? 'desc' : 'asc';

        if (! str_contains($sortField, '.')) {
            $this->query->orderBy(str($sortField)->snake()->toString(), $sortDirection);
        } else {
            $relationshipName = str($sortField)->beforeLast('.')->toString();
            $sortColumn = str($sortField)->afterLast('.')->toString();
            $relationships = explode('.', $relationshipName);

            $this->query->orderBy($this->getSortColumnForQuery($this->query, $sortColumn, $relationships), $sortDirection);
        }
    }

    public function paginate(int $perPage): array
    {
        $records = $this->query->paginate($perPage);

        return [
            'records' => $records->getCollection(),
            'pagination' => [
                'currentPage' => $records->currentPage(),
                'totalPages' => $records->lastPage(),
                'totalItems' => $records->total(),
                'itemsPerPage' => $records->perPage(),
            ],
        ];
    }

    public function getRecords(array $columns): array
    {
        return $this->query->get()->toArray();
    }

    private function getSortColumnForQuery(Builder $query, string $sortColumn, ?array $relationships = null): string|\Illuminate\Database\Query\Builder
    {
        $currentRelationshipName = array_shift($relationships);

        if (! $currentRelationshipName) {
            return $sortColumn;
        }

        $relationship = $this->getRelationship($query->getModel(), $currentRelationshipName);

        $relatedQuery = $relationship->getRelated()::query();

        return $relationship
            ->getRelationExistenceQuery(
                $relatedQuery,
                $query,
                [$currentRelationshipName => $this->getSortColumnForQuery(
                    $relatedQuery,
                    $sortColumn,
                    $relationships,
                )],
            )
            ->applyScopes()
            ->getQuery();
    }

    private function getRelationship(Model $record, string $name): ?Relation
    {
        if (blank($name)) {
            return null;
        }

        $relationship = null;

        foreach (explode('.', $name) as $nestedRelationshipName) {
            if (! $record->isRelation($nestedRelationshipName)) {
                $relationship = null;

                break;
            }

            $relationship = $record->{$nestedRelationshipName}();
            $record = $relationship->getRelated();
        }

        return $relationship;
    }
}
