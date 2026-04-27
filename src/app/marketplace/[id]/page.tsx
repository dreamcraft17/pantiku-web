"use client";

import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { LoadingState } from "@/components/common/loading-state";
import { EmptyState } from "@/components/common/empty-state";
import { formatRupiah } from "@/lib/utils/format";
import { PrimaryButton } from "@/components/common/primary-button";
import { ProductCard } from "@/features/products/components/product-card";
import { useProductDetail, useProducts } from "@/features/products/api/use-products";
import { useAnalytics } from "@/lib/analytics/use-analytics";
import { useCreateOrder, useSimulatePaymentSuccess } from "@/features/payments/api/use-payments";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useToast } from "@/components/common/toast-provider";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const analytics = useAnalytics();
  const token = useAuthStore((state) => state.token);
  const { showToast } = useToast();
  const createOrderMutation = useCreateOrder();
  const simulateSuccessMutation = useSimulatePaymentSuccess();
  const query = useProductDetail(id);
  const relatedQuery = useProducts();
  const relatedProducts = useMemo(
    () => (relatedQuery.data ?? []).filter((item) => item.id !== id).slice(0, 4),
    [relatedQuery.data, id]
  );
  const product = query.data;

  useEffect(() => {
    if (!product) return;
    analytics.track("view_product", { productId: product.id, name: product.name });
  }, [analytics, product]);

  if (query.isLoading) return <LoadingState message="Memuat detail produk..." />;
  if (!product) return <EmptyState title="Produk tidak ditemukan" description="Silakan kembali ke marketplace." />;

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_340px]">
        <div className="rounded-xl bg-white p-6">
        <p className="text-sm font-semibold text-amber-700">Produk Karya Panti</p>
        <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
        <p className="mt-4 text-2xl font-bold text-emerald-800">{formatRupiah(product.price)}</p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {product.images.map((image, index) => (
            <div key={`${product.id}-img-${index}`} className="relative h-56 w-full overflow-hidden rounded-lg">
              <Image src={image} alt={`${product.name} ${index + 1}`} fill sizes="100vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h2 className="font-semibold">Profil Panti</h2>
          <p className="mt-1 text-sm text-slate-700">{product.orphanageName}</p>
          <p className="mt-2 text-sm text-slate-600">{product.orphanageProfile}</p>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold">Cerita di Balik Produk</h2>
          <p className="mt-2 text-slate-700">{product.story}</p>
        </div>

        <p className="mt-4 text-sm font-medium text-slate-800">Stok tersedia: {product.stock}</p>

        {createOrderMutation.data?.paymentId ? (
          <div className="mt-4 rounded-md border border-slate-200 bg-white p-4">
            <p className="text-sm font-medium text-slate-800">Pembayaran Demo Siap</p>
            <p className="mt-1 text-xs text-slate-600 break-all">URL: {createOrderMutation.data.paymentUrl}</p>
            <div className="mt-3">
              <PrimaryButton
                label={simulateSuccessMutation.isPending ? "Memproses..." : "Simulasikan Pembayaran Berhasil"}
                onClick={async () => {
                  if (simulateSuccessMutation.isPending) return;
                  try {
                    await simulateSuccessMutation.mutateAsync(createOrderMutation.data!.paymentId);
                    router.push("/payment/demo-success?type=order");
                  } catch {
                    showToast("Pembayaran demo belum berhasil. Silakan coba lagi.");
                    router.push("/payment/demo-failed?type=order");
                  }
                }}
              />
            </div>
          </div>
        ) : null}
        </div>
        <aside className="xl:sticky xl:top-24 xl:h-fit">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-amber-700">Aksi Cepat</p>
            <p className="mt-2 text-sm text-slate-600">Lanjutkan pembelian produk untuk mendukung kemandirian panti.</p>
            <div className="mt-4">
              <PrimaryButton
                label="Beli Produk"
                onClick={async () => {
                  if (!token) {
                    showToast("Silakan login terlebih dahulu untuk membeli produk.");
                    router.push("/login");
                    return;
                  }
                  analytics.track("buy_product", { productId: product.id, price: product.price });
                  try {
                    await createOrderMutation.mutateAsync({ productId: product.id, quantity: 1 });
                  } catch {
                    showToast("Gagal membuat sesi pembayaran. Coba lagi.");
                  }
                }}
              />
            </div>
          </div>
        </aside>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold">Produk Terkait</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
