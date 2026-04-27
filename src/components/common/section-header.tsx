type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: Props) {
  return (
    <div className="mb-6 space-y-2">
      {eyebrow ? <p className="text-sm font-semibold text-emerald-700">{eyebrow}</p> : null}
      <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">{title}</h2>
      {description ? <p className="max-w-3xl text-slate-600">{description}</p> : null}
    </div>
  );
}
