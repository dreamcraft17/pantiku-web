import Link from "next/link";

type Props = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({ title, description, actionLabel, actionHref }: Props) {
  return (
    <section className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-5">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="mt-4 inline-flex rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
        >
          {actionLabel}
        </Link>
      ) : null}
    </section>
  );
}
