"use client";

import { useMutation } from "@tanstack/react-query";
import { login, loginWithGoogle, RegisterPayload, register } from "@/lib/api/auth";
import { useAuthStore } from "../store/auth-store";

export function useLogin() {
  const setTokens = useAuthStore((state) => state.setTokens);
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => login(email, password),
    onSuccess: (data) => setTokens(data.accessToken, data.refreshToken, data.user.role, data.user),
  });
}

export function useRegister() {
  const setTokens = useAuthStore((state) => state.setTokens);
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: (data) => setTokens(data.accessToken, data.refreshToken, data.user.role, data.user),
  });
}

export function useGoogleLogin() {
  const setTokens = useAuthStore((state) => state.setTokens);
  return useMutation({
    mutationFn: ({ idToken }: { idToken: string }) => loginWithGoogle(idToken),
    onSuccess: (data) => setTokens(data.accessToken, data.refreshToken, data.user.role, data.user),
  });
}
