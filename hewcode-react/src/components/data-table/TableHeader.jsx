import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { throttle } from 'throttle-debounce';
import useTranslator from '../../hooks/useTranslator.js';
import setUrlQuery from '../../utils/setUrlQuery.js';
import { Input } from '../ui/input.jsx';
import ColumnsPopover from './ColumnsPopover.jsx';
import FiltersPopover from './FiltersPopover.jsx';

const performSearch = throttle(650, (e, urlPersistence) => {
  const [url, params] = setUrlQuery('search', e.target.value);

  router.get(url, params, {
    replace: true,
    preserveState: true,
    preserveUrl: !urlPersistence?.persistSearchInUrl,
  });
});

const TableHeader = ({
  showSearch = true,
  showFilter = true,
  showActions = true,
  searchPlaceholder,
  onSearch,
  onFilter,
  filterState,
  headerActions = [],
  filters = [],
  allColumns = [],
  columnVisibility = {},
  onColumnVisibilityChange,
  onBulkColumnVisibilityChange,
  urlPersistence = {
    persistFiltersInUrl: false,
    persistSortInUrl: false,
    persistColumnsInUrl: false,
    persistSearchInUrl: false,
  },
  currentValues = {
    search: null,
    sort: null,
    direction: null,
    filter: {},
    columns: {},
  },
  component,
  hash,
  route,
}) => {
  const [search, setSearch] = useState(currentValues.search || '');
  const { __ } = useTranslator();

  searchPlaceholder ||= __('hewcode.common.search') + '...';

  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center space-x-2">
        {showSearch && (
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              type="text"
              value={search || ''}
              placeholder={searchPlaceholder}
              className="pl-10"
              onChange={(e) => {
                setSearch(e.target.value);

                if (onSearch) {
                  onSearch(e.target.value);
                } else {
                  performSearch(e, urlPersistence);
                }
              }}
            />
          </div>
        )}
        {showFilter && filters.length > 0 && (
          <FiltersPopover filters={filters} state={filterState} onFilter={onFilter} route={route} component={component} hash={hash} />
        )}
        {allColumns.some((col) => col.togglable) && (
          <ColumnsPopover
            columns={allColumns}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={onColumnVisibilityChange}
            onBulkColumnVisibilityChange={onBulkColumnVisibilityChange}
          />
        )}
      </div>
      {showActions && headerActions.length > 0 && <div className="flex items-center space-x-2">{headerActions}</div>}
    </div>
  );
};

export default TableHeader;
