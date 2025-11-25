import { createContext, useContext, useState } from 'react';

const HewcodeContext = createContext(null);

export function HewcodeProvider({ children, initialHewcode }) {
  const [hewcode, setHewcode] = useState(initialHewcode);

  return (
    <HewcodeContext.Provider value={{ hewcode, setHewcode }}>
      {children}
    </HewcodeContext.Provider>
  );
}

export function useHewcode() {
  const context = useContext(HewcodeContext);
  if (!context) {
    throw new Error('useHewcode must be used within a HewcodeProvider');
  }
  return context;
}
