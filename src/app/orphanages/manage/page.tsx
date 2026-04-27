"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { canManageOrphanage } from "@/lib/auth/permissions";

export default function OrphanageManagePage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  const allowed = canManageOrphanage(role);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }
    if (!allowed) {
      router.replace("/profile");
    }
  }, [token, allowed, router]);

  if (!token || !allowed) {
    return <section className="rounded-xl bg-white p-6">Memverifikasi akses...</section>;
  }

  return (
    <section className="rounded-xl bg-white p-6">
      <h1 className="text-2xl font-bold">Kelola Panti</h1>
      <p className="mt-2 text-slate-600">Halaman ini hanya untuk admin dan pengelola panti.</p>
    </section>
  );
}
