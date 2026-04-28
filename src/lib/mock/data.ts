export type Campaign = {
  id: string;
  title: string;
  orphanageName: string;
  image: string;
  location: string;
  category: "Pendidikan" | "Keterampilan" | "Kuliner" | "Teknologi";
  summary: string;
  story: string;
  itemsNeeded: string[];
  impactExplanation: string;
  anonymizedImpactStories: string[];
  collected: number;
  goal: number;
};

export type Product = {
  id: string;
  name: string;
  orphanageName: string;
  category: "Fashion" | "Kuliner" | "Kerajinan" | "Alat Tulis";
  shortStory: string;
  story: string;
  orphanageProfile: string;
  stock: number;
  images: string[];
  price: number;
};

export type Orphanage = {
  id: string;
  name: string;
  location: string;
  description: string;
  verificationStatus?: "PENDING" | "VERIFIED" | "REJECTED";
};

export type ImpactSummary = {
  total_children_supported: number;
  total_orphanages: number;
  total_campaigns: number;
  total_products_sold: number;
  total_donations_amount: number;
  growth: {
    total_children_supported: number;
    total_orphanages: number;
    total_campaigns: number;
    total_products_sold: number;
    total_donations_amount: number;
  };
};

export type ImpactStory = {
  title: string;
  description: string;
  orphanageName: string;
  impact: string;
};

export const mockCampaigns: Campaign[] = [
  {
    id: "c1",
    title: "Sewing Machine for Productive Skills",
    orphanageName: "Panti Jakarta Utara",
    image: "https://images.unsplash.com/photo-1595341595379-cf0f0f6a907d?auto=format&fit=crop&w=1200&q=80",
    location: "Jakarta Utara",
    category: "Keterampilan",
    summary: "Pengadaan mesin jahit untuk kelas keterampilan produktif.",
    story:
      "Program ini memperluas kelas keterampilan menjahit agar remaja panti memiliki pengalaman praktik yang relevan untuk membangun kemandirian ekonomi.",
    itemsNeeded: ["3 unit mesin jahit", "Kain praktik", "Peralatan pola dasar", "Modul pelatihan instruktur"],
    impactExplanation:
      "Dengan dukungan alat dan pelatihan, peserta program dapat menghasilkan produk bernilai jual dan memperkuat rasa percaya diri.",
    anonymizedImpactStories: [
      "Peserta A (16) kini rutin memproduksi tote bag dari kelas jahit.",
      "Peserta B (15) berhasil membuat pola pakaian sederhana secara mandiri.",
    ],
    collected: 14500000,
    goal: 35000000,
  },
  {
    id: "c2",
    title: "Baking Oven and Culinary Training",
    orphanageName: "Panti Jakarta Utara",
    image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80",
    location: "Jakarta Utara",
    category: "Kuliner",
    summary: "Dapur pelatihan kuliner untuk program ekonomi panti.",
    story:
      "Melalui pelatihan kuliner terstruktur, panti membangun unit produksi makanan ringan sebagai bagian dari program pemberdayaan remaja.",
    itemsNeeded: ["2 unit oven", "Mixer kapasitas menengah", "Bahan baku pelatihan", "Peralatan keamanan dapur"],
    impactExplanation:
      "Program kuliner membuka jalur keterampilan praktis yang dapat digunakan untuk usaha mikro berbasis komunitas.",
    anonymizedImpactStories: [
      "Peserta C (17) memimpin tim produksi kudapan mingguan.",
      "Peserta D (16) mulai menguasai standar higienitas dapur produksi.",
    ],
    collected: 18000000,
    goal: 42000000,
  },
  {
    id: "c3",
    title: "Digital Literacy Program",
    orphanageName: "Panti Jakarta Timur",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    location: "Jakarta Timur",
    category: "Teknologi",
    summary: "Kelas literasi digital untuk kesiapan masa depan anak.",
    story:
      "Program literasi digital membantu peserta memahami penggunaan komputer, internet aman, dan keterampilan dasar produktivitas.",
    itemsNeeded: ["Laptop belajar bersama", "Akses internet edukatif", "Lisensi perangkat belajar", "Kelas mentor digital"],
    impactExplanation:
      "Literasi digital memperluas kesempatan belajar dan kesiapan peserta untuk dunia kerja modern.",
    anonymizedImpactStories: [
      "Peserta E (15) mampu menyusun dokumen presentasi untuk proyek kelas.",
      "Peserta F (14) memahami praktik keamanan data dasar saat online.",
    ],
    collected: 12000000,
    goal: 30000000,
  },
];

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Tote Bag Batik Jakarta",
    orphanageName: "Panti Jakarta Utara",
    category: "Fashion",
    shortStory: "Dirancang dari kelas jahit untuk melatih keterampilan produksi berstandar pasar.",
    story:
      "Produk ini dibuat melalui program keterampilan jahit berjenjang. Setiap tote bag menjadi sarana belajar desain, pola, dan quality control bagi peserta.",
    orphanageProfile: "Panti Jakarta Utara fokus pada pelatihan jahit dan kewirausahaan berbasis karya.",
    stock: 42,
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    ],
    price: 95000,
  },
  {
    id: "p2",
    name: "Apron Dapur Kain Kanvas",
    orphanageName: "Panti Jakarta Utara",
    category: "Fashion",
    shortStory: "Apron fungsional hasil praktik menjahit untuk kebutuhan rumahan dan UMKM.",
    story:
      "Apron ini diproduksi dalam sesi praktik keterampilan pembuatan produk utilitas. Peserta belajar mengelola bahan, pola, dan finishing.",
    orphanageProfile: "Panti Jakarta Utara mengembangkan unit karya tekstil untuk mendukung kemandirian ekonomi.",
    stock: 28,
    images: [
      "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556909212-d5b604d0f9f3?auto=format&fit=crop&w=900&q=80",
    ],
    price: 120000,
  },
  {
    id: "p3",
    name: "Notebook Daur Ulang A5",
    orphanageName: "Panti Jakarta Timur",
    category: "Alat Tulis",
    shortStory: "Notebook ramah lingkungan untuk proyek literasi kreatif dan produksi berkelanjutan.",
    story:
      "Notebook ini dibuat dari material daur ulang melalui program kerajinan dan literasi. Prosesnya melatih kreativitas sekaligus ketelitian produksi.",
    orphanageProfile: "Panti Jakarta Timur membina literasi digital dan kerajinan berorientasi pasar.",
    stock: 64,
    images: [
      "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
    ],
    price: 45000,
  },
  {
    id: "p4",
    name: "Set Kartu Ucapan Handmade",
    orphanageName: "Panti Jakarta Timur",
    category: "Kerajinan",
    shortStory: "Set kartu handmade dari workshop desain kreatif berbasis nilai lokal.",
    story:
      "Set kartu ini menjadi media praktik desain grafis sederhana dan kerajinan tangan. Setiap desain dikembangkan untuk melatih kreativitas dan storytelling visual.",
    orphanageProfile: "Panti Jakarta Timur mendorong karya kreatif bernilai ekonomi melalui pelatihan rutin.",
    stock: 71,
    images: [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=900&q=80",
    ],
    price: 40000,
  },
  {
    id: "p5",
    name: "Cookies Cokelat Kacang",
    orphanageName: "Panti Jakarta Utara",
    category: "Kuliner",
    shortStory: "Kudapan hasil unit pelatihan kuliner untuk penguatan keterampilan dapur.",
    story:
      "Produk cookies dibuat dalam sesi kuliner produktif. Peserta belajar resep standar, higienitas, dan pengemasan produk.",
    orphanageProfile: "Program kuliner panti menekankan keterampilan praktis dan kesiapan usaha mikro.",
    stock: 55,
    images: [
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=80",
    ],
    price: 70000,
  },
  {
    id: "p6",
    name: "Pouch Serbaguna Motif Etnik",
    orphanageName: "Panti Jakarta Timur",
    category: "Kerajinan",
    shortStory: "Pouch multifungsi dari program produksi kerajinan tekstil kreatif.",
    story:
      "Pouch ini dikembangkan sebagai produk harian bernilai guna tinggi. Peserta mempelajari pemilihan bahan, jahit detail, dan inspeksi kualitas.",
    orphanageProfile: "Panti Jakarta Timur menggabungkan kreativitas dan disiplin produksi dalam setiap karya.",
    stock: 33,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=900&q=80",
    ],
    price: 50000,
  },
];

export const mockOrphanages: Orphanage[] = [
  {
    id: "o1",
    name: "Panti Jakarta Utara",
    location: "Jakarta Utara",
    description: "Fokus pada keterampilan jahit dan kuliner produktif.",
  },
  {
    id: "o2",
    name: "Panti Jakarta Timur",
    location: "Jakarta Timur",
    description: "Fokus pada literasi digital dan kerajinan kreatif.",
  },
];

export const mockImpactSummary: ImpactSummary = {
  total_children_supported: 63,
  total_orphanages: 12,
  total_campaigns: 8,
  total_products_sold: 182,
  total_donations_amount: 45450000,
  growth: {
    total_children_supported: 8,
    total_orphanages: 5,
    total_campaigns: 11,
    total_products_sold: 14,
    total_donations_amount: 17,
  },
};

export const mockImpactStories: ImpactStory[] = [
  {
    title: "Dari Mesin Jahit ke Produk Siap Jual",
    description:
      "Pelatihan menjahit berkembang menjadi sesi produksi rutin. Peserta tidak hanya belajar teknik, tetapi juga disiplin proses dan kualitas karya.",
    orphanageName: "Panti Berdaya Jakarta Utara",
    impact: "5 anak belajar keterampilan menjahit",
  },
  {
    title: "Kelas Kuliner Menjadi Unit Produksi",
    description:
      "Dukungan alat pelatihan membuat kelas kuliner naik tingkat menjadi unit produksi mingguan yang terstruktur dan bernilai jual.",
    orphanageName: "Panti Tumbuh Jakarta Timur",
    impact: "8 anak terlibat dalam produksi dan pengemasan",
  },
  {
    title: "Literasi Digital untuk Masa Depan Kerja",
    description:
      "Peserta membangun kebiasaan belajar digital dan kolaborasi proyek, membuka peluang kesiapan kerja yang lebih percaya diri.",
    orphanageName: "Panti Mandiri Jakarta Selatan",
    impact: "6 anak menuntaskan kelas literasi digital dasar",
  },
];
