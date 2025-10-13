import { router } from '@inertiajs/react';
import { useState } from 'react';
import { getContrastColor, getTailwindBadgeClasses, getTailwindBgClass, isHexColor } from '../../lib/colors.js';
import setUrlQuery from '../../utils/setUrlQuery.js';
import Action from '../Action.jsx';
import { Badge as ShadcnBadge } from '../ui/badge.jsx';
import { Checkbox } from '../ui/checkbox.jsx';
import { TableHeader as ShadcnTableHeader, Table, TableBody, TableCell, TableRow } from '../ui/table.jsx';
import Badge from './Badge.jsx';
import BulkActions from './BulkActions.jsx';
import Pagination from './Pagination.jsx';
import TableColumnHeader from './TableColumnHeader.jsx';
import TableHeader from './TableHeader.jsx';
import TableRowActions from './TableRowActions.jsx';

const DataTable = ({
  records = [],
  columns = [],
  allColumns = [],
  bulkActions = [],
  showSearch = true,
  showFilter = true,
  showActions = true,
  showPagination = true,
  searchPlaceholder,
  headerActions = [],
  sortable = [],
  filters = null,
  tabs = [],
  activeTab = null,
  onSearch,
  onFilter,
  onTab,
  onSort,
  pagination = {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  },
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
  thClassName = '',
  tdClassName = '',
  theadClassName = '',
}) => {
  const [sortConfig, setSortConfig] = useState({
    sort: currentValues.sort,
    direction: currentValues.direction,
  });
  const [filterState, setFilterState] = useState(currentValues.filter || {});
  const [selectedRecords, setSelectedRecords] = useState(new Set());

  // Initialize column visibility state based on togglable columns and their defaults
  const initializeColumnVisibility = () => {
    const savedVisibility = currentValues.columns || {};
    const visibility = {};

    allColumns.forEach((column) => {
      if (column.togglable) {
        // Check if there's a saved state, otherwise use the default
        if (savedVisibility.hasOwnProperty(column.key)) {
          visibility[column.key] = savedVisibility[column.key];
        } else {
          visibility[column.key] = !column.isToggledHiddenByDefault;
        }
      } else {
        // Non-togglable columns are always visible
        visibility[column.key] = true;
      }
    });

    return visibility;
  };

  const [columnVisibility, setColumnVisibility] = useState(initializeColumnVisibility);

  const handleSort = (columnKey) => {
    if (!sortable.includes(columnKey)) return;

    const direction = sortConfig.sort === columnKey ? (sortConfig.direction === 'asc' ? 'desc' : null) : 'asc';

    if (!direction) {
      columnKey = null;
    }

    setSortConfig({ sort: columnKey, direction });

    if (onSort) {
      onSort?.(columnKey, direction);
    } else {
      let [url1, params] = setUrlQuery('sort', columnKey);
      const [url, params2] = setUrlQuery('direction', direction, url1);

      router.get(
        url,
        { ...params, ...params2 },
        {
          replace: true,
          preserveState: true,
          preserveUrl: !urlPersistence.persistSortInUrl,
        },
      );
    }
  };

  // Handle column visibility changes
  const handleColumnVisibilityChange = (columnKey, isVisible) => {
    const newVisibility = { ...columnVisibility, [columnKey]: isVisible };
    setColumnVisibility(newVisibility);

    // Convert to array format - only include visible columns
    const visibleColumns = Object.entries(newVisibility)
      .filter(([key, visible]) => visible)
      .map(([key]) => key);

    // Save to URL for persistence
    const [url, params] = setUrlQuery('columns', visibleColumns);
    router.get(url, params, {
      replace: true,
      preserveState: true,
      preserveUrl: !urlPersistence.persistColumnsInUrl,
    });
  };

  // Handle bulk column visibility changes (for show all, hide all, reset)
  const handleBulkColumnVisibilityChange = (newVisibility, isReset = false) => {
    setColumnVisibility(newVisibility);

    // Convert to array format - only include visible columns
    const visibleColumns = Object.entries(newVisibility)
      .filter(([key, visible]) => visible)
      .map(([key]) => key);

    // Save to URL for persistence
    const [url, params] = setUrlQuery('columns', visibleColumns);

    // Add clear parameter when resetting columns
    if (isReset) {
      params.clear = 'columns';
    }

    router.get(url, params, {
      replace: true,
      preserveState: true,
      preserveUrl: !urlPersistence.persistColumnsInUrl,
    });
  };

  // Filter visible columns based on visibility state
  const visibleColumns = columns.filter((column) => columnVisibility[column.key] !== false);

  // Bulk selection functions
  const hasBulkActions = bulkActions && bulkActions.length > 0;
  const allRecordIds = records.map((record) => record.id);
  const isAllSelected = allRecordIds.length > 0 && allRecordIds.every((id) => selectedRecords.has(id));
  const isIndeterminate = selectedRecords.size > 0 && !isAllSelected;

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRecords(new Set(allRecordIds));
    } else {
      setSelectedRecords(new Set());
    }
  };

  const handleSelectRecord = (recordId, checked) => {
    const newSelection = new Set(selectedRecords);
    if (checked) {
      newSelection.add(recordId);
    } else {
      newSelection.delete(recordId);
    }
    setSelectedRecords(newSelection);
  };

  const renderCellContent = (item, column) => {
    if (column.render) {
      return column.render(item[column.key], item);
    }

    if (column.type === 'status') {
      return <Badge status={item[column.key]?.label} color={item[column.key]?.color} />;
    }

    const beforeContent = item[column.key + '_before'];
    const afterContent = item[column.key + '_after'];
    const badgeColor = item[column.key + '_color'];

    let mainContent;
    if (column.badge) {
      const badgeProps = {
        variant: column.badgeVariant || 'default',
      };

      // Apply custom color styling
      if (badgeColor) {
        const tailwindBadgeClasses = getTailwindBadgeClasses(badgeColor);

        if (tailwindBadgeClasses) {
          // Use Tailwind classes for named colors
          badgeProps.className = `border-transparent ${tailwindBadgeClasses}`;
        } else if (isHexColor(badgeColor)) {
          // Use inline styles for hex colors
          badgeProps.style = {
            backgroundColor: badgeColor,
            color: getContrastColor(badgeColor),
            borderColor: badgeColor,
          };
          badgeProps.className = 'border-transparent';
        }
      }

      mainContent = <ShadcnBadge {...badgeProps}>{item[column.key]}</ShadcnBadge>;
    } else {
      mainContent = item[column.key];
    }

    // If there's before or after content, wrap in a div
    if (beforeContent || afterContent) {
      return (
        <div className="space-y-1">
          {beforeContent && <div className="text-muted-foreground text-xs">{beforeContent}</div>}
          <div>{mainContent}</div>
          {afterContent && <div className="text-muted-foreground text-xs">{afterContent}</div>}
        </div>
      );
    }

    return mainContent;
  };

  onFilter ||= (state) => {
    setFilterState(state);

    const [url, params] = setUrlQuery('filter', state);

    // Add clear parameter when clearing filters
    if (state === null) {
      params.clear = 'filters';
    }

    router.get(url, params, {
      replace: true,
      preserveState: true,
      preserveUrl: !urlPersistence.persistFiltersInUrl,
    });
  };

  onTab ||= (tab) => {
    const [url, params] = setUrlQuery('activeTab', tab);

    // Add clear parameter when clearing tabs
    if (tab === null) {
      params.clear = 'activeTab';
    }

    router.get(url, params, {
      replace: true,
      preserveState: true,
      preserveUrl: true,
    });
  };

  const rowActions = records.some((record) => record._row_actions);

  return (
    <div className="w-full">
      {((showSearch || showActions || filters || allColumns.some((col) => col.togglable)) && (
        <TableHeader
          showSearch={showSearch}
          showFilter={showFilter}
          showActions={showActions}
          searchPlaceholder={searchPlaceholder}
          filters={filters}
          filterState={filterState}
          tabs={tabs}
          activeTab={activeTab}
          onSearch={onSearch}
          onFilter={onFilter}
          onTab={onTab}
          headerActions={headerActions}
          allColumns={allColumns}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={handleColumnVisibilityChange}
          onBulkColumnVisibilityChange={handleBulkColumnVisibilityChange}
          urlPersistence={urlPersistence}
          currentValues={currentValues}
          component={component}
          hash={hash}
          route={route}
        />
      )) ||
        null}

      {hasBulkActions && selectedRecords.size > 0 && (
        <BulkActions
          selectedCount={selectedRecords.size}
          bulkActions={bulkActions}
          selectedRecords={Array.from(selectedRecords)}
          onClearSelection={() => setSelectedRecords(new Set())}
        />
      )}

      <Table>
        <ShadcnTableHeader className={theadClassName}>
          <TableRow>
            {hasBulkActions && (
              <TableColumnHeader
                label={<Checkbox checked={isAllSelected} indeterminate={isIndeterminate} onCheckedChange={handleSelectAll} aria-label="Select all" />}
                className={thClassName}
              />
            )}
            {visibleColumns
              .filter((col) => !col.hidden)
              .map((column) => (
                <TableColumnHeader
                  key={column.key}
                  label={column.label}
                  sortable={sortable.includes(column.key)}
                  sortDirection={sortConfig.sort === column.key ? sortConfig.direction : null}
                  onSort={() => handleSort(column.key)}
                  colSpan={rowActions && column.key === visibleColumns[visibleColumns.length - 1].key ? 2 : 1}
                  className={thClassName}
                />
              ))}
          </TableRow>
        </ShadcnTableHeader>
        <TableBody>
          {records.map((record, index) => {
            const rowBgColor = record._row_bg_color;
            const tailwindBgClass = getTailwindBgClass(rowBgColor);

            // Use Tailwind classes if available, otherwise fallback to inline styles
            const rowStyle = tailwindBgClass ? undefined : rowBgColor && isHexColor(rowBgColor) ? { backgroundColor: rowBgColor } : undefined;
            const rowClassName = tailwindBgClass || '';

            return (
              <TableRow key={record.id || index} style={rowStyle} className={rowClassName}>
                {hasBulkActions && (
                  <TableCell className={tdClassName}>
                    <Checkbox
                      checked={selectedRecords.has(record.id)}
                      onCheckedChange={(checked) => handleSelectRecord(record.id, checked)}
                      aria-label={`Select record ${record.id}`}
                    />
                  </TableCell>
                )}
                {visibleColumns
                  .filter((col) => !col.hidden)
                  .map((column) => (
                    <TableCell key={column.key} className={`${tdClassName} ${column.wrap ? 'whitespace-normal break-words' : 'whitespace-nowrap'}`}>
                      {renderCellContent(record, column)}
                    </TableCell>
                  ))}
                <TableRowActions
                  actions={record._row_actions ? Object.values(record._row_actions).map((action) => <Action key={action.name} {...action} />) : null}
                />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Pagination
        showPagination={showPagination}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        itemsPerPage={pagination.itemsPerPage}
      />
    </div>
  );
};

/* Example usage:
const ExampleUsage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const sampleData = [
    {
      id: 1,
      reference: '2025-0011',
      customer: 'Everleigh Avalos',
      status: 'Signed',
      scheduledFor: '05-06-2025',
      createdAt: '05-06-2025 15:02',
    },
    {
      id: 2,
      reference: '2025-0011',
      customer: 'Enzo Stanley',
      status: 'Draft',
      scheduledFor: '05-06-2025',
      createdAt: '05-06-2025 15:02',
    },
    {
      id: 3,
      reference: '2025-0011',
      customer: 'Blaze Navarro',
      status: 'Open',
      scheduledFor: '05-06-2025',
      createdAt: '05-06-2025 15:02',
    },
    {
      id: 4,
      reference: '2025-0011',
      customer: 'Romina Stevenson',
      status: 'Scheduled',
      scheduledFor: '05-06-2025',
      createdAt: '05-06-2025 15:02',
    },
    {
      id: 5,
      reference: '2025-0011',
      customer: 'Khalil Webster',
      status: 'Ordered',
      scheduledFor: '05-06-2025',
      createdAt: '05-06-2025 15:02',
    },
  ];

  const columns = [
    { key: 'reference', label: 'Reference' },
    { key: 'customer', label: 'Customer' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'scheduledFor', label: 'Scheduled for' },
    { key: 'createdAt', label: 'Created at' },
  ];

  const headerActions = [
    {
      label: 'Create Quote',
      variant: 'primary',
      onClick: () => alert('Create Quote clicked'),
    },
  ];

  const rowActions = [
    {
      icon: Eye,
      label: 'View',
      onClick: () => alert('View clicked'),
    },
    {
      icon: Edit2,
      label: 'Edit',
      onClick: () => alert('Edit clicked'),
    },
    {
      icon: Trash2,
      label: 'Delete',
      onClick: () => alert('Delete clicked'),
    },
  ];

  const sortableColumns = {
    reference: true,
    customer: true,
    status: true,
    scheduledFor: true,
    createdAt: true,
  };

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <DataTable
        records={sampleData}
        columns={columns}
        showSearch={true}
        showFilter={true}
        showActions={true}
        showPagination={true}
        searchPlaceholder='Search...'
        headerActions={headerActions}
        rowActions={rowActions}
        sortable={sortableColumns}
        onSearch={query => console.log('Search:', query)}
        onFilter={() => console.log('Filter clicked')}
        onSort={(column, direction) => console.log('Sort:', column, direction)}
        pagination={{
          currentPage: currentPage,
          totalPages: 6,
          totalItems: 56,
          itemsPerPage: 20,
        }}
      />
    </div>
  );
};
 */

export default DataTable;
