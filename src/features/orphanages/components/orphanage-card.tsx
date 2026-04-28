import Link from "next/link";
import { Orphanage } from "@/lib/mock/data";

export function OrphanageCard({ orphanage }: { orphanage: Orphanage }) {
  return (
    <Link href={`/orphanages/${orphanage.id}`} className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-emerald-300">
      <p className="text-xs font-semibold text-emerald-700">Panti Berdaya</p>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">{orphanage.name}</h3>
      {orphanage.verificationStatus === "VERIFIED" ? (
        <p className="mt-1 inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">Panti Terverifikasi</p>
      ) : null}
      <p className="mt-1 text-sm text-slate-600">{orphanage.location}</p>
      <p className="mt-2 text-sm text-slate-700">{orphanage.description}</p>
    </Link>
  );
}
