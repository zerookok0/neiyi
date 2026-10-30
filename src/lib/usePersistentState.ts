import { useEffect, useState } from 'react';

/** Persisted state hook — survives reloads, safe when storage is unavailable. */
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or disabled — state still works in-session */
    }
  }, [key, value]);

  return [value, setValue] as const;
}
