import { useEffect, useCallback } from 'react';
import { socketService } from '@/store/socket';

/**
 * A custom hook to interact with the global socket instance.
 * It allows components to listen for socket events and emit them.
 *
 * @param eventName The name of the event to listen for. Optional.
 * @param callback The callback function to execute when the event is received. Optional.
 * @returns An object containing a memoized `emit` function.
 */
export const useSocket = (eventName?: string, callback?: (...args: any[]) => void) => {
  // Register the event listener when the component mounts or when dependencies change.
  useEffect(() => {
    if (eventName && callback) {
      socketService.on(eventName, callback);
    }

    // Clean up the event listener when the component unmounts
    // or when the eventName or callback changes.
    return () => {
      if (eventName && callback) {
        socketService.off(eventName, callback);
      }
    };
  }, [eventName, callback]);

  /**
   * A memoized function to emit socket events.
   * This function is stable and will not cause re-renders if passed as a prop.
   *
   * @param event The name of the event to emit.
   * @param args The data to send with the event.
   */
  const emit = useCallback((event: string, ...args: any[]) => {
    socketService.emit(event, ...args);
  }, []);

  return { emit };
};
