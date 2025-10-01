import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover.jsx';
import { Button } from '../ui/button.jsx';
import { Badge } from '../ui/badge.jsx';
import { Check, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import Label from './Label.jsx';

export default function Select({ label, required, options, value, onChange, className, clearable = true, multiple = false }) {
  const [open, setOpen] = useState(false);

  // Handle multiple select
  if (multiple) {
    const selectedValues = Array.isArray(value) ? value.map(String) : (value ? [String(value)] : []);

    const handleToggleOption = (optionValue) => {
      const stringOptionValue = String(optionValue);
      const newValues = selectedValues.includes(stringOptionValue)
        ? selectedValues.filter(v => v !== stringOptionValue)
        : [...selectedValues, stringOptionValue];
      onChange(newValues);
    };

    const handleClearAll = () => {
      onChange([]);
      setOpen(false);
    };

    const selectedLabels = selectedValues
      .map(val => options.find(opt => String(opt.value) === val)?.label)
      .filter(Boolean);

    return (
      <div className={className}>
        {label && (
          <Label required={required}>{label}</Label>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between h-9 px-3"
            >
              <div className="flex flex-wrap gap-1 flex-1 text-left">
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
              {clearable && selectedValues.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs mb-2"
                  onClick={handleClearAll}
                >
                  Clear all
                </Button>
              )}
              {options.map(({ label, value: optionValue }) => (
                <div
                  key={optionValue}
                  className="flex items-center space-x-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent"
                  onClick={() => handleToggleOption(optionValue)}
                >
                  <div className="flex h-4 w-4 items-center justify-center rounded-sm border border-primary">
                    {selectedValues.includes(String(optionValue)) && (
                      <Check className="h-3 w-3" />
                    )}
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
  let processedOptions = [...options];

  if (clearable && !options.some((option) => !option.value)) {
    processedOptions = [{ label: '-', value: '__clear__' }, ...options];
  }

  return (
    <div className={className}>
      {label && (
        <Label required={required}>{label}</Label>
      )}
      <ShadcnSelect
        value={value || '__clear__'}
        onValueChange={(newValue) => onChange(newValue === '__clear__' ? '' : newValue)}
      >
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