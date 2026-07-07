import { ShoppingCart, Lock, User, X } from "lucide-react";

export function LoginRequiredModal({ onClose, onLogin, onRegister }: {
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#071428]/70 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative bg-card rounded-3xl shadow-2xl border border-border w-full max-w-md overflow-hidden">
        {/* Ocean header band */}
        <div className="h-2 bg-gradient-to-r from-[#0077B6] via-[#00B4D8] to-[#48CAE4]" />

        <div className="p-8">
          {/* Icon */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-[#E0F4F8] to-[#B3E5F5] rounded-2xl flex items-center justify-center shadow-md">
                <ShoppingCart className="w-9 h-9 text-[#0077B6]" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-400 rounded-xl flex items-center justify-center shadow-md border-2 border-white">
                <Lock className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="text-center mb-7">
            <h2 className="text-2xl font-extrabold text-foreground mb-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Login Diperlukan
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Masuk ke akun Anda sebelum melakukan pemesanan atau pre-order seafood segar langsung dari nelayan.
            </p>
          </div>

          {/* Perks row */}
          <div className="grid grid-cols-3 gap-3 mb-7">
            {[
              { icon: "🐟", text: "Seafood Segar" },
              { icon: "🚚", text: "Kirim Cepat" },
              { icon: "✅", text: "Terjamin" },
            ].map(p => (
              <div key={p.text} className="bg-muted/60 rounded-2xl p-3 text-center">
                <div className="text-xl mb-1">{p.icon}</div>
                <p className="text-xs font-semibold text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button onClick={onLogin}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <User className="w-4 h-4" /> Login sebagai Pembeli
            </button>
            <button onClick={onRegister}
              className="w-full border-2 border-border text-foreground font-semibold py-3.5 rounded-2xl hover:bg-muted hover:border-primary/40 transition-all text-sm">
              Daftar Akun Baru
            </button>
            <button onClick={onClose}
              className="w-full text-muted-foreground text-sm font-medium py-2 hover:text-foreground transition-colors">
              Lanjut Jelajahi Tanpa Beli
            </button>
          </div>
        </div>

        {/* Close button */}
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
