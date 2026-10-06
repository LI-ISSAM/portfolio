import { techIcon } from "../lib/icons";

export default function TechChip({ name }: { name: string }) {
  const Icon = techIcon(name);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-wider">
      {Icon && <Icon size={14} className="text-accent" />}
      {name}
    </span>
  );
}