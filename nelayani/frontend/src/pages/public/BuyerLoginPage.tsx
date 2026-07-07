import { useState } from "react";
import { Anchor, Mail, Lock, Eye, ShoppingCart, ArrowLeft } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { useAuthContext } from "../../context/AuthContext";

export function BuyerLoginPage() {
  const { navigate } = useNavigationContext();
  const { setRole } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Mohon masukkan email dan password.");
      return;
    }

    const registeredEmail = localStorage.getItem("activeUserEmail");
    const registeredName = localStorage.getItem("activeUserName");

    // Jika email yang dimasukkan cocok dengan data register
    if (registeredEmail && registeredEmail.toLowerCase() === email.toLowerCase()) {
      if (registeredName) {
        localStorage.setItem("activeUserName", registeredName);
      } else {
        const extractName = email.split("@")[0].replace(/[0-9]/g, '');
        const formattedName = extractName.charAt(0).toUpperCase() + extractName.slice(1);
        localStorage.setItem("activeUserName", formattedName);
      }
    } else {
      // Jika user login menggunakan akun baru yang belum pernah register
      const emailPrefix = email.split("@")[0];
      const generatedName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
      
      localStorage.setItem("activeUserName", generatedName);
      localStorage.setItem("activeUserEmail", email);
      localStorage.removeItem("activeUserPhone");
      localStorage.removeItem("activeUserAddress");
      localStorage.removeItem("activeUserCity");
    }

    setRole("buyer");
    navigate("home"); 
  };

  return (
    <div className="min-h-screen flex">
      {/* Left ocean panel */}
      <div className="hidden lg:flex lg:w-[48%] relative overflow-hidden flex-col justify-between"
        style={{ background: "linear-gradient(160deg, #071428 0%, #0B1F3A 50%, #0077B6 100%)" }}>
        <div className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1583396618422-597b2755de83?w=1200&h=900&fit=crop&auto=format)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071428]/50 via-transparent to-[#071428]/85" />
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle, rgba(0,180,216,0.07) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="relative px-12 pt-12">
          <button onClick={() => navigate("home")} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00B4D8] rounded-2xl flex items-center justify-center shadow-lg shadow-[#00B4D8]/30">
              <Anchor className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Nela<span className="text-[#00B4D8]">yani</span>
            </span>
          </button>
        </div>

        <div className="relative px-12 pb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-5 backdrop-blur-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/85">Seafood Segar Setiap Hari</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Pesan Seafood<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-[#90E0EF]">
              Langsung dari Nelayan
            </span>
          </h2>
          <p className="text-white/60 leading-relaxed mb-8">
            Temukan tangkapan terbaik hari ini, lacak pengiriman, dan nikmati jaminan kesegaran di setiap pesanan.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[["10.000+", "Pembeli Aktif"], ["50+", "Tangkapan/Hari"], ["< 6 Jam", "Laut ke Pintu"]].map(([n, l]) => (
              <div key={l} className="bg-white/8 rounded-2xl p-3 text-center border border-white/10">
                <p className="text-lg font-extrabold text-white">{n}</p>
                <p className="text-xs text-white/50 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 800 60" preserveAspectRatio="none" className="w-full h-10 fill-white/5">
            <path d="M0,30 C200,60 600,0 800,30 L800,60 L0,60 Z" />
          </svg>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-[#F0F8FF] overflow-y-auto">
        <div className="w-full max-w-md">
          <button onClick={() => navigate("home")} className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
              <Anchor className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-extrabold text-foreground">Nela<span className="text-primary">yani</span></span>
          </button>

          <button onClick={() => navigate("login")}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary text-sm font-semibold transition-colors mb-6 group">
            <div className="w-7 h-7 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-primary/40 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
            </div>
            Pilih Peran Lain
          </button>

          <div className="flex items-center gap-2.5 bg-primary/8 border border-primary/20 rounded-2xl px-4 py-3 mb-6">
            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🛒</div>
            <div>
              <p className="text-sm font-bold text-primary">Masuk sebagai Pembeli</p>
              <p className="text-xs text-muted-foreground">Akses marketplace seafood segar</p>
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-foreground mb-1">Selamat Datang Kembali</h2>
          <p className="text-muted-foreground text-sm mb-6">Masuk untuk melihat tangkapan terbaru</p>

          <div className="space-y-4 mb-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={email} onChange={e => setEmail(e.target.value)}
                  type="email" placeholder="nama@email.com"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={password} onChange={e => setPassword(e.target.value)}
                  type={showPass ? "text" : "password"} placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                <button onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <button onClick={handleLogin}
            className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary/90 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg shadow-primary/20 mb-4">
            <ShoppingCart className="w-4 h-4" /> Masuk & Mulai Belanja
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <button onClick={() => navigate("register")} className="text-primary font-bold hover:underline">
              Daftar sekarang
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}