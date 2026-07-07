import { useEffect, useRef, useState } from "react";
import { Search, Star, MapPin, CheckCircle, User } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { BackButton } from "../../components/common/BackButton";
import { PRODUCTS } from "../../data";
import { FishermanService } from "../../services/fisherman.service";
import { Fisherman } from "../../types";

export function FishermenListPage() {
  const {
    navigate, setSelectedFisherman,
    fishermanSearch, setFishermanSearch,
    fishermanSort, setFishermanSort,
    fishermanListScroll, setFishermanListScroll,
  } = useNavigationContext();

  const containerRef = useRef<HTMLDivElement>(null);
  
  const [fishermenList, setFishermenList] = useState<Fisherman[]>([]);
  const [loading, setLoading] = useState(true);

  // Mengambil daftar nelayan dari Backend
  useEffect(() => {
    FishermanService.getAll().then(data => {
      setFishermenList(data);
      setLoading(false);
      
      // Kembalikan posisi scroll
      if (fishermanListScroll > 0) {
        requestAnimationFrame(() => window.scrollTo({ top: fishermanListScroll, behavior: "instant" as ScrollBehavior }));
      }
    });
  }, [fishermanListScroll]);

  const handleSelect = (f: Fisherman) => {
    setFishermanListScroll(window.scrollY);
    setSelectedFisherman(f);
    navigate("fisherman-profile");
  };

  const filtered = fishermenList
    .filter(f => {
      const q = fishermanSearch.toLowerCase();
      const matchSearch = !q || f.name.toLowerCase().includes(q) || f.location.toLowerCase().includes(q);
      return matchSearch;
    })
    .sort((a, b) => {
      if (fishermanSort === "rating") return b.rating - a.rating;
      if (fishermanSort === "experience") return b.experience - a.experience;
      if (fishermanSort === "catches") return b.catches - a.catches;
      return b.reviewCount - a.reviewCount;
    });

  return (
    <div className="pt-16 min-h-screen bg-background" ref={containerRef}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B1F3A] to-[#0077B6] py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackButton onClick={() => navigate("home")} label="Beranda" />
          <h1 className="text-4xl font-extrabold text-white mb-2">Nelayan Kami</h1>
          <p className="text-white/70">Temui nelayan terverifikasi di balik setiap tangkapan segar Nelayani</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + sort bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={fishermanSearch} onChange={e => setFishermanSearch(e.target.value)}
              placeholder="Cari nama nelayan atau lokasi…"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <select
            value={fishermanSort} onChange={e => setFishermanSort(e.target.value)}
            className="px-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
          >
            <option value="popular">Terpopuler</option>
            <option value="rating">Rating Tertinggi</option>
            <option value="experience">Pengalaman Terlama</option>
            <option value="catches">Tangkapan Terbanyak</option>
          </select>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground text-sm">
            {filtered.length} nelayan ditemukan
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Semua aktif hari ini
          </div>
        </div>

        {/* Cards grid */}
        {loading ? (
          <div className="py-24 text-center text-muted-foreground">Memuat daftar nelayan...</div>
        ) : filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(f => (
              <div key={f.id} className="bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                onClick={() => handleSelect(f)}>
                {/* Mini cover */}
                <div className="h-28 bg-gradient-to-br from-[#0077B6] to-[#023E8A] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: "url(https://images.unsplash.com/photo-1566622246721-600a52b49b33?w=400&h=112&fit=crop&auto=format)" }} />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-amber-900" /> {f.rating}
                  </div>
                </div>
                <div className="px-5 pb-5">
                  {/* Avatar overlapping cover */}
                  <div className="-mt-9 mb-3 flex items-end justify-between">
                    <div className="relative">
                      <img src={f.avatar} alt={f.name} className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-md" />
                      {f.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                      {f.reviewCount} ulasan
                    </span>
                  </div>

                  <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">{f.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" /> {f.location}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-muted rounded-xl p-2.5 text-center">
                      <p className="text-sm font-extrabold text-foreground">{f.experience}y</p>
                      <p className="text-xs text-muted-foreground">Pengalaman</p>
                    </div>
                    <div className="bg-muted rounded-xl p-2.5 text-center">
                      <p className="text-sm font-extrabold text-foreground">{f.catches.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Tangkapan</p>
                    </div>
                    <div className="bg-muted rounded-xl p-2.5 text-center">
                      <p className="text-sm font-extrabold text-foreground">{PRODUCTS.filter(p => p.fishermanId === f.id).length}</p>
                      <p className="text-xs text-muted-foreground">Listing</p>
                    </div>
                  </div>

                  <button
                    onClick={e => { e.stopPropagation(); handleSelect(f); }}
                    className="w-full text-sm font-bold text-white bg-primary rounded-xl py-2.5 hover:bg-primary/90 transition-colors group-hover:shadow-md"
                  >
                    Lihat Profil Lengkap
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
            <p className="text-muted-foreground">Tidak ada nelayan yang sesuai dengan pencarian Anda.</p>
            <button onClick={() => setFishermanSearch("")} className="mt-3 text-primary font-semibold text-sm hover:underline">
              Hapus pencarian
            </button>
          </div>
        )}
      </div>
    </div>
  );
}