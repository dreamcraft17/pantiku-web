type Props = {
  status: "PENDING" | "VERIFIED" | "REJECTED";
};

const STATUS_META = {
  PENDING: { label: "Menunggu Verifikasi", className: "bg-amber-100 text-amber-800 border-amber-200" },
  VERIFIED: { label: "Panti Terverifikasi", className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  REJECTED: { label: "Perlu Perbaikan", className: "bg-rose-100 text-rose-800 border-rose-200" },
} as const;

export function StatusBadge({ status }: Props) {
  const meta = STATUS_META[status];
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${meta.className}`}>{meta.label}</span>;
}
