import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bebas_Neue, Montserrat, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { dictionaries } from "../../lib/dictionaries";
import { isLocale, locales } from "../../lib/i18n";

const display = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const sans = Montserrat({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isLocale(params.lang)) return {};
  const d = dictionaries[params.lang];
  return { title: d.meta.title, description: d.meta.description };
}

const themeScript = `
(function () {
  try {
    if (localStorage.getItem("theme") === "light") document.documentElement.classList.add("light");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();

  return (
    <html
      lang={params.lang}
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}