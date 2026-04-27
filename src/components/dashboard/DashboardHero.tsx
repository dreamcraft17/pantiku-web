import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  primaryCta?: ReactNode;
  secondaryCta?: ReactNode;
  extra?: ReactNode;
};

export function DashboardHero({ title, subtitle, primaryCta, secondaryCta, extra }: Props) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h1>
      <p className="mt-2 max-w-4xl text-slate-600">{subtitle}</p>
      {primaryCta || secondaryCta ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {primaryCta}
          {secondaryCta}
        </div>
      ) : null}
      {extra ? <div className="mt-5">{extra}</div> : null}
    </section>
  );
}
