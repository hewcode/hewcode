import useFetch from '../../hooks/useFetch.js';
import Select from '../support/select.jsx';

export default function SelectFilter({ route, component, hash, filterName, ...props }) {
  const { fetch } = useFetch();

  return (
    <Select
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
                params: ['filters.' + filterName + '.getSearchResults', query],
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
      {...props}
    />
  );
}
