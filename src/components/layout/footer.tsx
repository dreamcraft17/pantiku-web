import Link from "next/link";
import { Logo } from "../common/Logo";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-[#fffefb]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 text-sm text-slate-600 md:grid-cols-2 lg:grid-cols-4 md:px-6">
        <div>
          <div className="flex items-center gap-2">
            <Logo size="small" />
            <span className="text-base font-semibold text-emerald-700">Pantiku</span>
          </div>
          <p className="mt-3 font-medium text-slate-800">Anak Bertumbuh, Panti Mandiri.</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Pantiku membangun ekosistem digital untuk mendukung pemberdayaan panti dan masa depan anak.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Platform</p>
          <div className="mt-3 space-y-2">
            <Link href="/campaigns" className="block hover:text-emerald-700">Campaign</Link>
            <Link href="/marketplace" className="block hover:text-emerald-700">Produk Karya Panti</Link>
            <Link href="/impact" className="block hover:text-emerald-700">Lihat Dampak</Link>
            <Link href="/orphanages" className="block hover:text-emerald-700">Panti Berdaya</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Bergabung</p>
          <div className="mt-3 space-y-2">
            <Link href="/register" className="block hover:text-emerald-700">Donatur</Link>
            <Link href="/register" className="block hover:text-emerald-700">Pengelola Panti</Link>
            <Link href="/register" className="block hover:text-emerald-700">Relawan</Link>
            <Link href="/register" className="block hover:text-emerald-700">Mitra CSR</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Kontak</p>
          <div className="mt-3 space-y-2">
            <p>halo@pantiku.id</p>
            <p>Indonesia</p>
            <Link href="/login" className="inline-flex rounded-md border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 text-xs text-slate-500 md:px-6">
          © 2026 Pantiku. Semua hak dilindungi.
        </div>
      </div>
    </footer>
  );
}
