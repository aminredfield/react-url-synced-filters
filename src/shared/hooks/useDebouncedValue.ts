import { useState, useEffect } from 'react';

/**
 * Возвращает debounced версию предоставленного значения.
 * Обновляется только после указанной задержки.
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
