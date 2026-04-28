"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { useGoogleLogin, useLogin } from "@/features/auth/api/use-auth";
import { useToast } from "@/components/common/toast-provider";
import { useAnalytics } from "@/lib/analytics/use-analytics";
import { Button } from "@/components/ui/button";
import { getDashboardPathByRole } from "@/lib/auth/redirects";

type GoogleCredentialResponse = {
  credential?: string;
};

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: Record<string, string | number>
          ) => void;
        };
      };
    };
  }
}

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const analytics = useAnalytics();
  const loginMutation = useLogin();
  const googleLoginMutation = useGoogleLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isGoogleScriptReady, setIsGoogleScriptReady] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);
  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const handleGoogleCredential = useCallback(
    (response: GoogleCredentialResponse) => {
      if (!response.credential) {
        setGoogleError("Token Google tidak valid. Silakan coba lagi.");
        return;
      }
      setGoogleError(null);
      googleLoginMutation.mutate(
        { idToken: response.credential },
        {
          onSuccess: (data) => {
            analytics.track("login", { email: data.user?.email ?? "unknown", method: "google" });
            showToast("Berhasil masuk dengan Google.");
            router.push(getDashboardPathByRole(data.user?.role ?? null));
          },
          onError: () => {
            setGoogleError("Login Google gagal. Silakan coba lagi.");
            showToast("Login Google gagal. Silakan coba lagi.", "error");
          },
        }
      );
    },
    [analytics, googleLoginMutation, router, showToast]
  );

  useEffect(() => {
    if (!isGoogleScriptReady || !googleClientId || !googleButtonRef.current) return;
    const googleAccounts = window.google?.accounts?.id;
    if (!googleAccounts) return;

    googleAccounts.initialize({
      client_id: googleClientId,
      callback: handleGoogleCredential,
    });
    googleButtonRef.current.innerHTML = "";
    googleAccounts.renderButton(googleButtonRef.current, {
      theme: "outline",
      size: "large",
      width: "320",
      text: "continue_with",
      shape: "pill",
    });
  }, [googleClientId, handleGoogleCredential, isGoogleScriptReady]);

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
        <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={() => setIsGoogleScriptReady(true)} />
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
          {googleClientId ? (
            <div className="flex justify-center">
              <div ref={googleButtonRef} />
            </div>
          ) : (
            <p className="text-center text-xs text-amber-700">Google login belum tersedia. Set NEXT_PUBLIC_GOOGLE_CLIENT_ID.</p>
          )}
          {googleError ? <p className="text-center text-sm text-red-600">{googleError}</p> : null}
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
