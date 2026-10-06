/** @type {import('next').NextConfig} */
const nextConfig = {
  // "standalone" sert à Docker. Vercel définit la variable VERCEL pendant son build,
  // donc on ne l'active que hors Vercel.
  ...(process.env.VERCEL ? {} : { output: "standalone" }),
};

export default nextConfig;