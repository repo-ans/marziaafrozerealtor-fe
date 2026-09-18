"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Hover dropdowns have a dead zone between the trigger and the panel below
// it (the visual gap). Moving the cursor through that gap makes the browser
// report mouseleave on the trigger before mouseenter fires on the panel,
// closing the menu mid-transit. A short close delay — cancelled if the
// cursor lands back on the trigger or the panel (both call `open` again)
// before it fires — fixes that without needing pixel-perfect bridging.
export function useDelayedHover(delay = 200) {
  const [active, setActive] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const open = useCallback((key: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActive(key);
  }, []);

  const scheduleClose = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActive(null), delay);
  }, [delay]);

  return { active, open, scheduleClose } as const;
}
