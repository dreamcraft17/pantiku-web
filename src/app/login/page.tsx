"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLogin } from "@/features/auth/api/use-auth";
import { useToast } from "@/components/common/toast-provider";
import { useAnalytics } from "@/lib/analytics/use-analytics";
import { Button } from "@/components/ui/button";
import { getDashboardPathByRole } from "@/lib/auth/redirects";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const analytics = useAnalytics();
  const loginMutation = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

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
