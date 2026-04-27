import Link from "next/link";

type Props = {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
};

export function DashboardCard({ title, description, ctaLabel, href }: Props) {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
      <Link
        href={href}
        className="mt-4 inline-flex rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
