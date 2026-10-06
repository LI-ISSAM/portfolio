"use client";

import { useState } from "react";
import type { Dict } from "../lib/dictionaries";

type Status = "idle" | "sending" | "success" | "error";

const input =
  "w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none";

export default function ContactForm({ t }: { t: Dict["form"] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder={t.name} required maxLength={100} className={input} />
      <input name="email" type="email" placeholder={t.email} required className={input} />
      <textarea
        name="message"
        placeholder={t.message}
        required
        minLength={10}
        maxLength={3000}
        rows={5}
        className={input}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-lg bg-fg px-5 py-2.5 text-sm font-semibold text-bg transition hover:opacity-80 disabled:opacity-50"
      >
        {status === "sending" ? t.sending : t.send}
      </button>
      {status === "success" && <p className="text-sm text-green-500">{t.success}</p>}
      {status === "error" && <p className="text-sm text-red-500">{t.error}</p>}
    </form>
  );
}