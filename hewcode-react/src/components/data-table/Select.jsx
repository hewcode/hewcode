import { Check, ChevronDown, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Badge } from '../ui/badge.jsx';
import { Button } from '../ui/button.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover.jsx';
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select as ShadcnSelect } from '../ui/select.jsx';
import Label from './Label.jsx';
import TextInput from './TextInput.jsx';

export default function Select({
  label,
  required,
  options,
  value,
  onChange,
  className,
  clearable = true,
  multiple = false,
  searchable = false,
  route,
  component,
  hash,
  filterName,
  relationshipName,
  relationshipTitleColumn,
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = useCallback(
    async (query) => {
      if (!searchable || !query.trim() || !route || !hash) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch('/_hewcode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
          },
          body: JSON.stringify({
            route,
            component,
            hash,
            call: {
              name: 'mountComponent',
              params: ['filters.' + filterName + '.getSearchResults', query],
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setSearchResults(data || []);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    [searchable, route, component, hash, filterName],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch]);

  const displayOptions = searchable && searchQuery.trim() ? searchResults : options;

  // Handle multiple select
  if (multiple) {
    const selectedValues = Array.isArray(value) ? value.map(String) : value ? [String(value)] : [];

    const handleToggleOption = (optionValue) => {
      const stringOptionValue = String(optionValue);
      const newValues = selectedValues.includes(stringOptionValue)
        ? selectedValues.filter((v) => v !== stringOptionValue)
        : [...selectedValues, stringOptionValue];
      onChange(newValues);
    };

    const handleClearAll = () => {
      onChange([]);
      setOpen(false);
    };

    const selectedLabels = selectedValues
      .map((val) => {
        // First try to find in current display options
        let option = displayOptions.find((opt) => String(opt.value) === val);
        // If not found and we have original options, search there too
        if (!option && displayOptions !== options) {
          option = options.find((opt) => String(opt.value) === val);
        }
        return option?.label;
      })
      .filter(Boolean);

    return (
      <div className={className}>
        {label && <Label required={required}>{label}</Label>}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="h-9 w-full justify-between px-3">
              <div className="flex flex-1 flex-wrap gap-1 text-left">
                {selectedLabels.length === 0 ? (
                  <span className="text-muted-foreground">Select options...</span>
                ) : selectedLabels.length <= 2 ? (
                  selectedLabels.map((label, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {label}
                      <X
                        className="ml-1 h-3 w-3 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          const valueToRemove = selectedValues[selectedLabels.indexOf(label)];
                          handleToggleOption(valueToRemove);
                        }}
                      />
                    </Badge>
                  ))
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    {selectedLabels.length} selected
                  </Badge>
                )}
              </div>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <div className="p-2">
              {searchable && (
                <div className="mb-3">
                  <TextInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search options..."
                    className="w-full"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  {isSearching && <div className="text-muted-foreground mt-1 text-xs">Searching...</div>}
                </div>
              )}
              {clearable && selectedValues.length > 0 && (
                <Button variant="ghost" size="sm" className="mb-2 w-full justify-start text-xs" onClick={handleClearAll}>
                  Clear all
                </Button>
              )}
              {displayOptions.map(({ label, value: optionValue }) => (
                <div
                  key={optionValue}
                  className="hover:bg-accent flex cursor-pointer items-center space-x-2 rounded-sm px-2 py-1.5 text-sm"
                  onClick={() => handleToggleOption(optionValue)}
                >
                  <div className="border-primary flex h-4 w-4 items-center justify-center rounded-sm border">
                    {selectedValues.includes(String(optionValue)) && <Check className="h-3 w-3" />}
                  </div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  // Handle single select (existing logic)
  let processedOptions = [...displayOptions];

  if (clearable && !displayOptions.some((option) => !option.value)) {
    processedOptions = [{ label: '-', value: '__clear__' }, ...displayOptions];
  }

  if (searchable) {
    const selectedOption =
      displayOptions.find((opt) => String(opt.value) === String(value)) || options.find((opt) => String(opt.value) === String(value));

    return (
      <div className={className}>
        {label && <Label required={required}>{label}</Label>}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="h-9 w-full justify-between px-3">
              <span className="truncate">{selectedOption ? selectedOption.label : 'Select option...'}</span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <div className="p-2">
              <div className="mb-3">
                <TextInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search options..."
                  className="w-full"
                  autoComplete="off"
                  spellCheck="false"
                />
                {isSearching && <div className="text-muted-foreground mt-1 text-xs">Searching...</div>}
              </div>
              {clearable && value && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mb-2 w-full justify-start text-xs"
                  onClick={() => {
                    onChange('');
                    setOpen(false);
                  }}
                >
                  Clear selection
                </Button>
              )}
              {processedOptions.map(({ label, value: optionValue }) => (
                <div
                  key={optionValue}
                  className="hover:bg-accent flex cursor-pointer items-center space-x-2 rounded-sm px-2 py-1.5 text-sm"
                  onClick={() => {
                    onChange(optionValue === '__clear__' ? '' : optionValue);
                    setOpen(false);
                  }}
                >
                  <div className="border-primary flex h-4 w-4 items-center justify-center rounded-sm border">
                    {String(value) === String(optionValue) && <Check className="h-3 w-3" />}
                  </div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <div className={className}>
      {label && <Label required={required}>{label}</Label>}
      <ShadcnSelect value={value || '__clear__'} onValueChange={(newValue) => onChange(newValue === '__clear__' ? '' : newValue)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {processedOptions.map(({ label, value }) => (
            <SelectItem key={label} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    </div>
  );
}
