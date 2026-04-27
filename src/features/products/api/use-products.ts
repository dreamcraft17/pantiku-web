"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductById, getProducts } from "@/lib/api/products";

export function useProducts() {
  return useQuery({ queryKey: ["products"], queryFn: getProducts });
}

export function useProductDetail(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: Boolean(id),
  });
}
