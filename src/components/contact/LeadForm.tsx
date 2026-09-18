"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function LeadForm({
  topic,
  buttonLabel = "Submit",
  defaultMessage,
}: {
  topic: string;
  buttonLabel?: string;
  defaultMessage?: string;
}) {
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
        body: JSON.stringify({ ...payload, topic }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-xl bg-white p-6 text-center text-sm text-ink shadow-sm">
        Thanks — Marzia will be in touch shortly.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:grid-cols-2"
    >
      <input
        name="name"
        required
        placeholder="Name"
        className="rounded-lg border border-black/10 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-plum-600 focus:outline-none"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="rounded-lg border border-black/10 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-plum-600 focus:outline-none"
      />
      <input
        name="phone"
        placeholder="Phone Number"
        className="rounded-lg border border-black/10 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-plum-600 focus:outline-none sm:col-span-2"
      />
      <textarea
        name="message"
        rows={3}
        defaultValue={defaultMessage}
        placeholder="Message"
        className="rounded-lg border border-black/10 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-plum-600 focus:outline-none sm:col-span-2"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-plum-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-plum-700 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 sm:w-fit"
      >
        <Send size={15} /> {status === "sending" ? "Sending..." : buttonLabel}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-600 sm:col-span-2">
          Something went wrong — please try again or call directly.
        </p>
      )}
    </form>
  );
}
