import { AppRole } from "./permissions";

export function getDashboardPathByRole(role: AppRole): string {
  switch (role) {
    case "DONOR":
      return "/dashboard/donor";
    case "ORPHANAGE_MANAGER":
      return "/dashboard/panti";
    case "VOLUNTEER":
      return "/dashboard/relawan";
    case "ADMIN":
      return "/dashboard/admin";
    default:
      return "/profile";
  }
}

export function getRoleFromJwt(token: string | null): AppRole {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(payload));
    const role = decoded?.role;
    if (role === "ADMIN" || role === "ORPHANAGE_MANAGER" || role === "DONOR" || role === "VOLUNTEER") {
      return role;
    }
    return null;
  } catch {
    return null;
  }
}
