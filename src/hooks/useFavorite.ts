"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "marzia_saved_listings";

function readSaved(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

// Per-viewer "save for later" heart toggle, backed by localStorage — no
// account system exists on this site, so this is intentionally local to
// the browser rather than a fake synced wishlist.
export function useFavorite(listingKey: string) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readSaved().includes(listingKey));
  }, [listingKey]);

  const toggle = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      const current = readSaved();
      const next = current.includes(listingKey)
        ? current.filter((k) => k !== listingKey)
        : [...current, listingKey];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage may be unavailable (private browsing, blocked) — the
        // toggle still reflects in-session state below.
      }
      setSaved(next.includes(listingKey));
    },
    [listingKey]
  );

  return { saved, toggle } as const;
}
