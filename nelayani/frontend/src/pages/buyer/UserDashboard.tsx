import { useState, useEffect } from "react";
import { User, Package, CreditCard, Heart, Star, LogOut } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { useAuthContext } from "../../context/AuthContext";
import { BackButton } from "../../components/common/BackButton";
import { apiGet } from "../../services/api";
import { rp, statusStyle } from "../../utils";

export function UserDashboard() {
  const { navigate } = useNavigationContext();
  const { setRole } = useAuthContext();

  const userName = localStorage.getItem("activeUserName") || "Ahmad Fauzi";
  const userEmail = localStorage.getItem("activeUserEmail") || "ahmad.fauzi@email.com";
  
  const [myOrders, setMyOrders] = useState<any[]>([]);
  const [followedCount, setFollowedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataBackend = async () => {
      try {
        // 1. Ambil pesanan dari backend
        const allOrders: any[] = await apiGet('/orders');
        const myBackendOrders = allOrders.filter(o => o.buyerEmail === userEmail || o.buyerName === userName);
        setMyOrders(myBackendOrders);

        // 2. Ambil data jumlah follow dari backend berdasarkan email
        const followedFishermen: number[] = await apiGet(`/follows/${userEmail}`);
        setFollowedCount(followedFishermen.length);

      } catch (error) {
        console.error("Gagal mengambil data dari backend:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDataBackend();
  }, [userName, userEmail]);

  const totalOrdersCount = myOrders.length;
  const totalSpentAmount = myOrders.reduce((sum, o) => sum + o.total, 0);

  const handleLogout = () => {
    setRole(null); 
    localStorage.removeItem("activeUserAddress");
    navigate("buyer-login"); 
  };

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="bg-gradient-to-r from-[#0B1F3A] to-[#0077B6] py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackButton onClick={() => navigate("home")} label="Beranda" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center border-2 border-white/30">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white">{userName}</h1>
                <p className="text-white/70">{userEmail} · Member sejak Hari Ini</p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 bg-red-500/20 text-red-100 hover:bg-red-500/40 px-4 py-2 rounded-xl transition-colors text-sm font-semibold"
            >
              <LogOut className="w-4 h-4" /> Keluar
            </button>
            
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Pesanan", val: totalOrdersCount.toString(), icon: <Package className="w-5 h-5 text-primary" /> },
            { label: "Total Pengeluaran", val: rp(totalSpentAmount), icon: <CreditCard className="w-5 h-5 text-accent" /> },
            { label: "Nelayan Diikuti", val: followedCount.toString(), icon: <Heart className="w-5 h-5 text-red-400" /> },
            { label: "Rating Rata-rata", val: "0.0", icon: <Star className="w-5 h-5 text-amber-400" /> },
          ].map(s => (
            <div key={s.label} className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
              <div className="w-11 h-11 bg-muted rounded-xl flex items-center justify-center">{s.icon}</div>
              <div><p className="text-2xl font-extrabold">{s.val}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
            </div>
          ))}
        </div>
        
        <h2 className="text-xl font-extrabold mb-4">Riwayat Pesanan</h2>
        
        {loading ? (
           <div className="text-center py-10 text-muted-foreground">Memuat pesanan...</div>
        ) : myOrders.length === 0 ? (
          <div className="bg-card rounded-3xl border border-border p-16 text-center">
            <Package className="w-14 h-14 text-muted-foreground mx-auto mb-4 opacity-30" />
            <h3 className="text-lg font-bold text-foreground mb-2">Belum ada riwayat pesanan</h3>
            <p className="text-muted-foreground text-sm mb-6">Mulai belanja seafood segar langsung dari nelayan hari ini.</p>
            <button onClick={() => navigate("products")} className="bg-primary text-white font-bold px-6 py-3 rounded-2xl hover:bg-primary/90 transition-colors">
              Jelajahi Tangkapan
            </button>
          </div>
        ) : (
          <div className="bg-card rounded-3xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    {["ID Pesanan", "Produk", "Tanggal", "Status", "Total", ""].map(h => (
                      <th key={h} className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {myOrders.map(o => (
                    <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono font-bold text-primary">{o.id}</td>
                      <td className="px-6 py-4 text-sm font-medium">{o.product}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{o.date}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusStyle(o.status)}`}>{o.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold">{rp(o.total)}</td>
                      <td className="px-6 py-4"><button className="text-xs text-primary font-semibold hover:underline">Lacak</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}