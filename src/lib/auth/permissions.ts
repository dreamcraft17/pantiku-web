export type AppRole = "ADMIN" | "ORPHANAGE_MANAGER" | "DONOR" | "VOLUNTEER" | null;

// User management is restricted to admin users.
export const canManageUsers = (role: AppRole) => role === "ADMIN";

// Orphanage operations are allowed for admin and orphanage manager.
export const canManageOrphanage = (role: AppRole) => role === "ADMIN" || role === "ORPHANAGE_MANAGER";

// Campaign creation follows orphanage management permission.
export const canCreateCampaign = (role: AppRole) => canManageOrphanage(role);

// Product creation follows orphanage management permission.
export const canCreateProduct = (role: AppRole) => canManageOrphanage(role);

// Donation actions are available for donor and admin.
export const canDonate = (role: AppRole) => role === "DONOR" || role === "ADMIN";

// Order creation is available for donor and admin.
export const canCreateOrder = (role: AppRole) => role === "DONOR" || role === "ADMIN";

// Admin dashboard is reserved for administrators.
export const canViewAdminDashboard = (role: AppRole) => role === "ADMIN";
