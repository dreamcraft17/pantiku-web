type ProgressChecklistItem = {
  label: string;
  done: boolean;
};

type Props = {
  title: string;
  items: ProgressChecklistItem[];
};

export function ProgressChecklist({ title, items }: Props) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-3 text-sm text-slate-700">
            <span
              className={`inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs font-bold ${
                item.done ? "border-emerald-300 bg-emerald-100 text-emerald-700" : "border-slate-300 bg-slate-100 text-slate-500"
              }`}
            >
              {item.done ? "✓" : "•"}
            </span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
