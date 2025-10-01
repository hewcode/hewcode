import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input.jsx';
import { cn } from '../../lib/utils';
import IconButton from './IconButton.jsx';
import Label from './Label.jsx';

const TextInput = ({
  value,
  onChange,
  label,
  description,
  error,
  required = false,
  prefixIcon,
  suffixIcon,
  suffixText,
  placeholder,
  disabled = false,
  className,
  inputClassName,
  type = 'text',
  revealable = false,
  ...props
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const hasError = error && error.length > 0;
  const hasSuffix = suffixIcon || suffixText || (revealable && type === 'password');

  const SuffixIcon = suffixIcon;
  const PrefixIcon = prefixIcon;

  const inputType = revealable && type === 'password' ? (isRevealed ? 'text' : 'password') : type;

  const toggleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Label */}
      {label && (
        <Label required={required}>
          {label}
        </Label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Prefix Icon */}
        {prefixIcon && <PrefixIcon className="left-3 w-4 h-4 text-muted-foreground absolute top-1/2 -translate-y-1/2 transform pointer-events-none" />}

        {/* Input */}
        <Input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            {
              'pl-10': prefixIcon,
              'pr-10': hasSuffix,
              'border-destructive': hasError,
            },
            inputClassName,
          )}
          {...props}
        />

        {/* Suffix Icon, Text, or Reveal Button */}
        {hasSuffix && (
          <div className="right-3 absolute top-1/2 -translate-y-1/2 transform">
            {revealable && type === 'password' ? (
              <IconButton
                icon={isRevealed ? EyeOff : Eye}
                variant="ghost"
                size="sm"
                onClick={toggleReveal}
                title={isRevealed ? 'Hide password' : 'Show password'}
                disabled={disabled}
              />
            ) : suffixIcon ? (
              <SuffixIcon className="w-5 h-5 text-muted-foreground" />
            ) : (
              <span className="text-sm text-muted-foreground">{suffixText}</span>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {hasError && <p className="mt-1 text-sm text-destructive">{error}</p>}

      {/* Description */}
      {description && !hasError && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
    </div>
  );
};

export default TextInput;