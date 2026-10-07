import Image from "next/image";
import { notFound } from "next/navigation";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import {
  LuArrowDown,
  LuArrowUpRight,
  LuAward,
  LuCloud,
  LuCode,
  LuDatabase,
  LuDownload,
  LuGraduationCap,
  LuLayers,
  LuMail,
  LuMapPin,
  LuServer,
  LuWrench,
} from "react-icons/lu";
import { getProjects, type Project } from "../../lib/api";
import { capabilityIcons, profile, skillItems } from "../../lib/data";
import { dictionaries } from "../../lib/dictionaries";
import { isLocale } from "../../lib/i18n";
import Section from "../../components/Section";
import Reveal from "../../components/Reveal";
import Navbar from "../../components/Navbar";
import ProjectCard from "../../components/ProjectCard";
import TechChip from "../../components/TechChip";
import ContactForm from "../../components/ContactForm";
import Rich from "../../components/Rich";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const primaryBtn = `inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition hover:brightness-110 ${focusRing}`;
const secondaryBtn = `inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest transition hover:border-accent hover:text-accent ${focusRing}`;
const iconBtn = `flex h-11 w-11 items-center justify-center rounded-lg border border-line text-muted transition hover:border-accent hover:text-accent ${focusRing}`;

// Une icône par groupe de technologies (dans l'ordre de d.skills.groups)
const groupIcons = [LuCode, LuServer, LuDatabase, LuWrench, LuCloud, LuLayers];

export default async function Home({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const d = dictionaries[lang];

  let projects: Project[] = [];
  let error = false;
  try {
    projects = await getProjects(lang);
  } catch {
    error = true;
  }

  // Accroche (à déplacer dans dictionaries si tu préfères)
  const greet =
    lang === "fr"
      ? { hi: "Salut, je suis", and: "et je suis" }
      : { hi: "Hi, my name is", and: "and I'm a" };
  const marquee = skillItems.flat();

  // Carte "API" : on affiche l'info qui N'EST PAS déjà dans le hero
  // (stack par domaine), au lieu de répéter nom / rôle / statut / lieu.
  const preview = d.skills.groups.slice(0, 4).map((group, i) => ({
    group,
    items: skillItems[i].slice(0, 3),
  }));

  return (
    <>
      <Navbar lang={lang} t={d.nav} />

      <style>{`
        @keyframes hero-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .hero-marquee { animation: hero-marquee 45s linear infinite; }
        @keyframes name-underline { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        .name-underline { animation: name-underline 0.9s 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        @media (prefers-reduced-motion: reduce) { .hero-marquee, .name-underline { animation: none; } }
      `}</style>

      {/* HERO : titre typographique géant + carte API + bandeau techno */}
      <header className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="mx-auto w-full max-w-6xl animate-fade-up px-6 pb-16">
          {/* Haut : centré, très typographique */}
          <div className="flex flex-col items-center text-center">

            <p className="text-lg md:text-2xl">
              <span className="text-muted">{greet.hi}</span>{" "}
              <span className="relative mx-1 inline-block pb-3 font-semibold">
                Litimi Issam
                <span
                  aria-hidden
                  className="name-underline absolute bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-accent"
                />
                <span aria-hidden className="absolute bottom-[-3px] left-0 h-px w-full bg-accent/30" />
              </span>{" "}
              <span className="text-muted">{greet.and}</span>
            </p>

            <h1 className="mt-6 font-display uppercase leading-[0.88] tracking-tight text-[clamp(4rem,15vw,11.5rem)]">
              <span className="block">{d.hero.title1}</span>
              {/* Mot en contour : plein / vide pour casser la monotonie */}
              <span className="block text-accent [-webkit-text-fill-color:transparent] [-webkit-text-stroke:2px_currentColor]">
                {d.hero.title2}
              </span>
            </h1>
          </div>

          {/* Bas : aligné à gauche, texte + actions | carte API */}
          <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
            <div>
              <p className="max-w-xl border-l-2 border-accent pl-6 text-lg leading-relaxed text-muted md:text-xl">
                {d.hero.tagline}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href="#projets" className={primaryBtn}>
                  {d.hero.seeProjects}
                  <LuArrowDown size={16} />
                </a>
                <a href={d.cv} download className={secondaryBtn}>
                  <LuDownload size={16} />
                  {d.hero.cv}
                </a>
                <a href="#contact" className={secondaryBtn}>
                  {d.hero.contact}
                </a>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconBtn}>
                  <FaGithub size={18} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconBtn}>
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>

            {/* Carte "réponse d'API" : stack uniquement */}
            <div
              className="w-full max-w-md justify-self-center transition-transform duration-500 hover:rotate-0 lg:rotate-[1.5deg] lg:justify-self-end"
              aria-hidden
            >
              <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900 shadow-2xl shadow-slate-900/30">
                <div className="flex items-center justify-between border-b border-slate-700/60 px-5 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                  </div>
                  <span className="font-mono text-xs text-slate-400">GET /api/stack</span>
                  <span className="rounded bg-green-500/15 px-2 py-0.5 font-mono text-xs text-green-400">200 OK</span>
                </div>

                <div className="space-y-0.5 break-words p-6 font-mono text-[12.5px] leading-7 text-slate-300">
                  <div>{"{"}</div>
                  {preview.map((p, idx) => (
                    <div key={p.group} className="pl-5">
                      <span className="text-sky-300">&quot;{p.group}&quot;</span>
                      <span>{": ["}</span>
                      {p.items.map((it, j) => (
                        <span key={it}>
                          <span className="text-emerald-300">&quot;{it}&quot;</span>
                          {j < p.items.length - 1 ? <span>{", "}</span> : null}
                        </span>
                      ))}
                      <span>{idx < preview.length - 1 ? "]," : "]"}</span>
                    </div>
                  ))}
                  <div>{"}"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bandeau techno qui défile */}
        <div
          aria-hidden
          className="overflow-hidden border-y border-line py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <ul className="hero-marquee flex w-max">
            {[...marquee, ...marquee].map((item, i) => (
              <li
                key={`${item}-${i}`}
                className="flex items-center gap-10 pr-10 font-mono text-xs uppercase tracking-[0.2em] text-muted"
              >
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* À PROPOS : texte à gauche, photo décalée avec cadre accent à droite */}
      <Section id="apropos" label={d.about.label} title={d.about.title}>
        <div className="mt-14 grid items-center gap-10 md:grid-cols-[1.25fr_1fr] md:gap-16">
          <Reveal>
            <div className="space-y-6">
              {d.about.paragraphs.map((text, i) => (
                <p
                  key={text}
                  className={i === 0 ? "text-xl leading-relaxed md:text-2xl" : "text-base leading-relaxed text-muted"}
                >
                  <Rich text={text} />
                </p>
              ))}
              {/* Statut + lieu : libres, sans cadre */}
              <div className="flex flex-col gap-3 pt-2 text-sm text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-green-500" />
                  {d.hero.status} : {d.hero.availability}
                </span>
                <span className="flex items-center gap-2">
                  <LuMapPin size={16} className="shrink-0 text-accent" />
                  {d.location}
                </span>
              </div>
            </div>
          </Reveal>

          <div className="order-first md:order-none">
            <Reveal delay={100}>
              <div className="relative mx-auto w-full max-w-[320px] pb-6 md:ml-auto">
                <div
                  aria-hidden
                  className="absolute inset-0 bottom-6 translate-x-4 translate-y-4 rounded-3xl border-2 border-accent"
                />
                <Image
                  src="/Profile.jpeg"
                  alt={d.about.photoAlt}
                  width={260}
                  height={325}
                  className="relative aspect-[4/5] w-full rounded-3xl border border-line object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* PROJETS : ligne verticale + petit cercle devant chaque projet */}
      <Section id="projets" label={d.projects.label} title={d.projects.title} subtitle={d.projects.subtitle}>
        {error && <p className="mt-10 text-red-500">{d.projects.error}</p>}
        <div className="relative mt-20 space-y-28 border-l border-line pl-8 md:pl-12">
          {projects.map((p, i) => (
            <div key={p.id} className="relative">
              <span
                aria-hidden
                className="absolute -left-[39px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-accent/20 md:-left-[55px]"
              />
              <ProjectCard project={p} index={i} t={d.projects} />
            </div>
          ))}
        </div>
      </Section>

      {/* COMPÉTENCES */}
      <Section id="competences" label={d.skills.label} title={d.skills.title} subtitle={d.skills.subtitle}>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {d.skills.capabilities.map((c, i) => {
            const Icon = capabilityIcons[i];
            return (
              <div
                key={c.title}
                className="group border-l-2 border-transparent bg-card p-8 transition hover:border-accent hover:bg-[var(--card-hover)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-accent">0{i + 1}.</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
                    <Icon size={24} />
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-semibold transition group-hover:text-accent">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          {d.skills.groups.map((group, i) => {
            const GroupIcon = groupIcons[i % groupIcons.length];
            return (
              <Reveal key={group} delay={i * 60}>
                <h3 className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-card text-accent">
                    <GroupIcon size={16} />
                  </span>
                  {group}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillItems[i].map((item) => (
                    <TechChip key={item} name={item} />
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* PARCOURS */}
      <Section id="parcours" label={d.career.label} title={d.career.title}>
        <div className="relative mt-14 space-y-6 border-l border-line pl-8 md:pl-12">
          {d.career.experiences.map((e, i) => (
            <Reveal key={e.role} delay={i * 100}>
              <div className="card relative p-6 md:p-8">
                <span
                  aria-hidden
                  className="absolute -left-[39px] top-8 h-3 w-3 rounded-full bg-accent ring-4 ring-accent/20 md:-left-[55px]"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold">{e.role}</h3>
                  <span className="font-mono text-xs uppercase tracking-widest text-accent">{e.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{e.company}</p>
                <ul className="mt-5 space-y-2.5">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-6 md:p-8">
              <h3 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                <LuGraduationCap size={16} /> {d.career.educationTitle}
              </h3>
              <div className="mt-5 space-y-5">
                {d.career.education.map((e) => (
                  <div key={e.title}>
                    <p className="font-semibold">{e.title}</p>
                    <p className="text-sm text-muted">{e.school}</p>
                    <p className="font-mono text-xs text-muted">{e.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card h-full p-6 md:p-8">
              <h3 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                <LuAward size={16} /> {d.career.certsTitle}
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                {d.career.certifications.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* CONTACT : le lieu est affiché ici (seule occurrence en texte) */}
      <Section id="contact" label={d.contact.label} title={d.contact.title} subtitle={d.contact.subtitle} center>
        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="card h-full p-6 md:p-8">
              <h3 className="mb-5 text-xl font-semibold">{d.contact.sendTitle}</h3>
              <ContactForm t={d.form} />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="mb-5 text-lg font-semibold">{d.contact.detailsTitle}</h3>
                <div className="space-y-4 text-sm">
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-3 hover:text-accent">
                    <LuMail size={18} className="text-accent" />
                    {profile.email}
                  </a>
                  <p className="flex items-center gap-3">
                    <LuMapPin size={18} className="text-accent" /> {d.location}
                  </p>
                  <span className="inline-block border-l-2 border-accent bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                    {d.contact.badge}
                  </span>
                  <a
                    href={profile.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-fit items-center gap-2 rounded-lg border border-line px-4 py-2 transition hover:border-accent hover:text-accent"
                  >
                    <FaWhatsapp size={16} /> WhatsApp
                  </a>
                </div>
              </div>

              {/* RÉSEAUX */}
              <div className="card p-6">
                <h3 className="mb-4 text-lg font-semibold">{d.contact.networksTitle}</h3>
                <div className="flex flex-wrap gap-3 text-sm">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 rounded-lg border border-line px-4 py-2 transition hover:border-accent hover:text-accent"
                  >
                    <FaGithub size={18} /> GitHub
                    <LuArrowUpRight
                      size={16}
                      className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 rounded-lg border border-line px-4 py-2 transition hover:border-accent hover:text-accent"
                  >
                    <FaLinkedin size={18} /> LinkedIn
                    <LuArrowUpRight
                      size={16}
                      className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <footer className="border-t border-line py-8 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}