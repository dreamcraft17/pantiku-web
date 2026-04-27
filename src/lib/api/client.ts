import axios from "axios";
import { useAuthStore } from "@/features/auth/store/auth-store";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
  timeout: 10000,
});

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
};

function isApiEnvelope<T>(value: unknown): value is ApiEnvelope<T> {
  if (!value || typeof value !== "object") return false;
  return "success" in value && "data" in value;
}

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const config = error?.config;

    if (status === 401) {
      useAuthStore.getState().clearAuth();
      return Promise.reject(error);
    }

    config.__retryCount = config.__retryCount ?? 0;
    if (config.__retryCount < 2 && (!status || status >= 500)) {
      config.__retryCount += 1;
      await new Promise((resolve) => setTimeout(resolve, 300 * config.__retryCount));
      return apiClient(config);
    }

    return Promise.reject(error);
  }
);

export async function safeGet<T>(url: string, fallback: T): Promise<T> {
  try {
    const response = await apiClient.get<T>(url);
    const payload: unknown = response.data;
    if (isApiEnvelope<T>(payload)) {
      return payload.data;
    }
    return response.data;
  } catch {
    return fallback;
  }
}

export async function safePost<TBody, TRes>(url: string, body: TBody, fallback: TRes): Promise<TRes> {
  try {
    const response = await apiClient.post<TRes>(url, body);
    const payload: unknown = response.data;
    if (isApiEnvelope<TRes>(payload)) {
      return payload.data;
    }
    return response.data;
  } catch {
    return fallback;
  }
}
