"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SignInButton, useClerk, useUser } from "@clerk/nextjs";
import { useClerkLogin, useLogin } from "@/features/auth/api/use-auth";
import { useToast } from "@/components/common/toast-provider";
import { useAnalytics } from "@/lib/analytics/use-analytics";
import { Button } from "@/components/ui/button";
import { getDashboardPathByRole } from "@/lib/auth/redirects";

export default function LoginPage() {
  const router = useRouter();
  const { loaded: isClerkLoaded } = useClerk();
  const { isSignedIn, isLoaded, user } = useUser();
  const { showToast } = useToast();
  const analytics = useAnalytics();
  const loginMutation = useLogin();
  const clerkLoginMutation = useClerkLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [clerkError, setClerkError] = useState<string | null>(null);
  const syncedClerkIdRef = useRef<string | null>(null);
  const hasClerkKey = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    if (clerkLoginMutation.isPending) return;
    if (syncedClerkIdRef.current === user.id) return;

    const primaryEmail = user.primaryEmailAddress?.emailAddress;
    if (!primaryEmail) {
      showToast("Email akun Google tidak ditemukan.", "error");
      return;
    }

    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || user.fullName || "Pengguna Pantiku";

    clerkLoginMutation.mutate(
      {
        email: primaryEmail,
        name: fullName,
        clerkId: user.id,
      },
      {
        onSuccess: (data) => {
          syncedClerkIdRef.current = user.id;
          setClerkError(null);
          analytics.track("login", { email: data.user?.email ?? primaryEmail, method: "clerk_google" });
          showToast("Berhasil masuk dengan Google.");
          router.push(getDashboardPathByRole(data.user?.role ?? null));
        },
        onError: () => {
          setClerkError("Login Google gagal. Silakan coba lagi.");
          showToast("Login Google gagal. Silakan coba lagi.", "error");
        },
      }
    );
  }, [analytics, clerkLoginMutation, isLoaded, isSignedIn, router, showToast, user]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) {
      setFormError("Format email tidak valid.");
      return;
    }
    if (password.length < 8) {
      setFormError("Password minimal 8 karakter.");
      return;
    }
    setFormError(null);
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          analytics.track("login", { email });
          showToast("Berhasil masuk. Selamat datang kembali.");
          router.push(getDashboardPathByRole(data.user?.role ?? null));
        },
        onError: () => showToast("Login gagal. Silakan coba lagi.", "error"),
      }
    );
  };

  return (
    <section className="mx-auto mt-12 w-full max-w-md px-2">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Kembali ke Pantiku</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Masuk untuk melanjutkan kontribusimu dalam membangun panti yang lebih mandiri.
      </p>
      <p className="mt-2 text-xs text-slate-500">Masuk sebagai donatur, pengelola panti, atau relawan.</p>

      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <form className="space-y-4" onSubmit={onSubmit}>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {formError ? <p className="text-sm text-red-600">{formError}</p> : null}
          {loginMutation.isError ? <p className="text-sm text-red-600">Login gagal. Coba lagi.</p> : null}
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            size="lg"
            className="w-full rounded-xl shadow-sm transition hover:shadow-md"
          >
            {loginMutation.isPending ? "Memproses..." : "Masuk"}
          </Button>
        </form>
        <div className="mt-4 space-y-2">
          <div className="text-center text-xs text-slate-500">atau</div>
          {hasClerkKey ? (
            <SignInButton mode="modal">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full rounded-xl border-slate-300"
                disabled={clerkLoginMutation.isPending || !isClerkLoaded}
              >
                {clerkLoginMutation.isPending
                  ? "Memproses Google Login..."
                  : !isClerkLoaded
                    ? "Menyiapkan Google Login..."
                    : "Login dengan Google"}
              </Button>
            </SignInButton>
          ) : (
            <Button type="button" variant="outline" size="lg" className="w-full rounded-xl border-slate-300" disabled>
              Login dengan Google belum aktif
            </Button>
          )}
          {!hasClerkKey ? (
            <p className="text-center text-xs text-amber-700">Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` di env web.</p>
          ) : null}
          {clerkError ? <p className="text-center text-sm text-red-600">{clerkError}</p> : null}
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold text-emerald-700 hover:text-emerald-800">
            Daftar di Pantiku
          </Link>
        </p>
      </div>

      <p className="mt-4 text-center text-xs text-gray-500">
        Pantiku membangun ekosistem yang transparan, terverifikasi, dan berkelanjutan untuk panti dan anak-anak.
      </p>
    </section>
  );
}
