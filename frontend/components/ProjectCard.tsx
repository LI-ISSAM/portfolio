import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import { LuArrowUpRight, LuLock } from "react-icons/lu";
import type { Project } from "../lib/api";
import type { Dict } from "../lib/dictionaries";
import Reveal from "./Reveal";
import TechChip from "./TechChip";

export default function ProjectCard({
  project: p,
  index,
  t,
}: {
  project: Project;
  index: number;
  t: Dict["projects"];
}) {
  const reversed = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");
  const tags = p.stack.split(",").map((s) => s.trim()).filter(Boolean);
  const isMobile = p.category?.toLowerCase().includes("mobile") ?? false;
  const hasImage = !!p.image && (p.image.startsWith("/") || p.image.startsWith("http"));

  return (
    <Reveal>
      <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Cadre de présentation */}
        <div className={reversed ? "lg:order-2" : ""}>
          <div className="rounded-2xl border border-line bg-card p-3 shadow-2xl shadow-black/20">
            {isMobile ? (
              /* Cadre téléphone */
              <div className="flex justify-center rounded-xl border border-line bg-bg py-8">
                <div className="relative aspect-[9/19] w-[210px] overflow-hidden rounded-[2rem] border-[6px] border-line bg-black shadow-xl">
                  {hasImage ? (
                    <Image
                      src={p.image as string}
                      alt={`Capture de ${p.title}`}
                      fill
                      sizes="210px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="grid h-full place-items-center">
                      <span className="font-display text-8xl text-line">{num}</span>
                    </div>
                  )}
                  <div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/70" />
                </div>
              </div>
            ) : (
              /* Cadre navigateur */
              <div className="overflow-hidden rounded-xl border border-line bg-bg">
                <div className="flex gap-1.5 border-b border-line px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="relative aspect-video">
                  {hasImage ? (
                    <Image
                      src={p.image as string}
                      alt={`Capture de ${p.title}`}
                      fill
                      sizes="(min-width: 1024px) 560px, 100vw"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="grid h-full place-items-center">
                      <span className="font-display text-9xl text-line">{num}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <TechChip key={tag} name={tag} />
              ))}
            </div>
          </div>
        </div>

        {/* Explication */}
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-accent">{num}.</p>
          {p.category && (
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{p.category}</p>
          )}
          <h3 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{p.title}</h3>
          <p className="mt-4 leading-relaxed text-muted">{p.description}</p>

          <ul className="mt-6 space-y-2.5">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3 font-mono text-[13px] leading-relaxed text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em]">
            {p.githubUrl && (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:opacity-70"
              >
                <FaGithub size={15} /> {t.source} <LuArrowUpRight size={14} />
              </a>
            )}
            {p.demoUrl && (
              <a
                href={p.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:opacity-70"
              >
                {t.demo} <LuArrowUpRight size={14} />
              </a>
            )}
            {!p.githubUrl && !p.demoUrl && (
              <span className="inline-flex items-center gap-2 text-muted">
                <LuLock size={14} /> {t.privateCode}
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}