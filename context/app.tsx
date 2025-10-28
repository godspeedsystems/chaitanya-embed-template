'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

// Define the shape of the context data
interface AppContextType {
  message: string;
  setMessage: (message: string) => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('Hello from Context!');

  return <AppContext.Provider value={{ message, setMessage }}>{children}</AppContext.Provider>;
};

// Create a custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};
