import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue = null) {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading storage key", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const valueToStore =
        typeof state === "string" || typeof state === "number"
          ? state
          : JSON.stringify(state);
      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error("Error setting key", error);
    }
  }, [key, state]);

  return [state, setState];
}
