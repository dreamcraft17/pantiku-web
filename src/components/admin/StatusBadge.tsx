type Props = {
  label: string;
  tone?: "neutral" | "success" | "warning" | "danger";
};

export function StatusBadge({ label, tone = "neutral" }: Props) {
  const toneClass =
    tone === "success"
      ? "border-emerald-200 bg-emerald-100 text-emerald-800"
      : tone === "warning"
        ? "border-amber-200 bg-amber-100 text-amber-800"
        : tone === "danger"
          ? "border-rose-200 bg-rose-100 text-rose-800"
          : "border-slate-200 bg-slate-100 text-slate-700";

  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClass}`}>{label}</span>;
}

