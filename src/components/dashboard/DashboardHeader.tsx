import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  actions?: ReactNode;
  badge?: ReactNode;
};

export function DashboardHeader({ title, subtitle, actions, badge }: Props) {
  return (
    <header className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{title}</h1>
            {badge}
          </div>
          <p className="mt-2 text-slate-600">{subtitle}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}
