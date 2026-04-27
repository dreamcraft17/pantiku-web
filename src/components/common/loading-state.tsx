export function LoadingState({ message = "Memuat data..." }: { message?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
      {message}
    </div>
  );
}
