import Image from "next/image";
import { notFound } from "next/navigation";
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { LuArrowRight, LuArrowUpRight, LuAward, LuGraduationCap, LuMail, LuMapPin } from "react-icons/lu";
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
      <header className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-36 pt-24 text-center sm:pb-24">
        <p className="animate-fade-up text-lg text-muted md:text-2xl">
          {d.hero.hi}
          <span className="mx-2 bg-accent px-3 py-1 font-semibold text-white">Litimi Issam</span>
          {d.hero.and}
        </p>
        <h1
          className="mt-4 animate-fade-up font-display text-[clamp(3.25rem,13vw,11rem)] uppercase leading-[0.9]"
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

        <div className="absolute inset-x-6 bottom-6 flex flex-col gap-2 text-left font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-green-500" />
            {d.hero.status} : {d.hero.availability}
          </p>
          <p>
            {d.hero.place} : {d.location}
          </p>
        </div>
      </header>

      {/* À PROPOS */}
      <Section id="apropos" label={d.about.label} title={d.about.title} center>
        <div className="mx-auto mt-14 grid max-w-4xl items-center gap-10 md:grid-cols-[260px_1fr]">
          <Reveal>
            <Image
              src="/Profile.jpeg"
              alt={d.about.photoAlt}
              width={260}
              height={325}
              className="aspect-[4/5] w-full rounded-2xl border border-line object-cover"
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-5 text-lg leading-relaxed">
              {d.about.paragraphs.map((text) => (
                <p key={text}>
                  <Rich text={text} />
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* PROJETS */}
      <Section id="projets" label={d.projects.label} title={d.projects.title} subtitle={d.projects.subtitle}>
        {error && <p className="mt-10 text-red-500">{d.projects.error}</p>}
        <div className="mt-20 space-y-28">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} t={d.projects} />
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
                  <span className="font-mono text-xs text-accent">0{i + 1}.</span>
                  <Icon size={22} className="text-muted transition group-hover:text-accent" />
                </div>
                <h3 className="mt-8 text-xl font-semibold transition group-hover:text-accent">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          {d.skills.groups.map((group, i) => (
            <Reveal key={group} delay={i * 60}>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{group}</h3>
              <div className="flex flex-wrap gap-2">
                {skillItems[i].map((item) => (
                  <TechChip key={item} name={item} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PARCOURS */}
      <Section id="parcours" label={d.career.label} title={d.career.title}>
        <div className="mt-14 space-y-6">
          {d.career.experiences.map((e, i) => (
            <Reveal key={e.role} delay={i * 100}>
              <div className="card p-6 md:p-8">
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
                    <LuMail size={18} className="text-accent" /> {profile.email}
                  </a>
                  <p className="flex items-center gap-3">
                    <LuMapPin size={18} className="text-accent" /> {d.location}
                  </p>
                  <span className="inline-block rounded-full border border-green-500/40 bg-green-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-green-500">
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

              <div className="card p-6">
                <h3 className="mb-4 text-lg font-semibold">{d.contact.networksTitle}</h3>
                <div className="flex gap-5 text-sm">
                  <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent">
                    <FaGithub size={18} /> GitHub
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent">
                    <FaLinkedin size={18} /> LinkedIn
                  </a>
                  <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=litimi.dev@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 hover:text-accent"
>
  <FaEnvelope size={18} /> Contact
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