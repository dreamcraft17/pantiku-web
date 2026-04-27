import { Product, mockProducts } from "../mock/data";
import { safeGet } from "./client";
import { isDemoMode } from "../config/demo";

type ProductApiItem = {
  id?: string;
  name?: string;
  description?: string;
  price?: string | number;
  stock?: string | number;
  orphanage?: {
    publicAlias?: string;
  };
};

function inferProductCategory(name: string): Product["category"] {
  const lower = name.toLowerCase();
  if (lower.includes("bag") || lower.includes("apron")) return "Fashion";
  if (lower.includes("cookies") || lower.includes("kue")) return "Kuliner";
  if (lower.includes("notebook") || lower.includes("alat tulis")) return "Alat Tulis";
  return "Kerajinan";
}

function normalizeProduct(input: ProductApiItem): Product {
  const name = input?.name ?? "Produk Karya Panti";
  const description = input?.description ?? "Produk hasil karya panti mitra Pantiku.";
  return {
    id: String(input?.id ?? `product-${Date.now()}`),
    name,
    orphanageName: input?.orphanage?.publicAlias ?? "Panti Mitra Pantiku",
    category: inferProductCategory(name),
    shortStory: description.slice(0, 120),
    story: description,
    orphanageProfile: "Panti mitra fokus pada program produktif dan kemandirian.",
    stock: Number(input?.stock ?? 0),
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"],
    price: Number(input?.price ?? 0),
  };
}

export async function getProducts() {
  const response = await safeGet<ProductApiItem[] | unknown>("/api/v1/products", isDemoMode ? mockProducts : []);
  if (!Array.isArray(response)) return [];
  return response.map((item) => normalizeProduct(item as ProductApiItem));
}

export async function getProductById(id: string) {
  const fallback = isDemoMode ? mockProducts.find((item) => item.id === id) ?? null : null;
  const response = await safeGet<ProductApiItem | unknown>(`/api/v1/products/${id}`, fallback);
  if (!response) return null;
  return normalizeProduct(response as ProductApiItem);
}
