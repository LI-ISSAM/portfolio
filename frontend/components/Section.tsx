import Reveal from "./Reveal";

export default function Section({
  id,
  label,
  title,
  subtitle,
  center = false,
  children,
}: {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <Reveal className={center ? "text-center" : ""}>
        <p className="label">{label}</p>
        <h2 className="heading mt-3">{title}</h2>
        {subtitle && (
          <p className={`mt-5 max-w-xl text-muted ${center ? "mx-auto" : ""}`}>{subtitle}</p>
        )}
      </Reveal>
      {children}
    </section>
  );
}