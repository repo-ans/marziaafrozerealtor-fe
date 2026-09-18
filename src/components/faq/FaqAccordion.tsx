"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left"
          >
            <span className="text-sm font-semibold text-ink">
              {i + 1}. {item.q}
            </span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-plum-600 transition ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <p className="pb-4 text-sm leading-relaxed text-ink-soft">{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
