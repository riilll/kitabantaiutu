import { useState, useRef } from "react";
import { ArrowLeft, Image as ImageIcon, Plus, CheckCircle, Fish } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { apiPost } from "../../services/api";

export function NewCatchPage() {
  const { navigate } = useNavigationContext();
  const userName = localStorage.getItem("activeUserName") || "Ahmad Rasyid";

  const [formData, setFormData] = useState({
    name: "",
    category: "Ikan",
    freshness: "Ultra Fresh",
    price: "",
    weight: "",
    image: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Kategori dan Kesegaran
  const categories = [
    { id: "Ikan", emoji: "🐟" }, { id: "Udang", emoji: "🦐" },
    { id: "Kerang", emoji: "🦪" }, { id: "Cumi-cumi", emoji: "🦑" }, { id: "Lainnya", emoji: "🌊" }
  ];

  const freshnessLevels = [
    { id: "Ultra Fresh", label: "Ultra Segar", desc: "< 2 jam dari laut", color: "text-emerald-500", bg: "bg-emerald-500" },
    { id: "Very Fresh", label: "Sangat Segar", desc: "2-6 jam dari laut", color: "text-teal-500", bg: "bg-teal-500" },
    { id: "Fresh", label: "Segar", desc: "6-12 jam dari laut", color: "text-blue-500", bg: "bg-blue-500" },
    { id: "Frozen", label: "Beku", desc: "Diproses & dibekukan", color: "text-slate-500", bg: "bg-slate-500" }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async () => {
    if (!formData.name || !formData.price || !formData.weight || !formData.image) {
      alert("Mohon lengkapi Nama Ikan, Harga, Stok, dan Foto!");
      return;
    }

    setIsSubmitting(true);
    try {
      // Mengubah Harga dan Stok menjadi Angka (Number)
      const parsedWeight = parseInt(formData.weight.replace(/\D/g, ''));
      const parsedPrice = parseInt(formData.price.replace(/\D/g, ''));

      if (isNaN(parsedWeight) || isNaN(parsedPrice)) {
        alert("Peringatan: Harga dan Stok harus berupa angka!");
        setIsSubmitting(false);
        return;
      }

      const payload = {
        name: formData.name,
        category: formData.category,
        freshness: formData.freshness,
        price: parsedPrice,   
        weight: parsedWeight, 
        image: formData.image,
        fisherman: userName,
        location: localStorage.getItem("activeUserPort") || "Banda Aceh",
        rating: 0,
        reviews: 0
      };

      await apiPost('/products', payload);
      navigate("f-today-catch"); 
    } catch (error) {
      console.error(error);
      alert("Gagal mempublikasikan. Pastikan server backend Anda menyala.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateProgress = () => {
    let count = 0;
    if (formData.name) count += 20;
    if (formData.price) count += 20;
    if (formData.weight) count += 20;
    if (formData.image) count += 40;
    return count;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header Halaman */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("f-dashboard")} className="w-10 h-10 bg-card border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">Tambah Tangkapan Baru</h1>
            <p className="text-muted-foreground text-sm">Isi detail tangkapan Anda untuk dipasarkan</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-border font-bold text-muted-foreground hover:bg-muted transition-colors">
            Simpan Draft
          </button>
          <button onClick={handlePublish} disabled={isSubmitting} className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center">
            {isSubmitting ? "Memproses..." : "Publikasikan"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
        {/* Kolom Form Kiri */}
        <div className="space-y-6">
          {/* Foto Produk */}
          <div className="bg-card rounded-3xl border border-border p-8 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4">Foto Tangkapan <span className="text-red-500">*</span></h3>
            <div className="flex flex-wrap gap-4">
              {formData.image ? (
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-border">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">Utama</div>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground bg-muted/50">
                  <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-xs font-semibold">Belum ada foto</span>
                </div>
              )}
              
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
              
              <button onClick={() => fileInputRef.current?.click()} className="w-32 h-32 rounded-2xl border-2 border-dashed border-primary/50 text-primary flex flex-col items-center justify-center hover:bg-primary/5 transition-colors cursor-pointer">
                <Plus className="w-6 h-6 mb-1" />
                <span className="text-xs font-bold">Tambah Foto</span>
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Format JPG, PNG, WEBP. Maks 5MB. Foto pertama jadi foto utama.</p>
          </div>

          {/* Informasi Ikan */}
          <div className="bg-card rounded-3xl border border-border p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-[#00B4D8]/10 rounded-xl flex items-center justify-center">
                <Fish className="w-4 h-4 text-[#00B4D8]" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Informasi Ikan</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Nama Ikan <span className="text-red-500">*</span></label>
                <input 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Contoh: Ikan Tongkol"
                  className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Kategori <span className="text-red-500">*</span></label>
                <div className="flex flex-wrap gap-3">
                  {categories.map(c => (
                    <button key={c.id} onClick={() => setFormData({...formData, category: c.id})}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                        formData.category === c.id ? "border-primary bg-primary/10 text-primary shadow-sm" : "border-border text-muted-foreground hover:border-primary/50"
                      }`}>
                      <span>{c.emoji}</span> {c.id}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Kondisi Kesegaran <span className="text-red-500">*</span></label>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {freshnessLevels.map(f => (
                    <button key={f.id} onClick={() => setFormData({...formData, freshness: f.id})}
                      className={`flex flex-col text-left p-4 rounded-2xl border transition-all ${
                        formData.freshness === f.id ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary" : "border-border hover:border-primary/50"
                      }`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className={`w-2.5 h-2.5 rounded-full ${f.bg}`} />
                        <span className="text-sm font-bold text-foreground">{f.label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground leading-relaxed">{f.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Harga per kg (Rp) <span className="text-red-500">*</span></label>
                  <input 
                    type="text"
                    value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                    placeholder="Contoh: 45000"
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Stok Tersedia (kg) <span className="text-red-500">*</span></label>
                  <input 
                    type="text"
                    value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})}
                    placeholder="Contoh: 15"
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono font-medium"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Kolom Progress Kanan */}
        <div className="bg-[#0A4A7F] text-white rounded-3xl p-6 shadow-xl sticky top-[100px]">
          <p className="text-xs font-bold text-white/70 tracking-wider mb-2 uppercase">Kelengkapan Form</p>
          <div className="text-4xl font-extrabold mb-4">{calculateProgress()}%</div>
          <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden mb-6">
            <div className="bg-white h-full rounded-full transition-all duration-500" style={{ width: `${calculateProgress()}%` }} />
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-2.5 text-sm font-medium">
              <CheckCircle className={`w-4 h-4 ${formData.name ? "text-emerald-400" : "text-white/30"}`} /> Nama & Kategori
            </li>
            <li className="flex items-center gap-2.5 text-sm font-medium">
              <CheckCircle className={`w-4 h-4 ${formData.price && formData.weight ? "text-emerald-400" : "text-white/30"}`} /> Harga & Stok
            </li>
            <li className="flex items-center gap-2.5 text-sm font-medium">
              <CheckCircle className={`w-4 h-4 ${formData.image ? "text-emerald-400" : "text-white/30"}`} /> Upload Foto Utama
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}