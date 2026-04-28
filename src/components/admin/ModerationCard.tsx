import { ReactNode } from "react";

type Props = {
  title: string;
  meta?: string;
  children?: ReactNode;
  actions?: ReactNode;
};

export function ModerationCard({ title, meta, children, actions }: Props) {
  return (
    <article className="rounded-xl border border-slate-200 p-4">
      <p className="font-semibold text-slate-900">{title}</p>
      {meta ? <p className="mt-1 text-xs text-slate-500">{meta}</p> : null}
      {children ? <div className="mt-3">{children}</div> : null}
      {actions ? <div className="mt-3 flex flex-wrap gap-2">{actions}</div> : null}
    </article>
  );
}

