import { router } from '@inertiajs/react';
import fireToasts from '../utils/fire-toasts.js';

/**
 * Wrapper around fetch to handle common tasks like setting headers, parsing JSON, and error handling.
 */
export default async function _fetch(url, options = {}, hewcode, vanilla = false, toast) {
  if (vanilla) {
    return fetchJson(url, options, hewcode);
  }

  return fetchWithInertia(url, options, hewcode, toast);
}

function fetchJson(url, options, hewcode) {
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

  return fetch(url, fetchOptions)
    .then((response) => {
      // if this is a result of dd() from Laravel, show the value evaluated in a full screen debugger div
      if (hewcode.developerMode && response.headers.get('Content-Type')?.includes('text/html')) {
        response.text().then((html) => {
          showDebugScreen(html);
        });
      }

      return response;
    })
    .catch(() => {
      //
    });
}

function fetchWithInertia(url, options = {}, hewcode, toast) {
  const inertiaOptions = {
    method: options.method || 'get',
    data: options.body || {},
    headers: {
      'X-CSRF-TOKEN': hewcode.csrfToken,
      ...(options.headers || {}),
    },
    preserveScroll: true,
    onSuccess: (page) => {
      fireToasts(page.props.hewcode.toasts, toast);
    },
  };

  return router.visit(url, inertiaOptions);
}

function showDebugScreen(html) {
  if (!html.includes('<script> Sfdump = window.Sfdump || (function (doc) {')) {
    return;
  }

  const debugDiv = document.createElement('div');
  debugDiv.style.position = 'fixed';
  debugDiv.style.inset = '80px';
  debugDiv.style.backgroundColor = '#080808';
  debugDiv.style.padding = '20px';
  debugDiv.style.zIndex = '9999';
  debugDiv.style.border = '1px solid #444';
  debugDiv.id = 'hewcode-debugger';

  // a overflow auto container for the html content
  const contentDiv = document.createElement('div');
  contentDiv.style.overflow = 'auto';
  contentDiv.innerHTML = html;
  debugDiv.appendChild(contentDiv);

  // X button to close the debugger
  const closeButton = document.createElement('button');
  closeButton.innerText = 'X';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '-12px';
  closeButton.style.right = '-12px';
  closeButton.style.backgroundColor = '#ff4848';
  closeButton.style.border = 'none';
  closeButton.style.color = 'white';
  closeButton.style.width = '30px';
  closeButton.style.height = '30px';
  closeButton.style.cursor = 'pointer';
  closeButton.onclick = () => {
    debugDiv.remove();
  };
  debugDiv.appendChild(closeButton);

  // Remove any existing debugger div
  const existingDiv = document.getElementById('hewcode-debugger');
  if (existingDiv) {
    existingDiv.remove();
  }

  document.body.appendChild(debugDiv);
}
