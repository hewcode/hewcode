import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { throttle } from 'throttle-debounce';
import { Input } from '../ui/input.jsx';
import useTranslator from '../../hooks/useTranslator.js';
import setUrlQuery from '../../utils/setUrlQuery.js';
import FiltersPopover from './FiltersPopover.jsx';
import ColumnsPopover from './ColumnsPopover.jsx';

const performSearch = throttle(650, (e, urlPersistence) => {
  const [url, params] = setUrlQuery('search', e.target.value);

  router.get(url, params, {
    replace: true,
    preserveState: true,
    preserveUrl: !urlPersistence?.persistSearchInUrl
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
}) => {
  const [search, setSearch] = useState(currentValues.search || '');
  const { __ } = useTranslator();

  searchPlaceholder ||= __('hewcode.common.search') + '...';

  return (
    <div className="p-6 flex items-center justify-between">
      <div className="space-x-4 flex items-center">
        {showSearch && (
          <div className="relative">
            <Search className="left-3 text-gray-400 h-4 w-4 absolute top-1/2 -translate-y-1/2 transform pointer-events-none" />
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
        {showFilter && filters.length > 0 && <FiltersPopover filters={filters} state={filterState} onFilter={onFilter} />}
        {allColumns.some(col => col.togglable) && (
          <ColumnsPopover
            columns={allColumns}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={onColumnVisibilityChange}
            onBulkColumnVisibilityChange={onBulkColumnVisibilityChange}
          />
        )}
      </div>
      {showActions && headerActions.length > 0 && <div className="space-x-2 flex items-center">{headerActions}</div>}
    </div>
  );
};

export default TableHeader;
