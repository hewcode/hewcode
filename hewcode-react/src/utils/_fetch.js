/**
 * Wrapper around fetch to handle common tasks like setting headers, parsing JSON, and error handling.
 */
export default async function _fetch(url, options = {}, { csrfToken }) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-CSRF-TOKEN': csrfToken, // ensures we are always using a fresh CSRF token.
  };

  const fetchOptions = {
    method: options.method || 'GET',
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : null,
  };

  return fetch(url, fetchOptions).catch(() => {
    //
  });
}
