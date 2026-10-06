"use client";

import Link from "next/link";
import type { Locale } from "../lib/i18n";

export default function LanguageSwitcher({ lang, label }: { lang: Locale; label: string }) {
  const other: Locale = lang === "fr" ? "en" : "fr";

  return (
    <Link
      href={`/${other}`}
      hrefLang={other}
      aria-label={label}
      onClick={() => {
        document.cookie = `lang=${other}; path=/; max-age=31536000; samesite=lax`;
      }}
      className="rounded-md border border-line px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted transition hover:border-accent hover:text-fg"
    >
      {other}
    </Link>
  );
}