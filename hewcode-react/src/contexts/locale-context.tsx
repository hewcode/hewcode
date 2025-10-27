import React, { createContext, useContext, ReactNode } from 'react';

interface LocaleData {
  messages: Record<string, string>;
  lang: string;
}

interface LocaleContextType {
  messages: Record<string, string>;
  locale: string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
  children: ReactNode;
  locale: LocaleData | any; // Allow any to handle Inertia props
}

export function LocaleProvider({ children, locale }: LocaleProviderProps) {
  const value = {
    messages: locale.messages,
    locale: locale.lang,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocaleContext must be used within a LocaleProvider');
  }
  return context;
}