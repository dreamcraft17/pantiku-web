import { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
  rightSlot?: ReactNode;
};

export function DashboardSection({ title, description, children, rightSlot }: Props) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
        </div>
        {rightSlot}
      </div>
      {children}
    </section>
  );
}

