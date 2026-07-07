import { Fisherman, FishermanReview } from "../types";

export const FISHERMEN: Fisherman[] = [
  {
    id: 1, name: "Ahmad Rasyid", rating: 4.9, location: "Banda Aceh",
    experience: 15, catches: 1240, verified: true,
    avatar: "https://images.unsplash.com/photo-1541064828014-503911d13103?w=200&h=200&fit=crop&auto=format",
    bio: "Nelayan generasi ketiga dari Banda Aceh. Ahli dalam penangkapan tuna laut dalam dan salmon dengan awak kapal enam orang. Berkomitmen pada praktik penangkapan ikan berkelanjutan dan pelestarian ekosistem laut untuk generasi mendatang.",
    boat: "Kapal Biru Laut", specialties: ["Tuna", "Kerapu", "Sotong"],
    fishingArea: "Perairan Aceh Utara & Selat Malaka (5°N–6°N, 95°E–96°E)",
    phone: "+62 811 9876 5432", email: "ahmad.rasyid@nelayan.id",
    reviewCount: 248, joinDate: "Maret 2022",
    certifications: ["Sertifikat Nelayan MSC", "PNBP Terverifikasi", "Good Handling Practice"]
  },
  {
    id: 2, name: "Baharuddin", rating: 4.8, location: "Sabang Island",
    experience: 22, catches: 2105, verified: true,
    avatar: "https://images.unsplash.com/photo-1516011362164-3095a82b0af9?w=200&h=200&fit=crop&auto=format",
    bio: "Nelayan veteran yang berbasis di Pulau Sabang (Weh Island). Spesialis ikan karang dan cumi-cumi. Secara konsisten mendapatkan nilai kesegaran tertinggi di Nelayani berkat teknik penanganan ikan yang cermat.",
    boat: "Nelayan Sabang", specialties: ["Kakap Merah", "Tongkol", "Kerang Hijau"],
    fishingArea: "Kepulauan Sabang & Andaman (5°N–6°N, 94°E–95°E)",
    phone: "+62 813 5678 9012", email: "baharuddin@nelayan.id",
    reviewCount: 312, joinDate: "Januari 2021",
    certifications: ["Sertifikat Nelayan MSC", "Cold Chain Certified", "PNBP Terverifikasi"]
  },
  {
    id: 3, name: "Musliadi", rating: 4.7, location: "Simeulue Island",
    experience: 8, catches: 680, verified: true,
    avatar: "https://images.unsplash.com/photo-1662962913155-9e6548038a43?w=200&h=200&fit=crop&auto=format",
    bio: "Nelayan muda berbakat dari Pulau Simeulue. Penyelam dan spesialis perangkap untuk lobster dan udang, memadukan metode tradisional dengan pelacakan GPS modern untuk hasil tangkapan terbaik.",
    boat: "Ombak Simeulue", specialties: ["Udang Windu", "Udang Vaname", "Kerang Dara"],
    fishingArea: "Perairan Barat Aceh & Simeulue (2°N–3°N, 95°E–96°E)",
    phone: "+62 812 3456 7890", email: "musliadi@nelayan.id",
    reviewCount: 156, joinDate: "Juli 2023",
    certifications: ["PNBP Terverifikasi", "Sustainable Fishing Pledge"]
  }
];

export const FISHERMAN_REVIEWS: Record<number, FishermanReview[]> = {
  1: [
    { id: 1, fishermanId: 1, reviewer: "Chef Marco Santoso", role: "Head Chef — La Mer Restaurant", rating: 5, initials: "MS",
      text: "Ahmad adalah mitra terbaik kami. Salmon-nya selalu segar, pengiriman tepat waktu, dan komunikasinya sangat profesional. Sudah 2 tahun berlangganan dan tidak pernah kecewa.", date: "Jun 2026" },
    { id: 2, fishermanId: 1, reviewer: "Ibu Rahmawati", role: "Owner — Warung Seafood Aceh", rating: 5, initials: "IR",
      text: "Sudah 2 tahun pesan dari Ahmad. Kualitasnya konsisten, ikan selalu segar, dan dia jujur soal stok yang ada. Grouper-nya selalu jadi favorit pelanggan saya.", date: "Mei 2026" },
    { id: 3, fishermanId: 1, reviewer: "David Chen", role: "F&B Director — Grand Banda Hotel", rating: 5, initials: "DC",
      text: "Tuna dan grouper dari Ahmad adalah yang terbaik yang pernah kami terima untuk hotel bintang lima kami. Kapal yang bersih dan metode penangkapan yang bertanggung jawab.", date: "Mei 2026" },
  ],
  2: [
    { id: 4, fishermanId: 2, reviewer: "Pak Sulaiman", role: "Pemilik Restoran Sabang Bay", rating: 5, initials: "PS",
      text: "Baharuddin paling konsisten dalam hal kesegaran. Nilainya selalu Ultra Fresh. Red snapper-nya adalah favorit tamu restoran kami — tekstur dagingnya sempurna.", date: "Jun 2026" },
    { id: 5, fishermanId: 2, reviewer: "Chef Yuni", role: "Executive Chef — Sabang Resort", rating: 5, initials: "CY",
      text: "Cumi-cumi dan sea bass dari Baharuddin luar biasa. Selalu bersih, fresh, dan dikemas dengan baik. Sangat membantu operasional dapur kami setiap hari.", date: "Jun 2026" },
    { id: 6, fishermanId: 2, reviewer: "Budi Santoso", role: "Pembeli Reguler", rating: 4, initials: "BS",
      text: "Sangat puas dengan kualitasnya. Baharuddin selalu responsif dan menginformasikan jika ada perubahan jadwal atau stok. Komunikasi yang sangat baik.", date: "Apr 2026" },
  ],
  3: [
    { id: 7, fishermanId: 3, reviewer: "Pak Arman", role: "Pengusaha Seafood — Simeulue", rating: 5, initials: "PA",
      text: "Lobster dari Musliadi adalah yang terbaik di pulau ini. Dia tahu betul cara merawat hasil tangkapan agar tetap segar sampai ke tangan pembeli.", date: "Jun 2026" },
    { id: 8, fishermanId: 3, reviewer: "Chef Rizki", role: "Private Chef — Villa Aceh", rating: 5, initials: "CR",
      text: "Tiger prawns yang dikirim Musliadi selalu dalam kondisi sempurna. Ukurannya besar-besar dan rasanya manis alami. Klien saya selalu puas.", date: "Mei 2026" },
    { id: 9, fishermanId: 3, reviewer: "Ibu Kartini", role: "Pelanggan Setia", rating: 5, initials: "IK",
      text: "Sudah 1 tahun berlangganan. Musliadi muda tapi sangat bertanggung jawab dan profesional. Harga wajar, kualitas premium, pengiriman cepat.", date: "Apr 2026" },
  ]
};
