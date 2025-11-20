import { usePage } from '@inertiajs/react';
import _fetch from '../utils/_fetch.js';
import useToastManager from './use-toast-manager.jsx';

export default function useFetch() {
  const { hewcode } = usePage().props;
  const { toast } = useToastManager();

  return {
    fetch: async (url, options = {}, vanilla = false) => {
      return _fetch(url, options, hewcode, vanilla, toast);
    },
  };
}
