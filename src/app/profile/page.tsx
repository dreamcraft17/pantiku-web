"use client";

import { useEffect, useMemo, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { getMe } from "@/lib/api/auth";
import { getRoleFromJwt } from "@/lib/auth/redirects";
import { AppRole } from "@/lib/auth/permissions";
import { EmptyState } from "@/components/profile/EmptyState";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileLayout } from "@/components/profile/ProfileLayout";
import { DonorProfile } from "@/components/profile/donor/DonorProfile";
import { OrphanageProfile } from "@/components/profile/orphanage/OrphanageProfile";
import { VolunteerProfile } from "@/components/profile/volunteer/VolunteerProfile";
import { fetchDonorProfile, fetchOrphanageProfile, fetchVolunteerProfile } from "@/lib/profile/profile-service";
import { DonorProfileData, OrphanageProfileData, VolunteerProfileData } from "@/lib/profile/profile-types";

export default function ProfilePage() {
  const router = useRouter();
  const { signOut } = useClerk();
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  const user = useAuthStore((state) => state.user);
  const setRole = useAuthStore((state) => state.setRole);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const [resolving, setResolving] = useState(true);
  const [donorProfileData, setDonorProfileData] = useState<DonorProfileData | null>(null);
  const [orphanageProfileData, setOrphanageProfileData] = useState<OrphanageProfileData | null>(null);
  const [volunteerProfileData, setVolunteerProfileData] = useState<VolunteerProfileData | null>(null);

  useEffect(() => {
    const resolveProfile = async () => {
      if (!token) {
        setResolving(false);
        return;
      }

      let nextRole: AppRole = role;
      let nextUser = user;

      if (!nextRole) {
        const jwtRole = getRoleFromJwt(token);
        if (jwtRole) {
          nextRole = jwtRole;
          setRole(jwtRole);
        }
      }

      if (!nextUser) {
        const me = await getMe();
        if (me?.user) {
          nextUser = me.user;
          setUser(me.user);
          if (me.user.role) {
            nextRole = me.user.role;
            setRole(me.user.role);
          }
        }
      }

      if (nextRole === "DONOR") {
        setDonorProfileData(await fetchDonorProfile(nextUser));
      } else {
        setDonorProfileData(null);
      }

      if (nextRole === "ORPHANAGE_MANAGER") {
        setOrphanageProfileData(await fetchOrphanageProfile(nextUser));
      } else {
        setOrphanageProfileData(null);
      }

      if (nextRole === "VOLUNTEER") {
        setVolunteerProfileData(await fetchVolunteerProfile(nextUser));
      } else {
        setVolunteerProfileData(null);
      }

      setResolving(false);
    };

    void resolveProfile();
  }, [role, setRole, setUser, token, user]);

  const resolvedRole = useMemo<AppRole>(() => {
    if (role) return role;
    if (token) return getRoleFromJwt(token);
    return null;
  }, [role, token]);

  const profileName = user?.fullName?.trim() || "Sahabat Pantiku";
  const profileEmail = user?.email?.trim() || "email-belum-tersedia@pantiku.id";
  const mainAction = useMemo(() => {
    if (resolvedRole === "DONOR") return { label: "Jelajahi Campaign", href: "/campaigns" };
    if (resolvedRole === "ORPHANAGE_MANAGER") return { label: "Buat Campaign", href: "/campaigns" };
    if (resolvedRole === "VOLUNTEER") return { label: "Cari Program", href: "/orphanages" };
    return undefined;
  }, [resolvedRole]);

  const handleLogout = async () => {
    logout();
    try {
      await signOut();
    } catch {
      // Keep local logout successful.
    }
    router.push("/login");
  };

  if (resolving) {
    return (
      <ProfileLayout>
        <section className="rounded-2xl border border-emerald-100 bg-white p-6 text-sm text-slate-600 shadow-sm">Menyiapkan profil kamu...</section>
      </ProfileLayout>
    );
  }

  if (!token) {
    return (
      <ProfileLayout>
        <EmptyState
          title="Kamu belum masuk"
          description="Masuk dulu ke Pantiku untuk melihat profil, riwayat kontribusi, dan aktivitas kamu."
          actionLabel="Masuk Sekarang"
          actionHref="/login"
        />
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <ProfileHeader
        name={profileName}
        email={profileEmail}
        role={resolvedRole}
        isAuthenticated={Boolean(token)}
        mainAction={mainAction}
        onLogout={handleLogout}
      />

      {resolvedRole === "DONOR" && donorProfileData ? <DonorProfile data={donorProfileData} /> : null}
      {resolvedRole === "ORPHANAGE_MANAGER" && orphanageProfileData ? <OrphanageProfile data={orphanageProfileData} /> : null}
      {resolvedRole === "VOLUNTEER" && volunteerProfileData ? <VolunteerProfile data={volunteerProfileData} /> : null}
      {resolvedRole !== "DONOR" && resolvedRole !== "ORPHANAGE_MANAGER" && resolvedRole !== "VOLUNTEER" ? (
        <EmptyState
          title="Role profil belum dikenali"
          description="Kami belum bisa menentukan pengalaman profil yang tepat untuk akun ini. Silakan login ulang atau hubungi tim Pantiku."
          actionLabel="Kembali ke Dashboard"
          actionHref="/"
        />
      ) : null}
    </ProfileLayout>
  );
}
