import { apiClient } from "./client";

export type CreateDonationResult = {
  donationId: string;
  paymentId: string;
  paymentUrl: string;
  status: "PENDING" | "PAID" | "FAILED";
};

export type CreateOrderResult = {
  orderId: string;
  paymentId: string;
  paymentUrl: string;
  status: "PENDING" | "PAID" | "FAILED";
};

export type PaymentStatusResult = {
  paymentId: string;
  status: "PENDING" | "PAID" | "FAILED";
  referenceType: "DONATION" | "ORDER";
  referenceId: string;
};

function unwrap<T>(raw: { data?: T } | T): T {
  if (raw && typeof raw === "object" && "data" in (raw as Record<string, unknown>)) {
    return (raw as { data: T }).data;
  }
  return raw as T;
}

export async function createDonation(campaignId: string, amount: number): Promise<CreateDonationResult> {
  const response = await apiClient.post(`/api/v1/campaigns/${campaignId}/donate`, { amount });
  return unwrap<CreateDonationResult>(response.data);
}

export async function createOrder(productId: string, quantity = 1): Promise<CreateOrderResult> {
  const response = await apiClient.post("/api/v1/orders", { productId, quantity });
  return unwrap<CreateOrderResult>(response.data);
}

export async function getPaymentStatus(paymentId: string): Promise<PaymentStatusResult> {
  const response = await apiClient.get(`/api/v1/payments/${paymentId}/status`);
  return unwrap<PaymentStatusResult>(response.data);
}

export async function simulatePaymentSuccess(paymentId: string): Promise<PaymentStatusResult> {
  const response = await apiClient.post(`/api/v1/payments/${paymentId}/simulate-success`);
  return unwrap<PaymentStatusResult>(response.data);
}

export async function simulatePaymentFailure(paymentId: string): Promise<PaymentStatusResult> {
  const response = await apiClient.post(`/api/v1/payments/${paymentId}/simulate-failure`);
  return unwrap<PaymentStatusResult>(response.data);
}
