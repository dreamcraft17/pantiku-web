"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "../common/primary-button";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { canManageOrphanage } from "@/lib/auth/permissions";
import { Logo } from "../common/Logo";
import { getDashboardPathByRole } from "@/lib/auth/redirects";
import { PageContainer } from "./PageContainer";

const links = [
  { href: "/campaigns", label: "Campaign" },
  { href: "/marketplace", label: "Produk Karya Panti" },
  { href: "/impact", label: "Lihat Dampak" },
  { href: "/tentang-kami", label: "Tentang Kami" },
];

export function Navbar() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const canAccessOrphanageManage = canManageOrphanage(role);
  const dashboardPath = getDashboardPathByRole(role);

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <PageContainer size="wide" className="flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <Logo size="small" priority />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold text-emerald-700">Pantiku</span>
            <span className="hidden text-xs text-slate-500 sm:block">Membangun Kemandirian Panti</span>
          </div>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-700 hover:text-emerald-700">
              {link.label}
            </Link>
          ))}
          {canAccessOrphanageManage ? (
            <Link href="/orphanages/manage" className="text-sm font-medium text-slate-700 hover:text-emerald-700">
              Kelola Panti
            </Link>
          ) : null}
        </nav>
        <div className="flex items-center gap-2">
          {token ? (
            <>
              <Link
                href="/profile"
                className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Profile
              </Link>
              <PrimaryButton href={dashboardPath} label="Dashboard" variant="outline" />
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900">
                Masuk
              </Link>
              <PrimaryButton href="/register" label="Gabung Sekarang" />
            </>
          )}
        </div>
      </PageContainer>
    </header>
  );
}
