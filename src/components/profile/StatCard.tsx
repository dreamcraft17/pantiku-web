type Props = {
  label: string;
  value: string;
  helper?: string;
};

export function StatCard({ label, value, helper }: Props) {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      {helper ? <p className="mt-2 text-xs text-slate-600">{helper}</p> : null}
    </article>
  );
}
