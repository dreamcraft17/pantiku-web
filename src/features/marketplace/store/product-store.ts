"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ManagedProduct = {
  id: string;
  orphanageId: string;
  createdBy: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "INACTIVE" | "REJECTED";
  createdAt: string;
  rejectionReason?: string;
};

type ProductState = {
  products: ManagedProduct[];
  addProduct: (product: ManagedProduct) => void;
  updateProduct: (id: string, payload: Partial<ManagedProduct>) => void;
  getProducts: () => ManagedProduct[];
  getProductById: (id: string) => ManagedProduct | undefined;
  getProductsByOwner: (userId: string) => ManagedProduct[];
  clearProducts: () => void;
};

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) =>
        set((state) => ({
          products: [product, ...state.products],
        })),
      updateProduct: (id, payload) =>
        set((state) => ({
          products: state.products.map((item) => (item.id === id ? { ...item, ...payload } : item)),
        })),
      getProducts: () => get().products,
      getProductById: (id) => get().products.find((item) => item.id === id),
      getProductsByOwner: (userId) => get().products.filter((item) => item.createdBy === userId),
      clearProducts: () => set({ products: [] }),
    }),
    { name: "pantiku-web-products" }
  )
);

