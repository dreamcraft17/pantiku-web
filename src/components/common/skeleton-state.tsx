export function SkeletonState({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-xl border border-slate-200 bg-white p-5">
          <div className="h-4 w-24 rounded bg-slate-200" />
          <div className="mt-3 h-6 w-4/5 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-full rounded bg-slate-200" />
          <div className="mt-2 h-4 w-5/6 rounded bg-slate-200" />
          <div className="mt-6 h-2 w-full rounded bg-slate-200" />
          <div className="mt-4 h-10 w-36 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
