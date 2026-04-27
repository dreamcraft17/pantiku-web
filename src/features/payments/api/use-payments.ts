"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDonation,
  createOrder,
  getPaymentStatus,
  simulatePaymentFailure,
  simulatePaymentSuccess
} from "@/lib/api/payments";

export function useCreateDonation() {
  return useMutation({
    mutationFn: ({ campaignId, amount }: { campaignId: string; amount: number }) => createDonation(campaignId, amount)
  });
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity?: number }) => createOrder(productId, quantity ?? 1)
  });
}

export function usePaymentStatus(paymentId?: string) {
  return useQuery({
    queryKey: ["payment-status", paymentId],
    queryFn: () => getPaymentStatus(paymentId!),
    enabled: Boolean(paymentId)
  });
}

export function useSimulatePaymentSuccess() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paymentId: string) => simulatePaymentSuccess(paymentId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["impact"] });
      await queryClient.invalidateQueries({ queryKey: ["impact-stories"] });
    }
  });
}

export function useSimulatePaymentFailure() {
  return useMutation({
    mutationFn: (paymentId: string) => simulatePaymentFailure(paymentId)
  });
}
