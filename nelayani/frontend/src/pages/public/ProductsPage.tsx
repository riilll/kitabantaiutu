import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { useCartContext } from "../../context/CartContext";
import { BackButton } from "../../components/common/BackButton";
import { CatchCard } from "../../components/product/CatchCard";
import { PRODUCTS } from "../../data";

export function ProductsPage() {
  const { navigate, openProductDetail } = useNavigationContext();
  const { addToCart } = useCartContext();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Semua");
  const cats = ["Semua", "Ikan", "Udang", "Kerang", "Cumi-cumi"];
  const filtered = PRODUCTS.filter(p => (cat === "Semua" || p.category === cat) && p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="bg-gradient-to-r from-[#0B1F3A] to-[#0077B6] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackButton onClick={() => navigate("home")} label="Beranda" />
          <h1 className="text-4xl font-extrabold text-white mb-2">Tangkapan Hari Ini</h1>
          <p className="text-white/70">Langsung dari nelayan — diperbarui setiap beberapa jam</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari ikan, udang, lobster…"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${cat === c ? "bg-primary text-white" : "bg-card border border-border text-muted-foreground hover:border-primary/40"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map(p => (
            <CatchCard key={p.id} p={p}
              onDetail={() => openProductDetail(p, "products")}
              onAdd={() => addToCart(p)} />
          ))}
        </div>
      </div>
    </div>
  );
}
