import { useState, useEffect } from "react";
import { TrendingUp, Fish, Package, Star, Plus } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { useNavigationContext } from "../../context/NavigationContext";
import { ProductService } from "../../services/product.service";
import { REVENUE_DATA, ORDERS_DATA } from "../../data";
import { statusStyle } from "../../utils";

export function FDashboardPage() {
  const { navigate } = useNavigationContext();
  
  // Ambil nama user yang login
  const userName = localStorage.getItem("activeUserName") || "Ahmad Rasyid";
  
  // Cek apakah ini akun baru atau akun demo (Ahmad Rasyid)
  const isNewAccount = userName !== "Ahmad Rasyid";

  const [activeListings, setActiveListings] = useState(0);

  useEffect(() => {
    ProductService.getAll().then(data => {
      // Filter jumlah produk berdasarkan nama nelayan yang login
      const myProducts = data.filter(p => p.fisherman === userName);
      setActiveListings(myProducts.length);
    });
  }, [userName]);

  // Siapkan data dinamis (Jika akun baru, semuanya 0)
  const revenue = isNewAccount ? "Rp 0" : "Rp 91 Jt";
  const revenueTrend = isNewAccount ? "0%" : "+34%";
  const orders = isNewAccount ? "0" : "47";
  const ordersTrend = isNewAccount ? "0%" : "+12%";
  const rating = isNewAccount ? "0.0" : "4.9";
  const reviews = isNewAccount ? "0 ulasan" : "1.240 ulasan";

  // Kosongkan grafik untuk akun baru
  const chartData = isNewAccount ? [
    { month: "Jan", revenue: 0 }, { month: "Feb", revenue: 0 },
    { month: "Mar", revenue: 0 }, { month: "Apr", revenue: 0 },
    { month: "May", revenue: 0 }, { month: "Jun", revenue: 0 }
  ] : REVENUE_DATA;

  const recentOrders = isNewAccount ? [] : ORDERS_DATA;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-foreground">Dashboard Nelayan</h1>
        <p className="text-muted-foreground">Selamat pagi, {userName}! 🌊</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Pendapatan Bulan Ini", val: revenue, trend: revenueTrend, up: !isNewAccount, icon: <TrendingUp className="w-5 h-5 text-emerald-600" /> },
          { label: "Listing Aktif", val: activeListings.toString(), trend: "live", up: true, icon: <Fish className="w-5 h-5 text-primary" /> },
          { label: "Pesanan Bulan Ini", val: orders, trend: ordersTrend, up: !isNewAccount, icon: <Package className="w-5 h-5 text-accent" /> },
          { label: "Rating Rata-rata", val: rating, trend: reviews, up: !isNewAccount, icon: <Star className="w-5 h-5 text-amber-400" /> },
        ].map(s => (
          <div key={s.label} className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">{s.icon}</div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.up ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>{s.trend}</span>
            </div>
            <p className="text-2xl font-extrabold text-foreground">{s.val}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      
      {/* Chart Section */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-card rounded-3xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Pendapatan Bulanan</h2>
            <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Jan–Jun 2026</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5B7FA6" }} />
              <YAxis tick={{ fontSize: 12, fill: "#5B7FA6" }} />
              <Tooltip formatter={(v: number) => [`Rp ${v}M`, "Pendapatan"]} />
              <Line type="monotone" dataKey="revenue" stroke="#0077B6" strokeWidth={2.5} dot={{ fill: "#0077B6", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Order Section */}
        <div className="bg-card rounded-3xl border border-border p-6">
          <h2 className="text-lg font-bold mb-5">Pesanan Terbaru</h2>
          {recentOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <Package className="w-10 h-10 text-muted-foreground mb-3 opacity-30" />
              <p className="text-sm font-semibold text-muted-foreground">Belum ada pesanan</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map(o => (
                <div key={o.id} className="flex items-center gap-3 pb-4 border-b border-border last:border-0">
                  <div className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center flex-shrink-0"><Package className="w-4 h-4 text-primary" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{o.product}</p>
                    <p className="text-xs text-muted-foreground">{o.id}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 ${statusStyle(o.status)}`}>{o.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-[#0077B6] to-[#00B4D8] rounded-3xl p-6 flex items-center justify-between">
        <div>
          <h3 className="text-white font-bold text-lg mb-1">Tambahkan Tangkapan Baru</h3>
          <p className="text-white/70 text-sm">Baru pulang melaut? Upload tangkapan Anda sekarang!</p>
        </div>
        <button onClick={() => navigate("f-new-catch")}
          className="flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-2xl hover:bg-white/90 transition-colors flex-shrink-0">
          <Plus className="w-4 h-4" /> Tambah Tangkapan
        </button>
      </div>
    </div>
  );
}