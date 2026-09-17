"use client";

import { useState } from "react";

export default function ContactForm() {
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
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-lg bg-white/10 p-6 text-center text-white">
        Thanks for reaching out — I&apos;ll get back to you shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <input
        name="name"
        required
        placeholder="Name"
        className="rounded-lg bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="rounded-lg bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none"
      />
      <input
        name="phone"
        placeholder="(555) 555-5555"
        className="rounded-lg bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none sm:col-span-2"
      />
      <textarea
        name="message"
        required
        placeholder="Message"
        rows={4}
        className="rounded-lg bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none sm:col-span-2"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-plum-800 transition hover:bg-white/90 disabled:opacity-60 sm:col-span-2 sm:w-fit"
      >
        {status === "sending" ? "Sending..." : "Submit"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-300 sm:col-span-2">
          Something went wrong — please try again or call directly.
        </p>
      )}
    </form>
  );
}
