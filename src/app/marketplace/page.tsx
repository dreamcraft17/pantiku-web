"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { SectionHeader } from "@/components/common/section-header";
import { ProductCard } from "@/features/products/components/product-card";
import { EmptyState } from "@/components/common/empty-state";
import { PrimaryButton } from "@/components/common/primary-button";
import { LoadingState } from "@/components/common/loading-state";
import { isDemoMode } from "@/lib/config/demo";
import { useProductStore } from "@/features/marketplace/store/product-store";
import { useOrphanageStore } from "@/features/orphanages/store/orphanage-store";
import { Product } from "@/lib/mock/data";
import { mockProducts } from "@/lib/mock/data";

type ProductListItem = Product & {
  orphanageVerificationStatus?: "PENDING" | "VERIFIED" | "REJECTED";
};

export default function MarketplacePage() {
  const products = useProductStore((state) => state.products);
  const orphanages = useOrphanageStore((state) => state.orphanages);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const mergedProducts = useMemo<ProductListItem[]>(() => {
    const localProducts: ProductListItem[] = products.map((product) => {
      const orphanage = orphanages.find((item) => item.id === product.orphanageId || item.managerUserId === product.createdBy);
      return {
        id: product.id,
        name: product.name,
        orphanageName: orphanage?.name ?? "Panti Mitra Pantiku",
        category: "Kerajinan",
        shortStory: product.description,
        story: product.description,
        orphanageProfile: orphanage?.description ?? "Profil panti belum tersedia.",
        stock: product.stock,
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"],
        price: product.price,
        orphanageVerificationStatus: orphanage?.verificationStatus,
      };
    });

    if (isDemoMode) return [...localProducts, ...mockProducts];
    return localProducts;
  }, [orphanages, products]);

  const categories = useMemo(() => {
    const items = mergedProducts.map((item) => item.category);
    return ["Semua", ...Array.from(new Set(items))];
  }, [mergedProducts]);

  const filteredProducts = useMemo(() => {
    return mergedProducts.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.orphanageName.toLowerCase().includes(search.toLowerCase()) ||
        product.shortStory.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "Semua" || product.category === category;
      return matchSearch && matchCategory;
    });
  }, [category, mergedProducts, search]);

  if (!hydrated) {
    return <LoadingState message="Memuat marketplace..." />;
  }

  return (
    <section>
      <SectionHeader
        eyebrow="Marketplace"
        title="Produk Karya Panti"
        description="Setiap pembelian mendukung program produktif dan kemandirian panti."
      />
      {isDemoMode ? (
        <div className="mb-4 inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
          Mode Demo — data hanya contoh
        </div>
      ) : null}
      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_220px]">
        <input
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2"
          placeholder="Cari produk atau panti..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          className="rounded-md border border-slate-300 bg-white px-3 py-2"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="space-y-4">
          <EmptyState
            title="Belum ada produk marketplace"
            description="Produk karya panti akan muncul setelah panti terverifikasi menambahkan produk."
          />
          <PrimaryButton href="/dashboard/panti/create-product" label="Tambah Produk" variant="outline" />
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
