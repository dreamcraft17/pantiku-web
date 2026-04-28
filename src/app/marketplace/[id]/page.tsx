"use client";

import { useMemo, useSyncExternalStore } from "react";
import { useParams } from "next/navigation";
import { EmptyState } from "@/components/common/empty-state";
import { LoadingState } from "@/components/common/loading-state";
import { formatRupiah } from "@/lib/utils/format";
import { PrimaryButton } from "@/components/common/primary-button";
import { ProductCard } from "@/features/products/components/product-card";
import { useProductStore } from "@/features/marketplace/store/product-store";
import { useOrphanageStore } from "@/features/orphanages/store/orphanage-store";
import { mockProducts } from "@/lib/mock/data";
import { isDemoMode } from "@/lib/config/demo";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const products = useProductStore((state) => state.products);
  const orphanages = useOrphanageStore((state) => state.orphanages);
  const localProduct = products.find((item) => item.id === id);
  const product = useMemo(() => {
    if (localProduct) {
      const orphanage = orphanages.find((item) => item.id === localProduct.orphanageId || item.managerUserId === localProduct.createdBy);
      return {
        id: localProduct.id,
        name: localProduct.name,
        description: localProduct.description,
        price: localProduct.price,
        stock: localProduct.stock,
        orphanageName: orphanage?.name ?? "Panti Mitra Pantiku",
        orphanageVerificationStatus: orphanage?.verificationStatus,
      };
    }
    if (!isDemoMode) return null;
    const demo = mockProducts.find((item) => item.id === id);
    if (!demo) return null;
    return {
      id: demo.id,
      name: demo.name,
      description: demo.story,
      price: demo.price,
      stock: demo.stock,
      orphanageName: demo.orphanageName,
      orphanageVerificationStatus: "VERIFIED" as const,
    };
  }, [id, localProduct, orphanages]);
  const relatedProducts = useMemo(() => {
    const localMapped = products
      .filter((item) => item.id !== id)
      .slice(0, 4)
      .map((item) => {
        const orphanage = orphanages.find((candidate) => candidate.id === item.orphanageId || candidate.managerUserId === item.createdBy);
        return {
          id: item.id,
          name: item.name,
          orphanageName: orphanage?.name ?? "Panti Mitra Pantiku",
          category: "Kerajinan" as const,
          shortStory: item.description,
          story: item.description,
          orphanageProfile: orphanage?.description ?? "Profil panti belum tersedia.",
          stock: item.stock,
          images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"],
          price: item.price,
          orphanageVerificationStatus: orphanage?.verificationStatus,
        };
      });
    if (localMapped.length > 0 || !isDemoMode) return localMapped;
    return mockProducts.filter((item) => item.id !== id).slice(0, 4);
  }, [id, orphanages, products]);

  if (!hydrated) return <LoadingState message="Memuat detail produk..." />;

  if (!product) return <EmptyState title="Produk tidak ditemukan" description="Silakan kembali ke marketplace." />;

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_340px]">
        <div className="rounded-xl bg-white p-6">
          <p className="text-sm font-semibold text-amber-700">Produk Karya Panti</p>
          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-sm text-slate-700">{product.orphanageName}</p>
          {product.orphanageVerificationStatus === "VERIFIED" ? (
            <p className="mt-2 inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">Panti Terverifikasi</p>
          ) : null}
          <p className="mt-4 text-2xl font-bold text-emerald-800">{formatRupiah(product.price)}</p>
          <p className="mt-4 text-slate-700">{product.description}</p>
          <p className="mt-4 text-sm font-medium text-slate-800">Stok tersedia: {product.stock}</p>
        </div>
        <aside className="xl:sticky xl:top-24 xl:h-fit">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-amber-700">Aksi Cepat</p>
            <p className="mt-2 text-sm text-slate-600">Hubungi panti untuk melanjutkan minat terhadap produk ini.</p>
            <div className="mt-4">
              <PrimaryButton label="Minat Produk" href="/orphanages" />
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
