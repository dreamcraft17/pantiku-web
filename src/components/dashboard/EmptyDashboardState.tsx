import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyDashboardState({ title, description, action }: Props) {
  return (
    <section className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-5">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </section>
  );
}
