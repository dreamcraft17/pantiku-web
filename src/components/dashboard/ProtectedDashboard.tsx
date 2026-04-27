"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/lib/api/auth";
import { AppRole } from "@/lib/auth/permissions";
import { getRoleFromJwt } from "@/lib/auth/redirects";
import { useAuthStore } from "@/features/auth/store/auth-store";

type Props = {
  allowedRoles: AppRole[];
  children: ReactNode;
};

export function ProtectedDashboard({ allowedRoles, children }: Props) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  const setRole = useAuthStore((state) => state.setRole);
  const setUser = useAuthStore((state) => state.setUser);
  const [resolving, setResolving] = useState(true);

  const hasAllowedRole = useMemo(() => role !== null && allowedRoles.includes(role), [allowedRoles, role]);

  useEffect(() => {
    const resolve = async () => {
      if (!token) {
        router.replace("/login");
        return;
      }

      if (role) {
        setResolving(false);
        return;
      }

      const jwtRole = getRoleFromJwt(token);
      if (jwtRole) {
        setRole(jwtRole);
        setResolving(false);
        return;
      }

      const me = await getMe();
      if (me?.user?.role) {
        setRole(me.user.role);
        setUser(me.user);
      }
      setResolving(false);
    };

    void resolve();
  }, [role, router, setRole, setUser, token]);

  useEffect(() => {
    if (!resolving && role && !hasAllowedRole) {
      router.replace("/profile");
    }
  }, [hasAllowedRole, resolving, role, router]);

  if (resolving || !token || !hasAllowedRole) {
    return (
      <section className="mx-auto w-full max-w-7xl py-10">
        <div className="rounded-2xl border border-emerald-100 bg-white p-6 text-sm text-slate-600 shadow-sm">
          Menyiapkan dashboard kamu...
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
