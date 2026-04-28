import { DonorProfileData, OrphanageProfileData, VolunteerProfileData } from "./profile-types";

export const donorProfileMock: Omit<DonorProfileData, "userName"> = {
  welcomeMessage: "Kontribusimu membantu panti bergerak dari bantuan sesaat menuju kemandirian jangka panjang.",
  ctas: [
    { label: "Jelajahi Campaign", href: "/campaigns" },
    { label: "Lihat Dampak Saya", href: "/impact" },
  ],
  stats: [
    { label: "Total Kontribusi", value: "Rp 8.450.000", helper: "Akumulasi dukungan sejak bergabung" },
    { label: "Campaign Didukung", value: "12", helper: "Program produktif dan pendidikan" },
    { label: "Update Dampak", value: "9", helper: "Laporan terbaru yang belum dibaca" },
  ],
  contributionHistory: [
    { title: "Dukungan Mesin Jahit Produktif", date: "12 Apr 2026", amount: "Rp 500.000", status: "Berhasil" },
    { title: "Program Kelas Kewirausahaan", date: "03 Apr 2026", amount: "Rp 300.000", status: "Berhasil" },
  ],
  recommendations: [
    { title: "Pelatihan Baking untuk Remaja Panti", href: "/campaigns", tag: "Skill Development" },
    { title: "Peralatan Sablon untuk Unit Usaha Panti", href: "/campaigns", tag: "Produktif" },
  ],
};

export const orphanageProfileMock: Omit<OrphanageProfileData, "managerName" | "verificationStatus"> = {
  welcomeMessage: "Kelola profil panti, campaign, dan produk agar operasional panti semakin mandiri.",
  ctas: [
    { label: "Buat Campaign", href: "/campaigns" },
    { label: "Kelola Produk", href: "/marketplace" },
  ],
  orphanageName: "Panti Harapan Mandiri",
  location: "Jakarta Timur",
  stats: [
    { label: "Campaign Aktif", value: "2", helper: "Sedang menerima dukungan" },
    { label: "Total Dana Terkumpul", value: "Rp 19.600.000", helper: "Akumulasi dari campaign aktif" },
    { label: "Progress Campaign", value: "54%", helper: "Rata-rata pencapaian target" },
  ],
  campaignSummary: [
    { name: "Unit Produksi Roti Panti", progress: "68%", raised: "Rp 12.400.000" },
    { name: "Pelatihan Menjahit Batch 2", progress: "41%", raised: "Rp 7.200.000" },
  ],
  productSummary: [
    { name: "Brownies Kukus", status: "Aktif" },
    { name: "Tas Kanvas Handmade", status: "Draft" },
  ],
};

export const volunteerProfileMock: Omit<VolunteerProfileData, "userName"> = {
  welcomeMessage: "Pantau aktivitas relawanmu dan temukan program yang sesuai dengan minat kontribusimu.",
  ctas: [
    { label: "Cari Program", href: "/orphanages" },
    { label: "Lihat Aktivitas Saya", href: "/impact" },
  ],
  focusArea: "Mentoring & Edukasi",
  stats: [
    { label: "Program Diikuti", value: "6", helper: "Sejak bergabung di Pantiku" },
    { label: "Tugas Selesai", value: "14", helper: "Aktivitas mentoring dan pendampingan" },
    { label: "Aktivitas Mendatang", value: "2", helper: "Agenda relawan minggu ini" },
  ],
  upcomingActivities: [
    { title: "Mentoring Literasi Digital", date: "30 Apr 2026", location: "Panti Harapan Mandiri" },
    { title: "Sesi Persiapan Karier Remaja", date: "04 Mei 2026", location: "Online" },
  ],
  opportunities: [
    { title: "Relawan Kelas Public Speaking", href: "/orphanages", type: "Mentoring" },
    { title: "Pendamping Program Kewirausahaan", href: "/orphanages", type: "Program" },
  ],
};
