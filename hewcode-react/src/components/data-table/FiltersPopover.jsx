import { Filter } from 'lucide-react';
import { Badge } from '../ui/badge.jsx';
import { Button } from '../ui/button.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover.jsx';
import useTranslator from '../../hooks/useTranslator.js';
import CompactButton from './CompactButton.jsx';
import DateRangePicker from './DateRangePicker.jsx';
import Select from './Select.jsx';
import TextInput from './TextInput.jsx';

export default function FiltersPopover({ filters, state, onFilter }) {
  const { __ } = useTranslator();
  const activeFiltersCount = Object.entries(state || {}).filter(([_, value]) => value !== null && value !== '').length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="gap-2 relative">
          <Filter className="h-4 w-4" />
          {!!activeFiltersCount && (
            <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs h-5 w-5 rounded-full absolute -top-2 -right-2">
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
                <label className="text-sm font-medium mb-2 block">{filter.label}</label>
                {{
                  select: renderSelectFilter,
                  'date-range': renderDateRangeFilter,
                  text: renderTextFilter,
                  // Add more filter types here
                }[filter.type]?.({
                  filter,
                  state: state?.[filter.name] || null,
                  onChange: (value) => {
                    onFilter({ ...state, [filter.name]: value });
                  },
                })}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function renderSelectFilter({ filter, state, onChange }) {
  return <Select options={filter.options} value={state} onChange={onChange} multiple={filter.multiple} />;
}

function renderDateRangeFilter({ filter, state, onChange }) {
  return <DateRangePicker from={state?.from || ''} to={state?.to || ''} onChange={onChange} />;
}

function renderTextFilter({ filter, state, onChange }) {
  return (
    <TextInput
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
