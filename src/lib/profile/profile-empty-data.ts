import { DonorProfileData, OrphanageProfileData, VolunteerProfileData } from "./profile-types";

export const donorProfileEmpty: Omit<DonorProfileData, "userName"> = {
  isDemoData: false,
  welcomeMessage: "Data kontribusi personal akan muncul setelah kamu mulai berdonasi atau mendukung campaign.",
  ctas: [
    { label: "Jelajahi Campaign", href: "/campaigns" },
    { label: "Lihat Dampak Saya", href: "/impact" },
  ],
  stats: [
    { label: "Total Kontribusi", value: "Rp 0", helper: "Belum ada kontribusi tercatat" },
    { label: "Campaign Didukung", value: "0", helper: "Belum ada campaign yang didukung" },
    { label: "Update Dampak", value: "0", helper: "Data akan muncul setelah kamu mulai berkontribusi" },
  ],
  contributionHistory: [],
  recommendations: [],
};

export const orphanageProfileEmpty: Omit<OrphanageProfileData, "managerName" | "verificationStatus"> = {
  isDemoData: false,
  welcomeMessage: "Kelola profil panti, campaign, dan produk. Data akan terisi saat aktivitas panti berjalan.",
  ctas: [
    { label: "Buat Campaign", href: "/campaigns" },
    { label: "Kelola Produk", href: "/marketplace" },
  ],
  orphanageName: "Panti Kamu",
  location: "Lokasi belum diatur",
  stats: [
    { label: "Campaign Aktif", value: "0", helper: "Belum ada campaign aktif" },
    { label: "Total Dana Terkumpul", value: "Rp 0", helper: "Belum ada dana tercatat" },
    { label: "Progress Campaign", value: "0%", helper: "Data akan muncul setelah campaign berjalan" },
  ],
  campaignSummary: [],
  productSummary: [],
};

export const volunteerProfileEmpty: Omit<VolunteerProfileData, "userName"> = {
  isDemoData: false,
  welcomeMessage: "Data aktivitas relawan akan muncul setelah kamu mulai mengikuti program.",
  ctas: [
    { label: "Cari Program", href: "/orphanages" },
    { label: "Lihat Aktivitas Saya", href: "/impact" },
  ],
  focusArea: "Belum ditentukan",
  stats: [
    { label: "Program Diikuti", value: "0", helper: "Belum ada program yang diikuti" },
    { label: "Tugas Selesai", value: "0", helper: "Belum ada tugas selesai" },
    { label: "Aktivitas Mendatang", value: "0", helper: "Belum ada agenda mendatang" },
  ],
  upcomingActivities: [],
  opportunities: [],
};
