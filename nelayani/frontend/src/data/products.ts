import { Product } from "../types";

export const PRODUCTS: Product[] = [
  {
    id: 1, name: "Kakap Merah", weight: 40, price: 85000, arrival: "3h",
    location: "Perairan Sabang", freshness: "Ultra Fresh",
    fisherman: "Baharuddin", fishermanId: 2, category: "Ikan",
    image: "https://images.unsplash.com/photo-1713804708016-e1f61ea2c0ca?w=400&h=280&fit=crop&auto=format",
    description: "Kakap merah segar dari terumbu karang bersih perairan Sabang. Daging putih padat dengan rasa lembut — cocok untuk bakar, goreng, atau pepes.",
    depth: "10–25m", method: "Pancing ulur", caught: "05:15 WIB"
  },
  {
    id: 2, name: "Tuna Sirip Kuning", weight: 65, price: 65000, arrival: "5h",
    location: "Selat Malaka", freshness: "Fresh",
    fisherman: "Ahmad Rasyid", fishermanId: 1, category: "Ikan",
    image: "https://images.unsplash.com/photo-1778439800806-fabd83046cbc?w=400&h=280&fit=crop&auto=format",
    description: "Tuna sirip kuning dari kedalaman Selat Malaka. Didinginkan di atas kapal dalam menit setelah ditangkap. Cocok untuk sashimi, steak, dan olahan asap.",
    depth: "80–250m", method: "Rawai (Longline)", caught: "04:00 WIB"
  },
  {
    id: 3, name: "Ikan Tongkol", weight: 55, price: 38000, arrival: "2h",
    location: "Teluk Pidie", freshness: "Very Fresh",
    fisherman: "Baharuddin", fishermanId: 2, category: "Ikan",
    image: "https://images.unsplash.com/photo-1577105106699-5c230ed0bd70?w=400&h=280&fit=crop&auto=format",
    description: "Tongkol segar dari hasil tangkapan pagi hari di Teluk Pidie. Rasa gurih khas, sangat populer untuk balado tongkol dan pindang.",
    depth: "20–50m", method: "Pukat cincin", caught: "06:00 WIB"
  },
  {
    id: 4, name: "Ikan Cakalang", weight: 70, price: 42000, arrival: "4h",
    location: "Perairan Aceh Utara", freshness: "Very Fresh",
    fisherman: "Musliadi", fishermanId: 3, category: "Ikan",
    image: "https://images.unsplash.com/photo-1778439800463-3691caa978b0?w=400&h=280&fit=crop&auto=format",
    description: "Cakalang segar ukuran besar dari perairan Aceh Utara. Daging merah padat dan kaya protein — ideal untuk cakalang fufu dan pengolahan asap.",
    depth: "30–80m", method: "Huhate (Pole & Line)", caught: "07:00 WIB"
  },
  {
    id: 5, name: "Ikan Kerapu", weight: 22, price: 90000, arrival: "3.5h",
    location: "Pesisir Aceh Besar", freshness: "Very Fresh",
    fisherman: "Ahmad Rasyid", fishermanId: 1, category: "Ikan",
    image: "https://images.unsplash.com/photo-1772155720422-69ad71a1708a?w=400&h=280&fit=crop&auto=format",
    description: "Kerapu pilihan dari karang Aceh Besar. Daging putih tebal dengan tekstur kenyal — primadona masakan Aceh dan hidangan restoran.",
    depth: "15–40m", method: "Pancing ulur", caught: "06:30 WIB"
  },
  {
    id: 6, name: "Udang Vaname", weight: 25, price: 95000, arrival: "1.5h",
    location: "Pelabuhan Banda Aceh", freshness: "Ultra Fresh",
    fisherman: "Musliadi", fishermanId: 3, category: "Udang",
    image: "https://images.unsplash.com/photo-1504309250229-4f08315f3b5c?w=400&h=280&fit=crop&auto=format",
    description: "Udang vaname segar dari tambak bersertifikat di pesisir Banda Aceh. Ukuran seragam, kulit mulus, sangat cocok untuk udang bakar dan tumis.",
    depth: "0–5m", method: "Jaring tarik", caught: "07:45 WIB"
  },
  {
    id: 7, name: "Udang Windu", weight: 12, price: 150000, arrival: "2h",
    location: "Perairan Simeulue", freshness: "Ultra Fresh",
    fisherman: "Musliadi", fishermanId: 3, category: "Udang",
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&h=280&fit=crop&auto=format",
    description: "Udang windu jumbo dari perairan bersih Simeulue. Rasa manis alami dan daging padat — kelas premium untuk restoran seafood dan hotel berbintang.",
    depth: "5–15m", method: "Perangkap", caught: "06:00 WIB"
  },
  {
    id: 8, name: "Udang Putih", weight: 30, price: 75000, arrival: "2.5h",
    location: "Perairan Aceh Utara", freshness: "Very Fresh",
    fisherman: "Baharuddin", fishermanId: 2, category: "Udang",
    image: "https://images.unsplash.com/photo-1674066621842-8c830e392618?w=400&h=280&fit=crop&auto=format",
    description: "Udang putih segar hasil tangkapan pagi dari perairan Aceh Utara. Serbaguna dan ekonomis — cocok untuk berbagai olahan masakan harian.",
    depth: "5–20m", method: "Jaring insang", caught: "05:30 WIB"
  },
  {
    id: 9, name: "Kerang Hijau", weight: 50, price: 28000, arrival: "2h",
    location: "Teluk Banda Aceh", freshness: "Ultra Fresh",
    fisherman: "Baharuddin", fishermanId: 2, category: "Kerang",
    image: "https://images.unsplash.com/photo-1739785937122-ebfcf7fd1d25?w=400&h=280&fit=crop&auto=format",
    description: "Kerang hijau segar dari budidaya tali di Teluk Banda Aceh. Dipanen pagi hari, dibersihkan langsung di lokasi. Sempurna untuk tumis kerang saus tiram.",
    depth: "1–5m", method: "Budidaya tali", caught: "07:00 WIB"
  },
  {
    id: 10, name: "Kerang Dara", weight: 35, price: 38000, arrival: "3h",
    location: "Teluk Pidie", freshness: "Very Fresh",
    fisherman: "Musliadi", fishermanId: 3, category: "Kerang",
    image: "https://images.unsplash.com/photo-1573999388457-ff750cc4a875?w=400&h=280&fit=crop&auto=format",
    description: "Kerang dara berukuran sedang dari dasar berlumpur Teluk Pidie. Rasa segar dengan kadar protein tinggi — favorit untuk masakan kerang rebus dan saus pedas.",
    depth: "2–8m", method: "Penggarukan (Dredging)", caught: "06:30 WIB"
  },
  {
    id: 11, name: "Cumi-Cumi Segar", weight: 18, price: 75000, arrival: "2h",
    location: "Perairan Aceh Utara", freshness: "Ultra Fresh",
    fisherman: "Baharuddin", fishermanId: 2, category: "Cumi-cumi",
    image: "https://images.unsplash.com/photo-1762508338570-bfbbac03bec4?w=400&h=280&fit=crop&auto=format",
    description: "Cumi-cumi utuh segar dari penangkapan malam di Perairan Aceh Utara. Lunak, segar tanpa pengawet — cocok untuk cumi bakar, cumi saus hitam, dan tumis.",
    depth: "5–30m", method: "Jig (Jigging)", caught: "02:00 WIB"
  },
  {
    id: 12, name: "Sotong (Cuttlefish)", weight: 15, price: 68000, arrival: "4h",
    location: "Perairan Sabang", freshness: "Very Fresh",
    fisherman: "Ahmad Rasyid", fishermanId: 1, category: "Cumi-cumi",
    image: "https://images.unsplash.com/photo-1547108509-6cac880a4d82?w=400&h=280&fit=crop&auto=format",
    description: "Sotong segar berukuran sedang dari perairan Sabang. Daging lebih tebal dari cumi biasa, cocok untuk sotong goreng tepung, sambal sotong, dan tumis bawang.",
    depth: "10–40m", method: "Bubu / Jaring insang", caught: "05:45 WIB"
  }
];

export const FISH_OPTIONS: string[] = [
  "Kakap Merah", "Kakap Putih", "Tuna Sirip Kuning", "Ikan Tongkol",
  "Ikan Cakalang", "Ikan Kerapu", "Ikan Tenggiri", "Ikan Bawal",
  "Ikan Bandeng", "Ikan Kembung", "Ikan Layang", "Ikan Marlin",
  "Udang Vaname", "Udang Windu", "Udang Putih", "Udang Jerbung",
  "Kerang Hijau", "Kerang Dara", "Kerang Tiram", "Kerang Simping",
  "Cumi-Cumi Segar", "Sotong (Cuttlefish)", "Gurita (Octopus)"
];
