import { useState } from "react";
import { Anchor, Shield, CheckCircle, Leaf, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { useAuthContext } from "../../context/AuthContext";

export function RoleSelectionPage() {
  const { navigate } = useNavigationContext();
  const { setRole } = useAuthContext();
  const [hovered, setHovered] = useState<string | null>(null);

  const roles = [
    {
      id: "fisherman",
      emoji: "🎣",
      title: "Nelayan",
      subtitle: "Portal Penjual",
      desc: "Jual hasil tangkapan, kelola stok, terima pesanan, dan pantau penghasilan secara real-time.",
      perks: ["Upload tangkapan langsung", "Kelola pesanan & stok", "Dasbor penjualan lengkap"],
      cta: "Lanjutkan sebagai Nelayan",
      cardBg: "from-[#0B1F3A] via-[#0F2747] to-[#023E8A]",
      ctaBg: "bg-[#00B4D8] hover:bg-[#009DC0]",
      ctaText: "text-white",
      glow: "shadow-[#00B4D8]/20",
      borderActive: "border-[#00B4D8]/60",
      perkColor: "text-[#00B4D8]",
      action: () => navigate("f-fisherman-login"),
    },
    {
      id: "buyer",
      emoji: "🛒",
      title: "Pembeli",
      subtitle: "Portal Pembeli",
      desc: "Temukan seafood segar, preorder langsung dari nelayan, dan lacak pengiriman Anda dengan mudah.",
      perks: ["Harga langsung dari nelayan", "Jaminan kesegaran penuh", "Lacak asal & pengiriman"],
      cta: "Lanjutkan sebagai Pembeli",
      cardBg: "from-[#0077B6] via-[#0093C8] to-[#00B4D8]",
      ctaBg: "bg-white hover:bg-white/90",
      ctaText: "text-[#0077B6]",
      glow: "shadow-[#0077B6]/25",
      borderActive: "border-white/50",
      perkColor: "text-white/80",
      action: () => navigate("buyer-login"),
    },
    {
      id: "guest",
      emoji: "👀",
      title: "Jelajahi",
      subtitle: "Tanpa Akun",
      desc: "Lihat tangkapan hari ini, jelajahi profil nelayan, dan temukan produk seafood segar tanpa mendaftar.",
      perks: ["Akses gratis selamanya", "Tidak perlu daftar", "Langsung coba sekarang"],
      cta: "Jelajahi Sekarang",
      cardBg: "from-white to-[#F0F8FF]",
      ctaBg: "bg-primary hover:bg-primary/90",
      ctaText: "text-white",
      glow: "shadow-primary/10",
      borderActive: "border-primary/40",
      perkColor: "text-primary",
      action: () => { setRole(null); navigate("home"); },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-y-auto"
      style={{ background: "linear-gradient(160deg, #071428 0%, #0B1F3A 40%, #083060 70%, #0A4A8A 100%)" }}>

      {/* Dot grid overlay */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(0,180,216,0.08) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Wave bottom */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none opacity-20">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-20 fill-[#00B4D8]">
          <path d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-16">

        {/* Logo */}
        <button onClick={() => navigate("home")} className="flex items-center gap-3 mb-10 group">
          <div className="w-12 h-12 bg-gradient-to-br from-[#00B4D8] to-[#0077B6] rounded-2xl flex items-center justify-center shadow-xl shadow-[#00B4D8]/30 group-hover:scale-105 transition-transform">
            <Anchor className="w-6 h-6 text-white" />
          </div>
          <span className="text-3xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Nela<span className="text-[#00B4D8]">yani</span>
          </span>
        </button>

        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 mb-5">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/80 font-medium">Platform Seafood Terpercaya Indonesia</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Selamat Datang di<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-[#90E0EF]">
              Nelayani
            </span>
          </h1>
          <p className="text-white/55 text-base max-w-md mx-auto">
            Pilih peran Anda untuk melanjutkan ke platform
          </p>
        </div>

        {/* Role cards */}
        <div className="grid sm:grid-cols-3 gap-5 w-full max-w-4xl">
          {roles.map(r => {
            const isHovered = hovered === r.id;
            const isGuest = r.id === "guest";
            return (
              <div
                key={r.id}
                onMouseEnter={() => setHovered(r.id)}
                onMouseLeave={() => setHovered(null)}
                className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-300 cursor-pointer flex flex-col ${
                  isHovered
                    ? `${r.borderActive} -translate-y-2 shadow-2xl ${r.glow}`
                    : isGuest
                      ? "border-white/20 shadow-lg"
                      : "border-white/10 shadow-lg"
                }`}
                onClick={r.action}
              >
                {/* Card gradient background */}
                <div className={`bg-gradient-to-br ${r.cardBg} p-7 flex-1 flex flex-col`}>

                  {/* Emoji + subtitle */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${
                      isGuest ? "bg-primary/10" : "bg-white/12"
                    } backdrop-blur-sm`}>
                      {r.emoji}
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      isGuest ? "bg-primary/10 text-primary" : "bg-white/15 text-white/70"
                    }`}>
                      {r.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-extrabold mb-2 ${isGuest ? "text-foreground" : "text-white"}`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {r.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed mb-5 flex-1 ${isGuest ? "text-muted-foreground" : "text-white/65"}`}>
                    {r.desc}
                  </p>

                  {/* Perks */}
                  <ul className="space-y-1.5 mb-6">
                    {r.perks.map(p => (
                      <li key={p} className="flex items-center gap-2">
                        <CheckCircle className={`flex-shrink-0 ${r.perkColor}`} style={{ width: 14, height: 14 }} />
                        <span className={`text-xs font-medium ${isGuest ? "text-muted-foreground" : "text-white/75"}`}>{p}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={e => { e.stopPropagation(); r.action(); }}
                    className={`w-full font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all duration-200 ${r.ctaBg} ${r.ctaText} ${
                      isHovered ? "shadow-lg gap-3" : ""
                    }`}
                  >
                    {r.cta}
                    <ArrowRight style={{ width: 15, height: 15 }} className={`transition-transform duration-200 ${isHovered ? "translate-x-0.5" : ""}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center gap-6">
          <button onClick={() => navigate("register")}
            className="text-sm text-white/45 hover:text-white/80 transition-colors">
            Belum punya akun? <span className="text-[#00B4D8] font-semibold">Daftar</span>
          </button>
          <span className="text-white/20">·</span>
          <button onClick={() => navigate("home")}
            className="text-sm text-white/45 hover:text-white/80 transition-colors flex items-center gap-1.5">
            <ArrowLeft style={{ width: 13, height: 13 }} /> Kembali ke Website
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex items-center gap-6 opacity-40">
          {[
            { icon: <Shield style={{ width: 14, height: 14 }} />, text: "SSL Protected" },
            { icon: <CheckCircle style={{ width: 14, height: 14 }} />, text: "1.200+ Nelayan Aktif" },
            { icon: <Leaf style={{ width: 14, height: 14 }} />, text: "Perikanan Berkelanjutan" },
          ].map(b => (
            <div key={b.text} className="flex items-center gap-1.5 text-white text-xs">
              {b.icon} {b.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
