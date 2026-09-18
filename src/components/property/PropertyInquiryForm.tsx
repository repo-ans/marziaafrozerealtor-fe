"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function PropertyInquiryForm({ defaultMessage }: { defaultMessage: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-lg bg-cream p-4 text-center text-sm text-ink">
        Thanks — Marzia will get back to you shortly about this property.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        required
        placeholder="Your Name"
        className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-plum-600 focus:outline-none"
      />
      <input
        name="phone"
        placeholder="Phone Number"
        className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-plum-600 focus:outline-none"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email Address"
        className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-plum-600 focus:outline-none"
      />
      <textarea
        name="message"
        required
        rows={3}
        defaultValue={defaultMessage}
        className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-plum-600 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-plum-800 py-3 text-sm font-semibold text-white transition hover:bg-plum-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={15} /> {status === "sending" ? "Sending..." : "Request Info"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-600">Something went wrong — please try again.</p>
      )}
    </form>
  );
}
