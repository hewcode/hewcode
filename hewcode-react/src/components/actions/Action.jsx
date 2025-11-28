import { useState } from 'react';
import ActionModal from '../../components/actions/action-modal.jsx';
import useModalManager from '../../hooks/use-modal-manager.jsx';
import useFetch from '../../hooks/useFetch.js';
import useTranslator from '../../hooks/useTranslator.js';
import { Button } from '../ui/button.jsx';

const colorMap = {
  primary: 'default',
  warning: 'destructive',
  secondary: 'secondary',
  success: 'default',
  danger: 'destructive',
};

export default function Action({
  seal,
  path,
  name,
  label,
  modalHeading,
  modalDescription,
  requiresConfirmation,
  color = 'primary',
  context = {},
  args = {},
  additionalArgs = {},
  mountsModal = false,
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

    if (mountsModal) {
      modal.component(ActionModal, {
        seal,
        context,
        path,
        name,
        modalHeading,
        modalDescription,
        args: {
          ...args,
          ...additionalArgs,
        },
        onSuccess,
        onError,
        onFinish,
      });

      setLoading(false);
    } else {
      fetch(
        '/_hewcode',
        {
          method: 'POST',
          body: {
            seal,
            context,
            call: {
              name: 'mountAction',
              params: {
                name: path,
                args: {
                  ...args,
                  ...additionalArgs,
                },
              },
            },
          },
          onSuccess: (response) => {
            setLoading(false);

            if (onSuccess) {
              onSuccess(response);
            }
          },
          onError: (serverErrors) => {
            setLoading(false);

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
        },
        true,
      );
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

  if (!seal) {
    return null;
  }

  return (
    <Button variant={colorMap[color] || 'default'} onClick={handleClick} disabled={loading}>
      {loading ? __('hewcode.common.loading') : label || name}
    </Button>
  );
}
