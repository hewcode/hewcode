<?php

namespace Hewcode\Hewcode\Lists\Filters;

use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;

class DateRangeFilter extends Filter
{
    public string $type = 'date-range';

    public function modifyQuery(Builder|\Illuminate\Database\Eloquent\Builder $query, mixed $value): void
    {
        if (is_array($value)) {
            if (!empty($value['from'])) {
                $query->whereDate($this->field, '>=', $value['from']);
            }
            if (!empty($value['to'])) {
                $query->whereDate($this->field, '<=', $value['to']);
            }
        }
    }

    public function modifyCollection(Collection $collection, mixed $value): Collection
    {
        if (!is_array($value)) {
            return $collection;
        }

        return $collection->filter(function ($item) use ($value) {
            $itemValue = data_get($item, $this->field);

            if (!$itemValue) {
                return false;
            }

            $itemDate = is_string($itemValue) ? strtotime($itemValue) : $itemValue;

            if (!empty($value['from'])) {
                $fromDate = strtotime($value['from']);
                if ($itemDate < $fromDate) {
                    return false;
                }
            }

            if (!empty($value['to'])) {
                $toDate = strtotime($value['to'] . ' 23:59:59'); // End of day
                if ($itemDate > $toDate) {
                    return false;
                }
            }

            return true;
        });
    }

    public function toData(): array
    {
        $state = $this->getState();

        return array_merge(parent::toData(), [
            'from' => $state['from'] ?? '',
            'to' => $state['to'] ?? '',
        ]);
    }
}

