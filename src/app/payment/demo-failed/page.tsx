"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PrimaryButton } from "@/components/common/primary-button";

function DemoPaymentFailedContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const backHref = type === "order" ? "/marketplace" : "/campaigns";

  return (
    <section className="mx-auto max-w-2xl rounded-xl bg-white p-8">
      <p className="text-sm font-semibold text-amber-700">Demo Mode</p>
      <h1 className="mt-2 text-2xl font-bold">Pembayaran Belum Berhasil</h1>
      <p className="mt-3 text-slate-700">Pembayaran demo belum berhasil. Silakan coba lagi untuk melanjutkan dukunganmu.</p>
      <div className="mt-6">
        <PrimaryButton href={backHref} label="Coba Lagi" />
      </div>
    </section>
  );
}

export default function DemoPaymentFailedPage() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-2xl rounded-xl bg-white p-8">
          <p className="text-sm text-slate-600">Memuat status pembayaran...</p>
        </section>
      }
    >
      <DemoPaymentFailedContent />
    </Suspense>
  );
}
