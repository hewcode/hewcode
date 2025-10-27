import { useState } from 'react';
import useModalManager from '../hooks/use-modal-manager.jsx';
import useFetch from '../hooks/useFetch.js';
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
  args = {},
  recordId,
  onSuccess,
  onError,
}) {
  const [loading, setLoading] = useState(false);
  const modal = useModalManager();

  const { fetch } = useFetch();

  const submit = async () => {
    setLoading(true);

    try {
      const response = await fetch('/_hewcode', {
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
              name,
              args,
            },
          },
        },
      });

      const data = await response.json();

      if (response.ok && onSuccess) {
        onSuccess(data.result);
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
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
      {loading ? 'Loading...' : label || name}
    </Button>
  );
}
