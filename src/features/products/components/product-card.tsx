import Image from "next/image";
import { Product } from "@/lib/mock/data";
import { formatRupiah } from "@/lib/utils/format";
import { PrimaryButton } from "@/components/common/primary-button";

type ProductCardData = Product & {
  orphanageVerificationStatus?: "PENDING" | "VERIFIED" | "REJECTED";
};

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-300">
      <div className="relative h-44 w-full overflow-hidden rounded-lg">
        <Image src={product.images[0]} alt={product.name} fill sizes="100vw" className="object-cover" />
      </div>
      <p className="mt-3 text-xs font-semibold text-amber-700">Produk Karya Panti</p>
      <h3 className="mt-1 text-lg font-semibold text-slate-900">{product.name}</h3>
      <p className="mt-1 text-sm text-slate-700">{product.orphanageName}</p>
      {product.orphanageVerificationStatus === "VERIFIED" ? (
        <p className="mt-1 inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">Panti Terverifikasi</p>
      ) : null}
      <p className="mt-2 text-sm text-slate-600">{product.shortStory}</p>
      <p className="mt-3 text-base font-bold text-emerald-800">{formatRupiah(product.price)}</p>
      <div className="mt-4">
        <PrimaryButton href={`/marketplace/${product.id}`} label="Lihat Produk" />
      </div>
    </div>
  );
}
