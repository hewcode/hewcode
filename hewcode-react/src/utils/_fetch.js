import { usePage } from '@inertiajs/react';

/**
 * Wrapper around fetch to handle common tasks like setting headers, parsing JSON, and error handling.
 */
export default async function _fetch(url, options = {}) {
  const { hewcode } = usePage().props;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-CSRF-TOKEN': hewcode.csrfToken, // ensures we are always using a fresh CSRF token.
  };

  const fetchOptions = {
    method: options.method || 'GET',
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : null,
  };

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.message || 'An error occurred while fetching data.');
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    // Attempt to parse JSON response
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    // If not JSON, return text
    return await response.text();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
