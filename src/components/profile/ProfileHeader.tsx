import Link from "next/link";
import { AppRole } from "@/lib/auth/permissions";

type HeaderAction = {
  label: string;
  href: string;
};

type Props = {
  name: string;
  email: string;
  role: AppRole;
  isAuthenticated: boolean;
  mainAction?: HeaderAction;
  onLogout?: () => void;
};

const roleMeta: Record<Exclude<AppRole, null>, { label: string; className: string }> = {
  DONOR: { label: "Donatur", className: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  ORPHANAGE_MANAGER: { label: "Pengelola Panti", className: "bg-sky-100 text-sky-800 border-sky-200" },
  VOLUNTEER: { label: "Relawan", className: "bg-violet-100 text-violet-800 border-violet-200" },
  ADMIN: { label: "Admin", className: "bg-slate-100 text-slate-800 border-slate-200" },
};

function getRoleBadge(role: AppRole) {
  if (!role) {
    return <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Role belum terdeteksi</span>;
  }
  const meta = roleMeta[role];
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${meta.className}`}>{meta.label}</span>;
}

export function ProfileHeader({ name, email, role, isAuthenticated, mainAction, onLogout }: Props) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profil Kamu di Pantiku</h1>
          <p className="mt-2 text-sm text-slate-600">
            {name} · {email}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {getRoleBadge(role)}
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                isAuthenticated ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"
              }`}
            >
              {isAuthenticated ? "Status: Masuk" : "Status: Belum masuk"}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {mainAction ? (
            <Link
              href={mainAction.href}
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
            >
              {mainAction.label}
            </Link>
          ) : null}
          {onLogout ? (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
