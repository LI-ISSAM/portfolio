import { NextResponse, NextRequest } from "next/server";

const locales = ["fr", "en"];

export function middleware(req:NextRequest) {
  const { pathname } = req.nextUrl;

  // Déjà sur /fr ou /en : on laisse passer
  if (
    locales.some(
      (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
    )
  ) {
    return NextResponse.next();
  }

  // Priorité : choix mémorisé > langue du navigateur > français
  let lang = "fr";

  try {
    const saved = req.cookies.get("lang")?.value;
    const accept = (
      req.headers.get("accept-language") ?? "fr"
    ).toLowerCase();

    lang =
      saved && locales.includes(saved)
        ? saved
        : accept.startsWith("fr")
        ? "fr"
        : "en";
  } catch {
    lang = "fr";
  }

  const url = req.nextUrl.clone();

  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

// Ignore _next, api et les fichiers avec extension
export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};