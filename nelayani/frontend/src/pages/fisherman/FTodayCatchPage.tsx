import { useState, useEffect } from "react";
import { Fish, Package, TrendingUp, Plus, Eye, Edit3, Trash2 } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { ProductService } from "../../services/product.service";
import { freshnessStyle, rp } from "../../utils";
import { Product } from "../../types";

export function FTodayCatchPage() {
  const { navigate, openProductDetail } = useNavigationContext();
  const userName = localStorage.getItem("activeUserName") || "Ahmad Rasyid";

  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductService.getAll().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  // HANYA tampilkan produk milik user yang sedang login
  const myProducts = products.filter(p => p.fisherman === userName && !deletedIds.includes(p.id));

  const statusBadge = (p: Product) => {
    if (p.weight === 0) return { label: "Habis", cls: "bg-red-100 text-red-700 border border-red-200" };
    if (p.weight <= 5) return { label: "Hampir Habis", cls: "bg-amber-100 text-amber-700 border border-amber-200" };
    return { label: "Tersedia", cls: "bg-emerald-100 text-emerald-700 border border-emerald-200" };
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Tangkapan Saya</h1>
          <p className="text-muted-foreground mt-1">Semua produk yang telah Anda unggah ke Nelayani</p>
        </div>
        <button onClick={() => navigate("f-new-catch")}
          className="flex items-center gap-2 bg-primary text-white font-bold px-5 py-3 rounded-2xl hover:bg-primary/90 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Tambah Tangkapan
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Produk", val: myProducts.length.toString(), icon: <Fish className="w-5 h-5 text-primary" />, bg: "bg-primary/10" },
          { label: "Stok Tersedia", val: `${myProducts.reduce((s, p) => s + p.weight, 0)} kg`, icon: <Package className="w-5 h-5 text-accent" />, bg: "bg-accent/10" },
          { label: "Total Nilai", val: rp(myProducts.reduce((s, p) => s + p.price * p.weight, 0)), icon: <TrendingUp className="w-5 h-5 text-emerald-600" />, bg: "bg-emerald-50" },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4 shadow-sm">
            <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>{s.icon}</div>
            <div>
              <p className="text-xl font-extrabold text-foreground">{s.val}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {loading ? (
         <div className="text-center py-20 text-muted-foreground">Memuat data tangkapan...</div>
      ) : myProducts.length === 0 ? (
        <div className="bg-card rounded-3xl border border-border p-16 text-center">
          <Fish className="w-14 h-14 text-muted-foreground mx-auto mb-4 opacity-30" />
          <h3 className="text-lg font-bold text-foreground mb-2">Belum ada tangkapan</h3>
          <p className="text-muted-foreground mb-6 text-sm">Upload tangkapan pertama Anda dan mulai berjualan di Nelayani.</p>
          <button onClick={() => navigate("f-new-catch")}
            className="bg-primary text-white font-bold px-6 py-3 rounded-2xl hover:bg-primary/90 transition-colors">
            Upload Tangkapan Pertama
          </button>
        </div>
      ) : (
        <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
          <div className="grid grid-cols-[80px_1fr_100px_130px_140px_120px_160px] gap-4 px-6 py-4 bg-muted/50 border-b border-border">
            {["Foto", "Produk", "Stok", "Harga/kg", "Tgl Upload", "Status", "Aksi"].map(h => (
              <p key={h} className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{h}</p>
            ))}
          </div>
          <div className="divide-y divide-border">
            {myProducts.map(p => {
              const badge = statusBadge(p);
              return (
                <div key={p.id}
                  className="grid grid-cols-[80px_1fr_100px_130px_140px_120px_160px] gap-4 px-6 py-4 items-center hover:bg-muted/20 transition-colors">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-foreground truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.category} · {p.location}</p>
                    <span className={`mt-1 inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${freshnessStyle(p.freshness)}`}>
                      {p.freshness}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{p.weight} kg</p>
                  <p className="text-sm font-bold text-primary">{rp(p.price)}</p>
                  <p className="text-xs text-muted-foreground">Baru saja</p>
                  <span className={`text-xs font-bold px-2.5 py-1.5 rounded-full ${badge.cls} inline-block`}>
                    {badge.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openProductDetail(p, "f-today-catch")}
                      className="flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-2.5 py-1.5 rounded-lg transition-colors"
                    >
                      <Eye className="w-3 h-3" /> Detail
                    </button>
                    <button
                      onClick={() => setDeletedIds(prev => [...prev, p.id])}
                      className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}