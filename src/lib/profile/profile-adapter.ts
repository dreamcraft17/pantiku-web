import { AppUser } from "@/lib/api/auth";
import { donorProfileDemo, orphanageProfileDemo, volunteerProfileDemo } from "./profile-demo-data";
import { donorProfileEmpty, orphanageProfileEmpty, volunteerProfileEmpty } from "./profile-empty-data";
import { DonorProfileData, OrphanageProfileData, VolunteerProfileData } from "./profile-types";

function resolveUserName(user: AppUser | null | undefined) {
  return user?.fullName?.trim() || "Sahabat Pantiku";
}

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export function getDonorProfileData(user: AppUser | null | undefined): DonorProfileData {
  const source = isDemoMode ? donorProfileDemo : donorProfileEmpty;
  return {
    ...source,
    userName: resolveUserName(user),
  };
}

export function getOrphanageProfileData(user: AppUser | null | undefined): OrphanageProfileData {
  const source = isDemoMode ? orphanageProfileDemo : orphanageProfileEmpty;
  return {
    ...source,
    managerName: resolveUserName(user),
    verificationStatus: user?.orphanageVerificationStatus ?? "PENDING",
  };
}

export function getVolunteerProfileData(user: AppUser | null | undefined): VolunteerProfileData {
  const source = isDemoMode ? volunteerProfileDemo : volunteerProfileEmpty;
  return {
    ...source,
    userName: resolveUserName(user),
  };
}
