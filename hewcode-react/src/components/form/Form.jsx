import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch.js';
import Action from '../actions/Action.jsx';
import DateTimePicker from '../support/date-time-picker.jsx';
import TextInput from '../support/text-input.jsx';
import Textarea from '../support/textarea.jsx';
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
  seal,
  fields = [],
  state = {},
  onSuccess = null,
  onError = null,
  onFinish = null,
  onChange = null,
  footerActions = null,
  additionalFooterActions = (state) => [],
  className = '',
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

  useEffect(() => {
    const updatedData = {};
    fields.forEach((field) => {
      updatedData[field.name] = state[field.name] ?? field.default ?? '';
    });
    setFormData(updatedData);
  }, [state]);

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

    if (onChange) {
      onChange({
        ...formData,
        [fieldName]: value,
      });
    }
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
        seal={seal}
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
    <form className="space-y-6">
      <div className={className || "space-y-4"}>{fields.map((field) => renderField(field))}</div>

      {footerActions?.length > 0 && (
        <div className="flex justify-end gap-2">
          {footerActions.map((action) => (
            <Action
              key={action.name}
              seal={seal}
              onStart={() => setIsSubmitting(true)}
              onSuccess={(response) => {
                if (onSuccess) {
                  onSuccess(action, formData, response);
                }
              }}
              onError={(serverErrors) => {
                if (action.name === 'submit') {
                  setErrors(serverErrors);
                }

                if (onError) {
                  onError(action, serverErrors, formData);
                }
              }}
              onFinish={() => {
                if (action.name === 'submit') {
                  setIsSubmitting(false);
                }

                if (onFinish) {
                  onFinish(action, formData);
                }
              }}
              {...action}
              additionalArgs={{ data: formData }}
            />
          ))}
        </div>
      )}
      {additionalFooterActions(formData)}
    </form>
  );
}
