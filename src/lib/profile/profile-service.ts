import { AppUser } from "@/lib/api/auth";
import { getDonorProfileData, getOrphanageProfileData, getVolunteerProfileData } from "./profile-adapter";
import { DonorProfileData, OrphanageProfileData, VolunteerProfileData } from "./profile-types";
import type { ContributionRecord } from "@/features/contributions/store/contribution-store";
import type { ImpactUpdate } from "@/features/impact/store/impact-update-store";

/**
 * Profile service layer (API-ready).
 * Untuk sekarang mengembalikan mock+adapter agar tidak ada backend changes,
 * namun signature & struktur dibuat seolah akan memanggil API nanti.
 */
export async function fetchDonorProfile(
  user?: AppUser | null,
  contributions: ContributionRecord[] = [],
  impactUpdates: ImpactUpdate[] = []
): Promise<DonorProfileData> {
  // TODO: GET /api/v1/profile/donor
  // Gunakan typed client (axios) dan unwrap ApiEnvelope sesuai kontrak backend.
  return getDonorProfileData(user, contributions, impactUpdates);
}

export async function fetchOrphanageProfile(user?: AppUser | null): Promise<OrphanageProfileData> {
  // TODO: GET /api/v1/profile/orphanage
  return getOrphanageProfileData(user);
}

export async function fetchVolunteerProfile(user?: AppUser | null): Promise<VolunteerProfileData> {
  // TODO: GET /api/v1/profile/volunteer
  return getVolunteerProfileData(user);
}

