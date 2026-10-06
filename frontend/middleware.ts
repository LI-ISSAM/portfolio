import { NextRequest, NextResponse } from "next/server";

const locales = ["fr", "en"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Déjà sur /fr ou /en : rien à faire
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  // Priorité : choix mémorisé > langue du navigateur > français
  const saved = req.cookies.get("lang")?.value;
  const header = (req.headers.get("accept-language") ?? "fr").toLowerCase();
  const lang = saved && locales.includes(saved) ? saved : header.startsWith("fr") ? "fr" : "en";

  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

// Ignore _next, api et les fichiers avec extension (photo.jpg, cv.pdf...)
export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] };