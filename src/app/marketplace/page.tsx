"use client";

import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/common/section-header";
import { ProductCard } from "@/features/products/components/product-card";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { useProducts } from "@/features/products/api/use-products";
import { SkeletonState } from "@/components/common/skeleton-state";
import { PrimaryButton } from "@/components/common/primary-button";
import { isDemoMode } from "@/lib/config/demo";

export default function MarketplacePage() {
  const query = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  const categories = useMemo(() => {
    const items = query.data?.map((item) => item.category) ?? [];
    return ["Semua", ...Array.from(new Set(items))];
  }, [query.data]);

  const filteredProducts = useMemo(() => {
    const list = query.data ?? [];
    return list.filter((product) => {
      const matchSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.orphanageName.toLowerCase().includes(search.toLowerCase()) ||
        product.shortStory.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "Semua" || product.category === category;
      return matchSearch && matchCategory;
    });
  }, [query.data, search, category]);

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
      {query.isLoading ? <SkeletonState count={8} /> : null}
      {query.isError ? <ErrorState onRetry={() => query.refetch()} /> : null}
      {query.data && filteredProducts.length === 0 ? (
        <div className="space-y-4">
          <EmptyState
            title="Produk karya panti segera hadir"
            description="Marketplace Pantiku akan menampilkan produk dari panti mitra setelah proses kurasi dan verifikasi selesai."
          />
          <PrimaryButton href="/register" label="Saya Pengelola Panti" variant="outline" />
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
