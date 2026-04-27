export function ErrorState({ message = "Terjadi kendala. Silakan coba lagi.", onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
      <p>{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-md border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700"
        >
          Coba Lagi
        </button>
      ) : null}
    </div>
  );
}
