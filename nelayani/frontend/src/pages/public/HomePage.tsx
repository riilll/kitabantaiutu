import { Fish, Anchor, ArrowRight, CheckCircle, Zap, Shield, Leaf, Instagram, Twitter, Facebook } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { useCartContext } from "../../context/CartContext";
import { CatchCard } from "../../components/product/CatchCard";
import { FishermanCard } from "../../components/fisherman/FishermanCard";
import { PRODUCTS, FISHERMEN } from "../../data";

export function HomePage() {
  const { navigate, openProductDetail, setSelectedFisherman } = useNavigationContext();
  const { addToCart } = useCartContext();

  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#071428]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1566622246721-600a52b49b33?w=1920&h=1080&fit=crop&auto=format)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071428]/95 via-[#071428]/80 to-[#071428]/40" />
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 fill-background">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm text-white/90 font-medium">Live Catch — Perairan Aceh</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Dari Laut<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-[#90E0EF]">ke Meja Makan</span>
              </h1>
              <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-lg">
                Beli seafood segar langsung dari nelayan dengan informasi tangkapan real-time dan keterlacakan penuh — dari laut hingga pintu Anda.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <button onClick={() => navigate("products")}
                  className="flex items-center gap-2 bg-[#00B4D8] hover:bg-[#0077B6] text-white font-bold px-7 py-3.5 rounded-2xl transition-all hover:scale-105 shadow-lg shadow-[#00B4D8]/30">
                  <Fish className="w-5 h-5" /> Jelajahi Tangkapan
                </button>
                <button onClick={() => navigate("register")}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-2xl border border-white/30 transition-all">
                  <Anchor className="w-5 h-5" /> Jadi Mitra Nelayan
                </button>
              </div>
              <div className="flex flex-wrap gap-8">
                {[["1.200+", "Mitra Nelayan"], ["50+", "Tangkapan/Hari"], ["< 6 Jam", "Laut ke Pintu"]].map(([n, l]) => (
                  <div key={l}><p className="text-2xl font-extrabold text-white">{n}</p><p className="text-sm text-white/60">{l}</p></div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <img src="https://images.unsplash.com/photo-1628000048296-d8e66f62a81a?w=620&h=480&fit=crop&auto=format" alt="Nelayan di laut Aceh" className="w-full h-[480px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071428]/60 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center"><CheckCircle className="w-5 h-5 text-emerald-600" /></div>
                <div><p className="text-xs text-muted-foreground">Tangkapan Terbaru</p><p className="text-sm font-bold">Tiger Prawns — 15kg</p></div>
                <div className="text-right ml-2"><p className="text-xs text-muted-foreground">Tiba pukul</p><p className="text-sm font-bold text-emerald-600">07:45 WIB</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TODAY'S CATCH */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Live Updates</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Tangkapan Hari Ini</h2>
              <p className="text-muted-foreground mt-2">Segar dari laut — diperbarui setiap beberapa jam</p>
            </div>
            <button onClick={() => navigate("products")} className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Lihat semua <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.slice(0, 6).map(p => (
              <CatchCard key={p.id} p={p}
                onDetail={() => openProductDetail(p, "home")}
                onAdd={() => addToCart(p)} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY MARINEFRESH */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Keunggulan Kami</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Kenapa Nelayani?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="w-7 h-7 text-[#00B4D8]" />, bg: "bg-[#E0F9FF]", title: "Update Tangkapan Real-Time", desc: "Setiap tangkapan dicatat segera saat jaring diangkat. Lacak berat, spesies, dan koordinat GPS secara langsung." },
              { icon: <Shield className="w-7 h-7 text-[#0077B6]" />, bg: "bg-[#EBF5FF]", title: "Keterlacakan Penuh", desc: "Scan QR code untuk menelusuri seafood Anda hingga ke nelayan, kapal, waktu tangkap, dan lokasi persisnya." },
              { icon: <Leaf className="w-7 h-7 text-emerald-600" />, bg: "bg-emerald-50", title: "Langsung dari Nelayan", desc: "Kami menghilangkan perantara dan mendukung praktik penangkapan ikan berkelanjutan. Harga lebih baik untuk semua." }
            ].map(f => (
              <div key={f.title} className="p-8 rounded-3xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mb-6`}>{f.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FISHERMEN */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Mitra Kami</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Nelayan Unggulan</h2>
            </div>
            <button onClick={() => navigate("fishermen-list")} className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Lihat semua nelayan <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {FISHERMEN.map(f => (
              <FishermanCard key={f.id} f={f} onClick={() => { setSelectedFisherman(f); navigate("fisherman-profile"); }} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0077B6] to-[#023E8A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1660278988532-d55143363abb?w=1920&h=400&fit=crop&auto=format)", backgroundSize: "cover" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Siap Menikmati Seafood Terbaik?</h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">Bergabung dengan 10.000+ pelanggan dan 1.200 nelayan di marketplace seafood terpercaya Indonesia.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate("products")}
              className="flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 shadow-xl">
              <Fish className="w-5 h-5" /> Pesan Sekarang
            </button>
            <button onClick={() => navigate("register")}
              className="flex items-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all">
              <Anchor className="w-5 h-5" /> Daftar sebagai Nelayan
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#071428] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#00B4D8] rounded-lg flex items-center justify-center"><Anchor className="w-4 h-4 text-white" /></div>
                <span className="text-xl font-bold text-white">Nela<span className="text-[#00B4D8]">yani</span></span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-5">Menghubungkan nelayan dan pencinta seafood di seluruh kepulauan Aceh.</p>
              <div className="flex gap-3">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <div key={i} className="w-9 h-9 bg-white/10 hover:bg-[#00B4D8] rounded-xl flex items-center justify-center cursor-pointer transition-colors"><Icon className="w-4 h-4 text-white" /></div>
                ))}
              </div>
            </div>
            {[
              { title: "Marketplace", links: ["Tangkapan Hari Ini", "Semua Produk", "Profil Nelayan", "Keberlanjutan"] },
              { title: "Perusahaan", links: ["Tentang Kami", "Cara Kerja", "Karir", "Blog"] },
              { title: "Kontak", links: ["support@nelayani.id", "+62 651 123 4567", "Banda Aceh, Indonesia", "Sen–Sab 06:00–20:00"] }
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-white font-bold mb-5">{col.title}</h4>
                <ul className="space-y-3">{col.links.map(l => <li key={l}><span className="text-white/50 hover:text-white text-sm cursor-pointer transition-colors">{l}</span></li>)}</ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© 2026 Nelayani Platform. Hak cipta dilindungi.</p>
            <div className="flex items-center gap-2"><Leaf className="w-4 h-4 text-emerald-500" /><p className="text-white/40 text-sm">Berkomitmen pada praktik perikanan berkelanjutan</p></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
