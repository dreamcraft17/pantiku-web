type Props = {
  title: string;
  subtitle: string;
};

export function DashboardHeader({ title, subtitle }: Props) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h1>
      <p className="mt-2 text-slate-600">{subtitle}</p>
    </div>
  );
}
