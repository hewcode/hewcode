import { Input } from '../ui/input.jsx';
import { Label } from '../ui/label.jsx';

export default function DateTimePicker({ name, type, label, value, onChange, error, required = false, placeholder = '', attributes = null }) {
  const getInputType = () => {
    if (type === 'date-picker') return 'date';
    if (type === 'time-picker') return 'time';
    return 'datetime-local';
  };

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && <Label required={required}>{label}</Label>}
      <Input
        id={name}
        name={name}
        type={getInputType()}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={false}
        className={error ? 'border-red-500' : ''}
        {...(attributes || {})}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
