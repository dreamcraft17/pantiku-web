import { AppUser } from "@/lib/api/auth";
import { donorProfileMock, orphanageProfileMock, volunteerProfileMock } from "./profile-mock-data";
import { DonorProfileData, OrphanageProfileData, VolunteerProfileData } from "./profile-types";

function resolveUserName(user: AppUser | null | undefined) {
  return user?.fullName?.trim() || "Sahabat Pantiku";
}

export function getDonorProfileData(user: AppUser | null | undefined): DonorProfileData {
  return {
    ...donorProfileMock,
    userName: resolveUserName(user),
  };
}

export function getOrphanageProfileData(user: AppUser | null | undefined): OrphanageProfileData {
  return {
    ...orphanageProfileMock,
    managerName: resolveUserName(user),
    verificationStatus: user?.orphanageVerificationStatus ?? "PENDING",
  };
}

export function getVolunteerProfileData(user: AppUser | null | undefined): VolunteerProfileData {
  return {
    ...volunteerProfileMock,
    userName: resolveUserName(user),
  };
}
