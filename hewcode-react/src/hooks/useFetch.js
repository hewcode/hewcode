import { usePage } from '@inertiajs/react';
import _fetch from '../utils/_fetch.js';

export default function useFetch() {
  const { hewcode } = usePage().props;

  return {
    fetch: async (url, options = {}) => {
      return _fetch(url, options, { csrfToken: hewcode.csrfToken });
    },
  };
}
