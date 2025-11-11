import { Filter } from 'lucide-react';
import useTranslator from '../../hooks/useTranslator.js';
import CompactButton from '../support/compact-button.jsx';
import DateRangePicker from '../support/date-range-picker.jsx';
import TextInput from '../support/text-input.jsx';
import { Badge } from '../ui/badge.jsx';
import { Button } from '../ui/button.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover.jsx';
import SelectFilter from './SelectFilter.jsx';

export default function FiltersPopover({ filters, state, onFilter, route, component, hash }) {
  const { __ } = useTranslator();
  const activeFiltersCount = Object.entries(state || {}).filter(([_, value]) => value !== null && value !== '').length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative gap-2">
          <Filter className="h-4 w-4" />
          {!!activeFiltersCount && (
            <Badge variant="secondary" className="absolute -right-2 -top-2 ml-1 h-5 w-5 rounded-full px-1 py-0 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{__('hewcode.common.filters')}</h4>
            <CompactButton onClick={() => onFilter(null)} variant="ghost">
              {__('hewcode.common.clear_all')}
            </CompactButton>
          </div>

          <div className="space-y-3">
            {filters.map((filter) => (
              <div key={filter.name}>
                {/*<label className="mb-2 block text-sm font-medium">{filter.label}</label>*/}
                {{
                  select: renderSelectFilter,
                  'date-range': renderDateRangeFilter,
                  text: renderTextFilter,
                  // Add more filter types here
                }[filter.type]?.({
                  filter,
                  label: filter.label,
                  state: state?.[filter.name] || null,
                  onChange: (value) => {
                    onFilter({ ...state, [filter.name]: value });
                  },
                  route,
                  component,
                  hash,
                })}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function renderSelectFilter({ filter, label, state, onChange, route, component, hash }) {
  return (
    <SelectFilter
      label={label}
      options={filter.options}
      value={state}
      onChange={onChange}
      multiple={filter.multiple}
      searchable={filter.searchable}
      route={route}
      component={component}
      hash={hash}
      filterName={filter.name}
    />
  );
}

function renderDateRangeFilter({ filter, label, state, onChange }) {
  return <DateRangePicker label={label} from={state?.from || ''} to={state?.to || ''} onChange={onChange} />;
}

function renderTextFilter({ filter, label, state, onChange }) {
  return (
    <TextInput
      label={label}
      value={state || ''}
      onChange={(value) => onChange(value)}
      placeholder={filter.placeholder || ''}
      className="w-full"
      autoComplete="off"
      spellCheck="false"
      type="text"
    />
  );
}
