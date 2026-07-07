import { useState } from "react";
import { Anchor, Fish, Mail, Lock, Eye, Package, TrendingUp, Leaf, ArrowLeft } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { useAuthContext } from "../../context/AuthContext";

export function FishermanLoginPage() {
  const { navigate } = useNavigationContext();
  const { setRole } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        // Pertahankan nama asli hasil registrasi
        localStorage.setItem("activeUserName", registeredName);
      } else {
        // Cadangan darurat jika nama sempat hilang
        const extractName = email.split("@")[0].replace(/[0-9]/g, '');
        const formattedName = extractName.charAt(0).toUpperCase() + extractName.slice(1);
        localStorage.setItem("activeUserName", formattedName);
      }
    } else {
      // Jika user login menggunakan akun baru yang belum pernah register sama sekali
      const emailPrefix = email.split("@")[0];
      const generatedName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
      
      localStorage.setItem("activeUserName", generatedName);
      localStorage.setItem("activeUserEmail", email);
      localStorage.removeItem("activeUserPhone");
      localStorage.setItem("activeUserPort", "");
      localStorage.setItem("activeUserArea", "");
      localStorage.setItem("activeUserBoat", "");
    }

    setRole("fisherman");
    navigate("f-dashboard");
  };

  return (
    <div className="min-h-screen flex bg-[#F0F8FF]">
      {/* Left ocean panel */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #071428 0%, #0B1F3A 55%, #023E8A 100%)" }}>
        <div className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1592063494814-526817a9cfce?w=900&h=900&fit=crop&auto=format)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071428]/50 via-transparent to-[#071428]/80" />
        <div className="absolute inset-0 opacity-8"
          style={{ backgroundImage: "radial-gradient(circle, #00B4D8 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.08 }} />

        <div className="relative px-12 pt-12">
          <button onClick={() => navigate("home")} className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-[#00B4D8] rounded-2xl flex items-center justify-center">
              <Anchor className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Nela<span className="text-[#00B4D8]">yani</span>
            </span>
          </button>
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Portal Khusus<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-[#90E0EF]">Nelayan</span>
          </h1>
          <p className="text-white/65 leading-relaxed">
            Kelola tangkapan, terima pesanan, dan pantau penghasilan Anda — semua dalam satu dasbor nelayan.
          </p>
        </div>

        <div className="relative px-12 pb-12 space-y-4">
          {[
            { icon: <Fish className="w-4 h-4" />, text: "Upload tangkapan langsung dari laut" },
            { icon: <Package className="w-4 h-4" />, text: "Terima pesanan dari ribuan pembeli" },
            { icon: <TrendingUp className="w-4 h-4" />, text: "Pantau penjualan secara real-time" },
            { icon: <Leaf className="w-4 h-4" />, text: "Dukung perikanan berkelanjutan" },
          ].map(f => (
            <div key={f.text} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#00B4D8]/20 rounded-xl flex items-center justify-center text-[#00B4D8] flex-shrink-0">
                {f.icon}
              </div>
              <p className="text-white/70 text-sm">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 600 50" preserveAspectRatio="none" className="w-full h-8 fill-[#F0F8FF]">
            <path d="M0,25 C150,50 450,0 600,25 L600,50 L0,50 Z" />
          </svg>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <button onClick={() => navigate("home")} className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
              <Anchor className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-extrabold text-foreground">Nela<span className="text-primary">yani</span></span>
          </button>

          <div className="bg-card rounded-3xl border border-border shadow-xl p-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Fish className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-foreground">Masuk sebagai Nelayan</h2>
                <p className="text-sm text-muted-foreground">Akses dasbor nelayan Nelayani</p>
              </div>
            </div>

            <div className="mt-7 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email Nelayan</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input value={email} onChange={e => setEmail(e.target.value)}
                    type="email" placeholder="nama@nelayan.id"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input value={password} onChange={e => setPassword(e.target.value)}
                    type={showPass ? "text" : "password"} placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                  <button onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border text-primary" />
                  <span className="text-sm text-muted-foreground">Ingat saya</span>
                </label>
                <button className="text-sm text-primary font-semibold hover:underline">Lupa password?</button>
              </div>
            </div>

            <button onClick={handleLogin}
              className="w-full mt-6 bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary/90 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <Fish className="w-5 h-5" /> Masuk ke Dasbor Nelayan
            </button>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">atau</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <button onClick={() => navigate("register")}
              className="w-full mt-4 border-2 border-border text-foreground font-semibold py-3.5 rounded-2xl hover:bg-muted transition-colors text-sm">
              Daftar sebagai Nelayan Baru
            </button>
          </div>

          <div className="flex items-center justify-between mt-5 px-1">
            <button onClick={() => navigate("login")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Pilih Peran Lain
            </button>
            <button onClick={() => navigate("buyer-login")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Masuk sebagai Pembeli →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}