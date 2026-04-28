"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ProtectedDashboard } from "@/components/dashboard/ProtectedDashboard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useToast } from "@/components/common/toast-provider";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useOrphanageStore } from "@/features/orphanages/store/orphanage-store";
import { useProductStore } from "@/features/marketplace/store/product-store";

function buildProductId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `local-product-${Date.now()}`;
}

export default function CreateProductPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const user = useAuthStore((state) => state.user);
  const orphanages = useOrphanageStore((state) => state.orphanages);
  const addProduct = useProductStore((state) => state.addProduct);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentUserId = user?.id ?? user?.email ?? "orphanage-manager-local";
  const orphanageProfile = orphanages.find((item) => item.managerUserId === currentUserId);
  const isVerified = orphanageProfile?.verificationStatus === "VERIFIED";

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    const normalizedName = name.trim();
    const normalizedDescription = description.trim();
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (!normalizedName || !normalizedDescription || !Number.isFinite(parsedPrice) || parsedPrice <= 0 || !Number.isFinite(parsedStock) || parsedStock < 0) {
      showToast("Lengkapi data produk dengan format yang valid.", "error");
      return;
    }

    if (!isVerified || !orphanageProfile) {
      showToast("Hanya panti terverifikasi yang dapat menambah produk.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const productId = buildProductId();
      addProduct({
        id: productId,
        orphanageId: orphanageProfile.id,
        createdBy: currentUserId,
        name: normalizedName,
        description: normalizedDescription,
        price: Math.floor(parsedPrice),
        stock: Math.floor(parsedStock),
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
      });
      showToast("Produk berhasil ditambahkan.");
      router.push(`/marketplace/${productId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedDashboard allowedRoles={["ORPHANAGE_MANAGER"]}>
      <DashboardLayout>
        <DashboardHeader title="Tambah Produk Marketplace" subtitle="Produk yang kamu tambah akan tampil di marketplace Pantiku untuk mendukung kemandirian panti." />

        <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          {!isVerified ? (
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-800">Produk belum bisa ditambahkan</p>
              <p className="mt-1 text-sm text-amber-700">Kamu perlu status panti terverifikasi sebelum menambahkan produk ke marketplace.</p>
              <Link href="/dashboard/panti/verification" className="mt-2 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                Ajukan Verifikasi Panti
              </Link>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="product-name" className="text-sm font-medium text-slate-700">
                Nama Produk
              </label>
              <input
                id="product-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                placeholder="Contoh: Tote Bag Karya Remaja"
                required
                disabled={!isVerified}
              />
            </div>
            <div>
              <label htmlFor="product-description" className="text-sm font-medium text-slate-700">
                Deskripsi
              </label>
              <textarea
                id="product-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                rows={4}
                placeholder="Jelaskan nilai produk dan cerita singkat pembuatannya."
                required
                disabled={!isVerified}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="product-price" className="text-sm font-medium text-slate-700">
                  Harga (Rp)
                </label>
                <input
                  id="product-price"
                  type="number"
                  min={1}
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                  required
                  disabled={!isVerified}
                />
              </div>
              <div>
                <label htmlFor="product-stock" className="text-sm font-medium text-slate-700">
                  Stok
                </label>
                <input
                  id="product-stock"
                  type="number"
                  min={0}
                  value={stock}
                  onChange={(event) => setStock(event.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                  required
                  disabled={!isVerified}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isVerified}
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
            </button>
          </form>
        </section>
      </DashboardLayout>
    </ProtectedDashboard>
  );
}

