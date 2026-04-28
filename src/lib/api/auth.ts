import { safeGet, safePost } from "./client";

export type AppUser = {
  id?: string;
  fullName?: string;
  email?: string;
  role: "ADMIN" | "ORPHANAGE_MANAGER" | "DONOR" | "VOLUNTEER";
  orphanageVerificationStatus?: "PENDING" | "VERIFIED" | "REJECTED";
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  message?: string;
  user: AppUser;
};

type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

function unwrapAuthResponse(input: AuthResponse | ApiEnvelope<AuthResponse>): AuthResponse {
  const candidate = (input as ApiEnvelope<AuthResponse>)?.data ?? (input as AuthResponse);
  return {
    accessToken: candidate.accessToken,
    refreshToken: candidate.refreshToken,
    message: candidate.message ?? (input as ApiEnvelope<AuthResponse>)?.message,
    user: candidate.user,
  };
}

export async function login(email: string, password: string) {
  const response = await safePost(
    "/api/v1/auth/login",
    { email, password },
    {
      accessToken: "mock-web-access-token",
      refreshToken: "mock-web-refresh-token",
      user: { role: "DONOR" }
    } satisfies AuthResponse
  );
  return unwrapAuthResponse(response as AuthResponse | ApiEnvelope<AuthResponse>);
}

export async function loginWithGoogle(idToken: string) {
  const response = await safePost(
    "/api/v1/auth/google",
    { idToken },
    {
      accessToken: "mock-web-access-token",
      refreshToken: "mock-web-refresh-token",
      user: { role: "DONOR" }
    } satisfies AuthResponse
  );
  return unwrapAuthResponse(response as AuthResponse | ApiEnvelope<AuthResponse>);
}

export async function loginWithClerk(payload: { email: string; name: string; clerkId: string }) {
  const response = await safePost(
    "/api/v1/auth/clerk",
    payload,
    {
      accessToken: "mock-web-access-token",
      refreshToken: "mock-web-refresh-token",
      user: { role: "DONOR" }
    } satisfies AuthResponse
  );
  return unwrapAuthResponse(response as AuthResponse | ApiEnvelope<AuthResponse>);
}

export type RegisterPayload = {
  accountType: "DONOR" | "ORPHANAGE_MANAGER" | "VOLUNTEER";
  fullName?: string;
  managerName?: string;
  email: string;
  password: string;
  phone?: string;
  skills?: string;
  city?: string;
  orphanageName?: string;
  address?: string;
  province?: string;
  contactPhone?: string;
  estimatedChildrenCount?: number;
};

export async function register(payload: RegisterPayload) {
  const response = await safePost(
    "/api/v1/auth/register",
    payload,
    {
      accessToken: "mock-web-access-token",
      refreshToken: "mock-web-refresh-token",
      message:
        payload.accountType === "ORPHANAGE_MANAGER"
          ? "Pendaftaran panti berhasil dikirim. Tim Pantiku akan melakukan verifikasi sebelum campaign dapat dibuat."
          : "Registrasi berhasil.",
      user: { role: "DONOR" }
    } satisfies AuthResponse
  );
  return unwrapAuthResponse(response as AuthResponse | ApiEnvelope<AuthResponse>);
}

export async function getMe() {
  const response = await safeGet<AppUser | ApiEnvelope<AppUser> | null>("/api/v1/auth/me", null);
  if (!response) return null;
  const user = (response as ApiEnvelope<AppUser>)?.data ?? (response as AppUser);
  return { user };
}
