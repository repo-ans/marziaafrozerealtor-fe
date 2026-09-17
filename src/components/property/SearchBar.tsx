"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({
  action = "/listings",
  placeholder = "Type your Address | MLS® number | City",
}: {
  action?: string;
  placeholder?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    router.push(`${action}?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl overflow-hidden rounded-xl bg-white/95 shadow-lg"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="flex-1 bg-transparent px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none"
      />
      <button
        type="submit"
        className="flex items-center gap-1.5 bg-plum-800 px-5 text-sm font-semibold text-white transition hover:bg-plum-700"
      >
        <Search size={15} /> Search
      </button>
    </form>
  );
}
