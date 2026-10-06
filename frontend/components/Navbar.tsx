"use client";

import { useEffect, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import type { Dict } from "../lib/dictionaries";
import type { Locale } from "../lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ lang, t }: { lang: Locale; t: Dict["nav"] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#" onClick={() => setOpen(false)} className="font-display text-3xl tracking-wide">
            LiTimi<span className="text-accent">.</span>
          </a>

          <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
            <ul className="hidden items-center gap-8 lg:flex">
              {t.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition hover:text-fg"
                  >
                    <span className="mr-1.5 text-accent">{l.n}.</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="hidden rounded-lg bg-fg px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-bg transition hover:opacity-80 sm:inline-block"
            >
              {t.contact}
            </a>

            <LanguageSwitcher lang={lang} label={t.switchTo} />
            <ThemeToggle />

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.close : t.open}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-9 w-9 place-items-center rounded-full text-fg lg:hidden"
            >
              {open ? <LuX size={22} /> : <LuMenu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-16 z-40 bg-bg px-6 py-10 transition duration-300 lg:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <ul className="space-y-6">
          {t.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-line pb-4 font-display text-5xl uppercase tracking-wide"
              >
                <span className="font-mono text-xs text-accent">{l.n}.</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-10 block rounded-lg bg-fg px-5 py-3 text-center font-mono text-xs font-semibold uppercase tracking-[0.2em] text-bg"
        >
          {t.contact}
        </a>
      </div>
    </>
  );
}