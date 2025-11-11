import useFetch from '../../hooks/useFetch.js';
import BaseSelect from '../support/select.jsx';

export default function Select({ route, component, hash, ...props }) {
  const { fetch } = useFetch();

  return (
    <BaseSelect
      {...props}
      searchUsing={async (query) => {
        if (!route || !hash) {
          return [];
        }

        const response = await fetch(
          '/_hewcode',
          {
            method: 'POST',
            body: {
              route,
              component,
              hash,
              call: {
                name: 'mountComponent',
                params: ['fields.' + props.name + '.getSearchResults', query],
              },
            },
          },
          true,
        );

        if (response.ok) {
          return await response.json();
        }

        return [];
      }}
    />
  );
}
