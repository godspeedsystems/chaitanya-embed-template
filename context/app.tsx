'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { chaitanyaApi, type Agent } from '@/store/chaitanya';
import env from '@/env';

// Define the shape of the context data
interface AppContextType {
  agent: Agent | undefined;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { data: agent } = chaitanyaApi.useGetEmbedCurrentAgentQuery({ 'x-user-id': env.userId });

  return <AppContext.Provider value={{ agent }}>{children}</AppContext.Provider>;
};

// Create a custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};
