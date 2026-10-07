import Image from "next/image";
import { notFound } from "next/navigation";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import {
  LuArrowRight,
  LuArrowUpRight,
  LuAward,
  LuCloud,
  LuCode,
  LuDatabase,
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

const heroLink =
  "group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition hover:text-fg";

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

  return (
    <>
      <Navbar lang={lang} t={d.nav} />

      {/* HERO */}
      <header className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pb-16 pt-28 text-center">
        <p className="animate-fade-up text-lg text-muted md:text-2xl">
          {d.hero.hi}
          <span className="mx-2 bg-accent px-3 py-1 font-semibold text-white">Litimi Issam</span>
          {d.hero.and}
        </p>
        <h1
          className="mt-4 animate-fade-up font-display text-[clamp(3.5rem,min(15vw,25svh),14rem)] uppercase leading-[0.9]"
          style={{ animationDelay: "100ms" }}
        >
          {d.hero.title1}
          <br />
          {d.hero.title2}
        </h1>
        <p className="mt-6 max-w-xl animate-fade-up text-muted md:text-lg" style={{ animationDelay: "200ms" }}>
          {d.hero.tagline}
        </p>
        <div className="mt-10 flex animate-fade-up flex-wrap justify-center gap-8" style={{ animationDelay: "300ms" }}>
          <a href="#projets" className={heroLink}>
            {d.hero.seeProjects} <LuArrowRight className="transition group-hover:translate-x-1" />
          </a>
          <a href={d.cv} download className={heroLink}>
            {d.hero.cv} <LuArrowUpRight />
          </a>
          <a href="#contact" className={heroLink}>
            {d.hero.contact} <LuArrowRight className="transition group-hover:translate-x-1" />
          </a>
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

              {/* Statut + lieu */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-green-500" />
                  {d.hero.status} : {d.hero.availability}
                </span>
                <span className="flex items-center gap-2">
                  <LuMapPin size={14} className="shrink-0 text-accent" />
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
                <div className="absolute -left-4 bottom-0 rounded-xl border border-line bg-card px-4 py-3 shadow-lg">
                  <p className="font-display text-lg uppercase leading-none">{d.hero.title2}</p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">Litimi Issam</p>
                </div>
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

      {/* CONTACT */}
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
                    <span className="text-xs text-gray-500">(Click to email)</span>
                  </a>
                  <p className="flex items-center gap-3">
                    <LuMapPin size={18} className="text-accent" /> {d.location}
                  </p>
                  <span className="inline-block border-l-2 border-blue-500 bg-blue-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-blue-400">
                    {d.contact.badge}
                  </span>
                  <a
                    href={profile.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-fit items-center gap-2 rounded-lg border border-line px-4 py-2 transition hover:border-accent"
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