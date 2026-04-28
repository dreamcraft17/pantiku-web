"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const canAccessOrphanageManage = canManageOrphanage(role);
  const dashboardPath = getDashboardPathByRole(role);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <PageContainer size="wide" className="relative flex items-center justify-between py-3">
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
        <div className="hidden items-center gap-2 md:flex">
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
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-800 md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navbar-menu"
          aria-label={isMobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-black transition-transform duration-200 ${isMobileMenuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 bg-black transition-opacity duration-200 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 bg-black transition-transform duration-200 ${isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
        {isMobileMenuOpen ? (
          <div
            id="mobile-navbar-menu"
            className="absolute left-4 right-4 top-full mt-2 space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-lg md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={`mobile-${link.href}`}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-emerald-700"
                >
                  {link.label}
                </Link>
              ))}
              {canAccessOrphanageManage ? (
                <Link
                  href="/orphanages/manage"
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-emerald-700"
                >
                  Kelola Panti
                </Link>
              ) : null}
            </nav>
            <div className="border-t border-slate-200 pt-3">
              {token ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/profile"
                    className="rounded-md border border-slate-200 px-4 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    Profile
                  </Link>
                  <Link
                    href={dashboardPath}
                    className="rounded-md border border-slate-200 px-4 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    className="rounded-md border border-slate-200 px-4 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-md bg-emerald-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-emerald-700"
                  >
                    Gabung Sekarang
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </PageContainer>
    </header>
  );
}
