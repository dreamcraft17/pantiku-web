"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { PrimaryButton } from "@/components/common/primary-button";

export default function ProfilePage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  if (!token) {
    return <section className="rounded-xl bg-white p-6">Memuat profil...</section>;
  }

  return (
    <section className="rounded-xl bg-white p-6">
      <h1 className="text-2xl font-bold">Profil Pengguna</h1>
      <p className="mt-3 text-slate-600">
        Halaman ini untuk donatur dan nantinya juga menjadi titik masuk profil dasar pengelola panti.
      </p>
      <p className="mt-3 text-sm text-slate-700">Status autentikasi: {token ? "Masuk" : "Belum masuk (mock)"}</p>
      <div className="mt-6 flex gap-3">
        <PrimaryButton href="/login" label={token ? "Ganti Akun" : "Masuk Sekarang"} />
        <PrimaryButton
          label="Logout"
          variant="outline"
          onClick={() => {
            clearAuth();
            router.push("/login");
          }}
        />
      </div>
    </section>
  );
}
