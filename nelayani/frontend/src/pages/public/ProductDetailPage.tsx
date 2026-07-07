import { useState } from "react";
import { ShoppingCart, Package, Clock, MapPin, Anchor, Star, CheckCircle, Minus, Plus } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { useCartContext } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext";
import { useAppContext } from "../../context/AppContext";
import { BackButton } from "../../components/common/BackButton";
import { FISHERMEN } from "../../data";
import { freshnessStyle, rp } from "../../utils";
import { Page } from "../../types";

export function ProductDetailPage() {
  const { navigate, selectedProduct, setSelectedFisherman, productBackPage } = useNavigationContext();
  const { addToCart } = useCartContext();
  const { isGuest } = useAuthContext();
  const { openLoginModal } = useAppContext();
  const [qty, setQty] = useState(1);

  const product = selectedProduct;
  if (!product) {
    return (
      <div className="pt-20 text-center">
        <button onClick={() => navigate("products")} className="text-primary font-semibold">← Kembali ke produk</button>
      </div>
    );
  }

  const fisherman = FISHERMEN.find(f => f.id === product.fishermanId)!;

  const backLabel: Partial<Record<Page, string>> = {
    home: "Beranda", products: "Tangkapan Hari Ini",
    "fisherman-profile": "Profil Nelayan",
    "f-today-catch": "Tangkapan Saya"
  };

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <BackButton onClick={() => navigate(productBackPage)} label={backLabel[productBackPage] ?? "Kembali"} />

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Image column */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl overflow-hidden bg-secondary aspect-square shadow-lg sticky top-24">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Detail column */}
          <div className="lg:col-span-3 space-y-5">
            {/* Badges + title */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${freshnessStyle(product.freshness)}`}>{product.freshness}</span>
                <span className="text-sm bg-secondary text-primary font-medium px-3 py-1.5 rounded-full">{product.category}</span>
              </div>
              <h1 className="text-4xl font-extrabold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-primary">{rp(product.price)}</span>
                <span className="text-muted-foreground">/ kg</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Package className="w-4 h-4 text-accent" />, label: "Stok Tersedia", val: `${product.weight} kg` },
                { icon: <Clock className="w-4 h-4 text-accent" />, label: "Estimasi Tiba", val: product.arrival },
                { icon: <MapPin className="w-4 h-4 text-accent" />, label: "Lokasi Tangkap", val: product.location },
                { icon: <Anchor className="w-4 h-4 text-accent" />, label: "Waktu Tangkap", val: product.caught },
              ].map(i => (
                <div key={i.label} className="bg-muted rounded-2xl p-4 flex items-center gap-3">
                  {i.icon}
                  <div><p className="text-xs text-muted-foreground">{i.label}</p><p className="text-sm font-bold">{i.val}</p></div>
                </div>
              ))}
            </div>

            {/* Quantity + CTA */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-3 bg-muted rounded-2xl p-1">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-9 h-9 rounded-xl bg-card flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-sm">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold">{qty} kg</span>
                  <button onClick={() => setQty(qty + 1)}
                    className="w-9 h-9 rounded-xl bg-card flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-sm">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-lg font-extrabold text-foreground">{rp(product.price * qty)}</span>
              </div>
              <button
                onClick={() => {
                  if (isGuest) { openLoginModal(); return; }
                  addToCart(product);
                  navigate("cart");
                }}
                className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary/90 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
              >
                <ShoppingCart className="w-5 h-5" />
                {isGuest ? "Login untuk Pre-Order" : `Pre-Order Sekarang — ${rp(product.price * qty)}`}
              </button>
              {isGuest && (
                <p className="text-center text-xs text-muted-foreground mt-2">
                  <button onClick={() => openLoginModal()} className="text-primary font-semibold hover:underline">Masuk</button>
                  {" "}atau{" "}
                  <button onClick={() => navigate("register")} className="text-primary font-semibold hover:underline">daftar gratis</button>
                  {" "}untuk memesan
                </p>
              )}
            </div>

            {/* Fisherman card */}
            {fisherman && (
              <div className="bg-card rounded-3xl border border-border p-5 flex items-center gap-4">
                <img src={fisherman.avatar} alt={fisherman.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold">{fisherman.name}</p>
                    {fisherman.verified && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{fisherman.location} · {fisherman.experience}th pengalaman</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-semibold">{fisherman.rating}</span>
                    <span className="text-xs text-muted-foreground">({fisherman.reviewCount} ulasan)</span>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedFisherman(fisherman); navigate("fisherman-profile"); }}
                  className="flex-shrink-0 text-sm font-semibold text-primary border border-primary/30 rounded-xl px-4 py-2 hover:bg-primary/5"
                >
                  Profil
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
