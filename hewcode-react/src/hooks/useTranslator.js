import { usePage } from '@inertiajs/react';

let translator = null;

export default function useTranslator() {
  const { messages, locale } = usePage().props.hewcode.locale;

  translator = (key, params = {}) => {
    let translation = messages[key] || key;
    Object.keys(params).forEach((param) => {
      translation = translation.replace(`{${param}}`, params[param]);
      translation = translation.replace(`:${param}`, params[param]);
    });
    return translation;
  };

  return {
    __: translator,
    locale: locale,
  };
}
