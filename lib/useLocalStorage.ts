"use client";

import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);

  // load once
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // save whenever it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  const update = useCallback(
    (updater: T | ((prev: T) => T)) => {
      setValue((prev) => (typeof updater === "function" ? (updater as any)(prev) : updater));
    },
    []
  );

  return [value, update] as const;
}
