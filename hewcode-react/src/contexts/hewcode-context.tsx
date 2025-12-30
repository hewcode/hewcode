import { createContext, useContext, useState } from 'react';
import type { NavItem } from '../types';

type Hewcode = {
  routes: Record<string, string>;
  panel: {
    name: string;
    title: string | null;
    navigation: {
      icons: Record<string, string>;
      items: NavItem[];
    };
  };
  [key: string]: unknown;
};

type HewcodeContext = {
  hewcode: Hewcode | null;
  setHewcode: (hewcode: Hewcode) => void;
};

const HewcodeContext = createContext(null);

export function HewcodeProvider({ children, initialHewcode }) {
  const [hewcode, setHewcode] = useState(initialHewcode);

  return <HewcodeContext.Provider value={{ hewcode, setHewcode }}>{children}</HewcodeContext.Provider>;
}

export function useHewcode(): HewcodeContext {
  const context = useContext(HewcodeContext);
  if (!context) {
    throw new Error('useHewcode must be used within a HewcodeProvider');
  }
  return context;
}
