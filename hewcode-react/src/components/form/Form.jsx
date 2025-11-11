import { useState } from 'react';
import useFetch from '../../hooks/useFetch.js';
import DateTimePicker from '../support/date-time-picker.jsx';
import TextInput from '../support/text-input.jsx';
import Textarea from '../support/textarea.jsx';
import { Button } from '../ui/button.jsx';
import Select from './select.jsx';

const fieldComponentMap = {
  'text-input': TextInput,
  textarea: Textarea,
  select: Select,
  'date-picker': DateTimePicker,
  'time-picker': DateTimePicker,
  'datetime-picker': DateTimePicker,
};

export default function Form({
  component,
  hash,
  fields = [],
  state = {},
  route = null,
  onSuccess = null,
  onError = null,
  submitButtonLabel = 'Save',
  showCancel = true,
  onCancel = null,
  recordId = null,
}) {
  const [formData, setFormData] = useState(() => {
    const initial = {};
    fields.forEach((field) => {
      initial[field.name] = state[field.name] ?? field.default ?? '';
    });
    return initial;
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fetch } = useFetch();

  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    fetch('/_hewcode', {
      method: 'POST',
      body: {
        route,
        component,
        hash,
        context: {
          recordId: recordId?.toString(),
        },
        call: {
          name: 'mountAction',
          params: {
            name: 'submit',
            args: {
              data: formData,
            },
          },
        },
      },
      onSuccess: () => {
        if (onSuccess) {
          onSuccess(formData);
        }
      },
      onError: (serverErrors) => {
        // Server returns validation errors
        setErrors(serverErrors);
        if (onError) {
          onError(serverErrors);
        }
      },
      onFinish: () => {
        setIsSubmitting(false);
      },
    });
  };

  const renderField = ({ attributes, name, type, ...field }) => {
    const FieldComponent = fieldComponentMap[type];

    if (!FieldComponent) {
      console.warn(`Unknown field type: ${type}`);
      return null;
    }

    const fieldAttributes = { ...attributes, ...field };

    return (
      <FieldComponent
        hash={hash}
        route={route}
        component={component}
        key={name}
        type={type}
        name={name}
        value={formData[name]}
        onChange={(value) => handleFieldChange(name, value)}
        error={errors[name]}
        {...fieldAttributes}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">{fields.map((field) => renderField(field))}</div>

      <div className="flex justify-end gap-2">
        {showCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitButtonLabel}
        </Button>
      </div>
    </form>
  );
}
