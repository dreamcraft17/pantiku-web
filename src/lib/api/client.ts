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

type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

let refreshPromise: Promise<TokenPair | null> | null = null;

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
    const config = (error?.config ?? {}) as typeof error.config & {
      _retry?: boolean;
      url?: string;
    };

    if (status === 401) {
      const isRefreshCall = config.url?.includes("/api/v1/auth/refresh");
      if (isRefreshCall || config._retry) {
        useAuthStore.getState().logout();
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject(error);
      }

      const authState = useAuthStore.getState();
      if (!authState.refreshToken) {
        authState.logout();
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject(error);
      }

      if (!refreshPromise) {
        refreshPromise = axios
          .post<ApiEnvelope<TokenPair>>(
            `${apiClient.defaults.baseURL}/api/v1/auth/refresh`,
            { refreshToken: authState.refreshToken },
            { timeout: apiClient.defaults.timeout }
          )
          .then((response) => {
            const payload = response.data;
            const tokens = isApiEnvelope<TokenPair>(payload) ? payload.data : (payload as unknown as TokenPair);
            useAuthStore.getState().setTokens(tokens.accessToken, tokens.refreshToken);
            return tokens;
          })
          .catch(() => {
            useAuthStore.getState().logout();
            if (typeof window !== "undefined") window.location.href = "/login";
            return null;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const refreshedTokens = await refreshPromise;
      if (!refreshedTokens) {
        return Promise.reject(error);
      }

      config._retry = true;
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${refreshedTokens.accessToken}`;
      return apiClient(config);
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
