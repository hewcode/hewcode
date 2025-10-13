import { useState } from 'react';
import useFetch from '../hooks/useFetch.js';
import { Button } from './ui/button';

const colorMap = {
  primary: 'default',
  warning: 'destructive',
  secondary: 'secondary',
  success: 'default',
  danger: 'destructive',
};

export default function Action({ route, component, hash, name, label, color = 'primary', args = {}, recordId, onSuccess, onError }) {
  const [loading, setLoading] = useState(false);

  const { fetch } = useFetch();

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await fetch('/_hewcode', {
        method: 'POST',
        body: {
          route,
          component,
          hash,
          context: {
            recordId,
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
      } else {
        console.error('Action error:', error);
      }
    } finally {
      setLoading(false);
    }
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
