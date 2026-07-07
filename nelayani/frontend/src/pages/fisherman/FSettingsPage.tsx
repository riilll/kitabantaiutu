import { LogOut } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { BackButton } from "../../components/common/BackButton";

export function FSettingsPage() {
  const { navigate } = useNavigationContext();

  return (
    <div className="p-8 max-w-2xl">
      <BackButton onClick={() => navigate("f-dashboard")} />
      <h1 className="text-2xl font-extrabold mb-8">Pengaturan</h1>
      <div className="space-y-4">
        {[
          { title: "Notifikasi Pesanan Baru", desc: "Terima notifikasi saat ada pesanan masuk", on: true },
          { title: "Notifikasi WhatsApp", desc: "Kirim ringkasan harian via WhatsApp", on: true },
          { title: "Mode Liburan", desc: "Nonaktifkan semua listing sementara", on: false },
          { title: "Auto-publish Tangkapan", desc: "Publish otomatis saat form diisi lengkap", on: false },
        ].map(s => (
          <div key={s.title} className="bg-card rounded-2xl border border-border p-5 flex items-center justify-between">
            <div><p className="font-semibold text-foreground">{s.title}</p><p className="text-sm text-muted-foreground">{s.desc}</p></div>
            <div className={`w-12 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${s.on ? "bg-primary" : "bg-muted"}`}>
              <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${s.on ? "translate-x-6" : "translate-x-0"}`} />
            </div>
          </div>
        ))}
        <div className="bg-card rounded-2xl border border-border p-5">
          <p className="font-semibold text-foreground mb-4">Keamanan Akun</p>
          <div className="space-y-3">
            <button className="w-full text-sm font-semibold text-primary border border-primary/30 rounded-xl py-3 hover:bg-primary/5 transition-colors">Ubah Password</button>
            <button onClick={() => navigate("login")} className="w-full text-sm font-semibold text-red-500 border border-red-200 rounded-xl py-3 hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
              <LogOut className="w-4 h-4" /> Keluar dari Akun
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
