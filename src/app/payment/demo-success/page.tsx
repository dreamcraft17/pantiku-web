"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PrimaryButton } from "@/components/common/primary-button";

function DemoPaymentSuccessContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const message =
    type === "order"
      ? "Terima kasih. Pembelianmu mendukung karya panti."
      : "Terima kasih. Dukunganmu membantu panti membangun kemandirian.";

  return (
    <section className="mx-auto max-w-2xl rounded-xl bg-white p-8">
      <p className="text-sm font-semibold text-emerald-700">Demo Mode</p>
      <h1 className="mt-2 text-2xl font-bold">Pembayaran Berhasil</h1>
      <p className="mt-3 text-slate-700">{message}</p>
      <div className="mt-6">
        <PrimaryButton href="/impact" label="Lihat Dampak" />
      </div>
    </section>
  );
}

export default function DemoPaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-2xl rounded-xl bg-white p-8">
          <p className="text-sm text-slate-600">Memuat status pembayaran...</p>
        </section>
      }
    >
      <DemoPaymentSuccessContent />
    </Suspense>
  );
}
