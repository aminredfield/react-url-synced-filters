import { useState, useEffect } from 'react';

/**
 * useDebouncedValue returns a debounced version of the provided value. It
 * updates only after the specified delay, which is useful to avoid
 * performing expensive operations or updating the URL on every keystroke.
 *
 * @param value The input value to debounce
 * @param delay The debounce delay in milliseconds
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounced;
}