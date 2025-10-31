'use client';
import { Provider } from 'react-redux';
import { store } from '.';
import { ReactNode, useEffect } from 'react';
import { connectSocket, disconnectSocket } from './socketSlice';

export function StoreProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    store.dispatch(connectSocket());

    return () => {
      store.dispatch(disconnectSocket());
    };
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
