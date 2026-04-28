import Link from "next/link";

type Props = {
  title: string;
  description: string;
  ctaLabel: string;
  href?: string;
  disabled?: boolean;
  disabledReason?: string;
};

export function QuickActionCard({ title, description, ctaLabel, href, disabled = false, disabledReason }: Props) {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      {disabled || !href ? (
        <div className="mt-4">
          <span className="inline-flex rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-500">{ctaLabel}</span>
          {disabledReason ? <p className="mt-2 text-xs text-slate-500">{disabledReason}</p> : null}
        </div>
      ) : (
        <Link
          href={href}
          className="mt-4 inline-flex rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
        >
          {ctaLabel}
        </Link>
      )}
    </article>
  );
}

