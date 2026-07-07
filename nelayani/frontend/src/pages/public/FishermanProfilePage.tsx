import { useState, useEffect } from "react";
import { MapPin, Anchor, Award, Star, Fish, Package, CheckCircle, User, Navigation, Phone, Mail, ArrowLeft, Heart } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { useCartContext } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext";
import { useAppContext } from "../../context/AppContext";
import { CatchCard } from "../../components/product/CatchCard";
import { PRODUCTS, FISHERMAN_REVIEWS } from "../../data";
import { apiGet, apiPost, apiDelete } from "../../services/api"; // Import API

export function FishermanProfilePage() {
  const { navigate, selectedFisherman, openProductDetail } = useNavigationContext();
  const { addToCart } = useCartContext();
  const { role } = useAuthContext();
  const { openLoginModal } = useAppContext();
  
  const [activeTab, setActiveTab] = useState<"catches" | "reviews">("catches");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);

  const fisherman = selectedFisherman;
  const userEmail = localStorage.getItem("activeUserEmail") || "";

  // Mengambil status Follow dari Backend
  useEffect(() => {
    if (fisherman && userEmail) {
      const checkFollowStatus = async () => {
        try {
          const followedFishermen: number[] = await apiGet(`/follows/${userEmail}`);
          setIsFollowing(followedFishermen.includes(fisherman.id));
        } catch (error) {
          console.error("Gagal cek status follow:", error);
        }
      };
      checkFollowStatus();
    }
  }, [fisherman, userEmail]);

  if (!fisherman) {
    return (
      <div className="pt-20 text-center">
        <button onClick={() => navigate("fishermen-list")} className="text-primary font-semibold">← Daftar Nelayan</button>
      </div>
    );
  }

  const handleFollow = async () => {
    // Cegah pengunjung tanpa akun untuk melakukan follow
    if (role !== "buyer" || !userEmail) {
      openLoginModal();
      return;
    }

    setIsLoadingFollow(true);
    try {
      if (isFollowing) {
        // Tembak backend untuk Unfollow
        await apiDelete(`/follows/${userEmail}/${fisherman.id}`);
        setIsFollowing(false);
      } else {
        // Tembak backend untuk Follow
        await apiPost('/follows', { buyerEmail: userEmail, fishermanId: fisherman.id });
        setIsFollowing(true);
      }
    } catch (error) {
      alert("Gagal memproses. Pastikan backend menyala.");
    } finally {
      setIsLoadingFollow(false);
    }
  };

  const listings = PRODUCTS.filter(p => p.fishermanId === fisherman.id);
  const reviews = FISHERMAN_REVIEWS[fisherman.id] ?? [];

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="relative h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1660278988532-d55143363abb?w=1920&h=320&fit=crop&auto=format"
          alt="Ocean cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071428]/50 via-[#0B1F3A]/60 to-[#0B1F3A]/90" />
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("fishermen-list")}
            className="flex items-center gap-2 text-white/80 hover:text-white font-semibold text-sm transition-colors group"
          >
            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Kembali ke Daftar Nelayan
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-16 relative">
        <div className="bg-card rounded-3xl border border-border shadow-xl p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative flex-shrink-0">
              <img
                src={fisherman.avatar} alt={fisherman.name}
                className="w-28 h-28 rounded-3xl object-cover border-4 border-white shadow-xl"
              />
              {fisherman.verified && (
                <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center border-3 border-white shadow">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-3xl font-extrabold text-foreground">{fisherman.name}</h1>
                {fisherman.verified && (
                  <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
                    ✓ Terverifikasi
                  </span>
                )}

                {/* TOMBOL IKUTI TERSAMBUNG BACKEND */}
                <button 
                  onClick={handleFollow}
                  disabled={isLoadingFollow}
                  className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isLoadingFollow ? "opacity-50 cursor-not-allowed" : ""
                  } ${
                    isFollowing 
                      ? "bg-primary text-white border border-primary shadow-sm" 
                      : "bg-white text-primary border border-primary hover:bg-primary/5"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFollowing ? "fill-white" : ""}`} />
                  {isLoadingFollow ? "Memproses..." : isFollowing ? "Diikuti" : "Ikuti"}
                </button>

              </div>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-4">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-accent" />{fisherman.location}</span>
                <span className="flex items-center gap-1.5"><Anchor className="w-4 h-4 text-accent" />{fisherman.boat}</span>
                <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-accent" />Bergabung {fisherman.joinDate}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {fisherman.specialties.map(s => (
                  <span key={s} className="bg-secondary text-primary text-sm font-semibold px-3.5 py-1.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 text-center bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mt-4 sm:mt-0">
              <div className="flex items-center gap-1 justify-center mb-1">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="text-2xl font-extrabold text-amber-700">{fisherman.rating}</span>
              </div>
              <p className="text-xs text-amber-600">{fisherman.reviewCount} ulasan</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Tangkapan", val: fisherman.catches.toLocaleString(), icon: <Fish className="w-5 h-5 text-primary" />, bg: "bg-primary/10" },
            { label: "Tahun Pengalaman", val: `${fisherman.experience} tahun`, icon: <Award className="w-5 h-5 text-amber-500" />, bg: "bg-amber-50" },
            { label: "Rating Pelanggan", val: `${fisherman.rating} / 5.0`, icon: <Star className="w-5 h-5 text-amber-400 fill-amber-400" />, bg: "bg-amber-50" },
            { label: "Listing Aktif", val: `${listings.length} produk`, icon: <Package className="w-5 h-5 text-emerald-600" />, bg: "bg-emerald-50" },
          ].map(s => (
            <div key={s.label} className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4 shadow-sm">
              <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>{s.icon}</div>
              <div>
                <p className="text-lg font-extrabold text-foreground">{s.val}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-5">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-accent" /> Tentang
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{fisherman.bio}</p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-accent" /> Area Penangkapan
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{fisherman.fishingArea}</p>
              <div className="mt-3 rounded-xl overflow-hidden bg-[#0B1F3A] h-28 flex items-center justify-center">
                <svg viewBox="0 0 300 112" className="w-full h-full">
                  <defs>
                    <pattern id="miniGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00B4D8" strokeWidth="0.3" strokeOpacity="0.15" />
                    </pattern>
                  </defs>
                  <rect width="300" height="112" fill="#0B1F3A" />
                  <rect width="300" height="112" fill="url(#miniGrid)" />
                  <ellipse cx="150" cy="70" rx="120" ry="35" fill="#1A4070" stroke="#00B4D8" strokeWidth="0.8" strokeOpacity="0.5" />
                  <text x="150" y="76" fill="#90CAF9" fontSize="9" fontWeight="bold" textAnchor="middle" opacity="0.8">ACEH — {fisherman.location.toUpperCase()}</text>
                  <circle cx="150" cy="50" r="6" fill="#00B4D8">
                    <animate attributeName="r" from="4" to="10" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="fillOpacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="150" cy="50" r="4" fill="#00B4D8" stroke="white" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" /> Kontak
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">WhatsApp / Telepon</p>
                    <p className="text-sm font-semibold text-foreground">{fisherman.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-semibold text-foreground">{fisherman.email}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-2 space-y-5">
            <div className="flex gap-1 bg-muted rounded-xl p-1 w-fit">
              {([["catches", `Tangkapan (${listings.length})`], ["reviews", `Ulasan (${reviews.length})`]] as const).map(([t, l]) => (
                <button
                  key={t} onClick={() => setActiveTab(t)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === t ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {l}
                </button>
              ))}
            </div>

            {activeTab === "catches" ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {listings.map(p => (
                  <CatchCard
                    key={p.id} p={p}
                    onDetail={() => openProductDetail(p, "fisherman-profile")}
                    onAdd={() => addToCart(p)}
                  />
                ))}
                {listings.length === 0 && (
                  <div className="col-span-2 py-16 text-center bg-card rounded-2xl border border-border">
                    <Fish className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                    <p className="text-muted-foreground">Belum ada listing aktif saat ini.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-5xl font-extrabold text-foreground">{fisherman.rating}</p>
                    <div className="flex gap-0.5 justify-center mt-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= Math.floor(fisherman.rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`} />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{fisherman.reviewCount} ulasan</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5,4,3].map(star => {
                      const count = reviews.filter(r => r.rating >= star).length;
                      const pct = Math.round((count / Math.max(reviews.length, 1)) * 100);
                      return (
                        <div key={star} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0" />
                          <span className="w-2">{star}</span>
                          <div className="flex-1 bg-muted rounded-full h-1.5">
                            <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-6 text-right">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {reviews.map(r => (
                  <div key={r.id} className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-white">{r.initials}</span>
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm">{r.reviewer}</p>
                          <p className="text-xs text-muted-foreground">{r.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i <= r.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed italic">"{r.text}"</p>
                    <p className="text-xs text-muted-foreground mt-3">{r.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}