<?php

namespace Hewcode\Hewcode\Lists\Drivers;

use Hewcode\Hewcode\Lists\Filters\Filter;
use Hewcode\Hewcode\Lists\Schema\Column;

interface ListingDriver
{
    /**
     * Apply search filtering to the data source.
     *
     * @param string $searchTerm The search term to filter by
     * @param array $searchableFields Array of field names that can be searched
     */
    public function applySearch(string $searchTerm, array $searchableFields): void;

    /**
     * Apply filters to the data source.
     *
     * @param Filter[] $filters Array of Filter instances to apply
     */
    public function applyFilters(array $filters): void;

    /**
     * Apply sorting to the data source.
     *
     * @param string|null $sortField The field to sort by
     * @param string|null $sortDirection The sort direction ('asc' or 'desc')
     * @param array $sortableFields Array of sortable fields with labels
     */
    public function applySort(?string $sortField, ?string $sortDirection, array $sortableFields): void;

    /**
     * Paginate the data and return records with pagination metadata.
     *
     * @param int $perPage Number of items per page
     * @return array Array containing 'records' and 'pagination' keys
     */
    public function paginate(int $perPage): array;

    /**
     * Get all records without pagination (used for non-paginated results).
     *
     * @param Column[] $columns Array of Column instances for context
     * @return array Array of all records
     */
    public function getRecords(array $columns): array;
}