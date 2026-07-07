import { useState, useEffect, useRef } from "react";
import { Plus, Edit3, Trash2, X, Image as ImageIcon, CheckCircle } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { BackButton } from "../../components/common/BackButton";
import { ProductService } from "../../services/product.service";
import { freshnessStyle, rp } from "../../utils";
import { Product } from "../../types";

export function FListingsPage() {
  const { navigate } = useNavigationContext();
  const userName = localStorage.getItem("activeUserName") || "Ahmad Rasyid";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // --- STATE UNTUK MODAL EDIT ---
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    freshness: "",
    price: "",
    weight: "",
    image: ""
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Kategori & Kesegaran (Sama seperti di form tambah)
  const categories = [
    { id: "Ikan", emoji: "🐟" }, { id: "Udang", emoji: "🦐" },
    { id: "Kerang", emoji: "🦪" }, { id: "Cumi-cumi", emoji: "🦑" }, { id: "Lainnya", emoji: "🌊" }
  ];

  const freshnessLevels = [
    { id: "Ultra Fresh", label: "Ultra Segar", desc: "< 2 jam" },
    { id: "Very Fresh", label: "Sangat Segar", desc: "2-6 jam" },
    { id: "Fresh", label: "Segar", desc: "6-12 jam" },
    { id: "Frozen", label: "Beku", desc: "Dibekukan" }
  ];

  useEffect(() => {
    ProductService.getAll().then(data => {
      setProducts(data.filter(p => p.fisherman === userName));
      setLoading(false);
    });
  }, [userName]);

  // BUKA MODAL EDIT
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      category: product.category,
      freshness: product.freshness,
      price: product.price.toString(),
      weight: product.weight.toString(),
      image: product.image
    });
  };

  // HANDLE UPLOAD FOTO DI MODAL EDIT
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setEditForm({ ...editForm, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  // SIMPAN PERUBAHAN EDIT
  const handleUpdate = async () => {
    if (!editingProduct) return;

    if (!editForm.name || !editForm.price || !editForm.weight || !editForm.image) {
      alert("Mohon lengkapi semua data wajib!");
      return;
    }

    const parsedWeight = parseInt(editForm.weight.toString().replace(/\D/g, ''));
    const parsedPrice = parseInt(editForm.price.toString().replace(/\D/g, ''));

    if (isNaN(parsedWeight) || isNaN(parsedPrice)) {
      alert("Harga dan Stok harus berupa angka!");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: editForm.name,
        category: editForm.category,
        freshness: editForm.freshness,
        price: parsedPrice,
        weight: parsedWeight,
        image: editForm.image
      };

      const res = await fetch(`http://localhost:5000/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error("Gagal menyimpan");

      // Perbarui tampilan daftar secara instan
      setProducts(products.map(p => 
  p.id === editingProduct.id ? { ...p, ...payload } as Product : p
));
      
      // Tutup modal
      setEditingProduct(null);
    } catch (error) {
      alert("Gagal memperbarui produk. Pastikan backend menyala.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // FUNGSI HAPUS
  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus tangkapan ini?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'DELETE'
        });
        
        if (!res.ok) throw new Error("Gagal menghapus");
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        alert("Gagal menghapus produk. Pastikan backend menyala.");
      }
    }
  };

  return (
    <div className="p-8">
      <BackButton onClick={() => navigate("f-dashboard")} />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Daftar Produk Saya</h1>
          <p className="text-muted-foreground">Kelola listing tangkapan Anda</p>
        </div>
        <button onClick={() => navigate("f-new-catch")} className="flex items-center gap-2 bg-primary text-white font-bold px-5 py-3 rounded-2xl hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Tambah Tangkapan
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Memuat daftar produk...</div>
      ) : products.length === 0 ? (
        <div className="bg-card rounded-3xl border border-border p-16 text-center">
          <h3 className="text-lg font-bold text-foreground mb-2">Belum ada produk aktif</h3>
          <p className="text-muted-foreground mb-6 text-sm">Tambahkan tangkapan Anda sekarang.</p>
          <button onClick={() => navigate("f-new-catch")}
            className="bg-primary text-white font-bold px-6 py-3 rounded-2xl hover:bg-primary/90 transition-colors">
            Upload Produk Pertama
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map(p => (
            <div key={p.id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="h-40 bg-secondary overflow-hidden flex-shrink-0">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-foreground truncate mr-2">{p.name}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${freshnessStyle(p.freshness)}`}>{p.freshness}</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-muted-foreground">{rp(p.price)}/kg · {p.weight}kg tersisa</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live
                  </span>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button 
                    onClick={() => openEditModal(p)}
                    className="flex-1 text-xs font-bold text-primary border border-primary/30 rounded-xl py-2 hover:bg-primary/5 flex items-center justify-center gap-1 cursor-pointer transition-colors">
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    className="flex-1 text-xs font-bold text-red-500 border border-red-200 rounded-xl py-2 hover:bg-red-50 flex items-center justify-center gap-1 cursor-pointer transition-colors">
                    <Trash2 className="w-3 h-3" /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button onClick={() => navigate("f-new-catch")} className="rounded-2xl border-2 border-dashed border-border hover:border-primary/50 min-h-[280px] flex flex-col items-center justify-center gap-3 hover:bg-primary/5 transition-all cursor-pointer">
            <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="font-semibold text-muted-foreground text-sm">Tambah Tangkapan Baru</p>
          </button>
        </div>
      )}

      {/* --- MODAL EDIT PRODUK --- */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-card w-full max-w-2xl rounded-3xl border border-border shadow-2xl p-6 md:p-8 my-8 relative">
            <button 
              onClick={() => setEditingProduct(null)} 
              className="absolute top-6 right-6 w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h2 className="text-2xl font-extrabold text-foreground mb-6">Edit Tangkapan</h2>
            
            <div className="space-y-6">
              {/* Foto & Nama Ikan */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <label className="block text-sm font-bold text-foreground mb-2">Foto Utama</label>
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-border group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <img src={editForm.image} alt="Preview" className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ImageIcon className="w-6 h-6 text-white drop-shadow-md mb-1" />
                      <span className="text-xs font-bold text-white drop-shadow-md">Ganti Foto</span>
                    </div>
                  </div>
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">Nama Ikan</label>
                    <input 
                      value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">Harga/kg (Rp)</label>
                      <input 
                        value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">Stok (kg)</label>
                      <input 
                        value={editForm.weight} onChange={e => setEditForm({...editForm, weight: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Kategori</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(c => (
                    <button key={c.id} onClick={() => setEditForm({...editForm, category: c.id})}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-semibold transition-all ${
                        editForm.category === c.id ? "border-primary bg-primary/10 text-primary shadow-sm" : "border-border text-muted-foreground hover:border-primary/50"
                      }`}>
                      <span>{c.emoji}</span> {c.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kesegaran */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Kondisi Kesegaran</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {freshnessLevels.map(f => (
                    <button key={f.id} onClick={() => setEditForm({...editForm, freshness: f.id})}
                      className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                        editForm.freshness === f.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"
                      }`}>
                      <span className="text-sm font-bold text-foreground mb-0.5">{f.label}</span>
                      <span className="text-[10px] text-muted-foreground">{f.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
              <button onClick={() => setEditingProduct(null)} className="px-6 py-2.5 rounded-xl border border-border font-bold text-foreground hover:bg-muted transition-colors">
                Batal
              </button>
              <button onClick={handleUpdate} disabled={isSubmitting} className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50">
                {isSubmitting ? "Menyimpan..." : <><CheckCircle className="w-4 h-4"/> Simpan Perubahan</>}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}