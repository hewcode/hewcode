import { useState } from 'react';
import useModalManager from '../hooks/use-modal-manager.jsx';
import useFetch from '../hooks/useFetch.js';
import useTranslator from '../hooks/useTranslator.js';
import { Button } from './ui/button';

const colorMap = {
  primary: 'default',
  warning: 'destructive',
  secondary: 'secondary',
  success: 'default',
  danger: 'destructive',
};

export default function Action({
  route,
  component,
  hash,
  name,
  label,
  requiresConfirmation,
  color = 'primary',
  context = {},
  args = {},
  additionalArgs = {},
  onStart,
  onSuccess,
  onError,
  onFinish,
}) {
  const [loading, setLoading] = useState(false);
  const modal = useModalManager();
  const { __ } = useTranslator();
  const { fetch } = useFetch();

  const submit = async () => {
    setLoading(true);

    if (onStart) {
      onStart();
    }

    fetch('/_hewcode', {
      method: 'POST',
      body: {
        route,
        component,
        hash,
        context,
        call: {
          name: 'mountAction',
          params: {
            name,
            args: {
              ...args,
              ...additionalArgs,
            },
          },
        },
      },
      onSuccess: (response) => {
        if (onSuccess) {
          onSuccess(response);
        }
      },
      onError: (serverErrors) => {
        if (onError) {
          onError(serverErrors);
        }
      },
      onFinish: () => {
        setLoading(false);

        if (onFinish) {
          onFinish();
        }
      },
    });
  };

  const handleClick = async () => {
    if (requiresConfirmation) {
      const confirmed = await modal.confirm();

      if (!confirmed) {
        return;
      }
    }

    await submit();
  };

  if (!hash) {
    return null;
  }

  return (
    <Button variant={colorMap[color] || 'default'} onClick={handleClick} disabled={loading}>
      {loading ? __('hewcode.common.loading') : label || name}
    </Button>
  );
}
