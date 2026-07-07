import { useState, useEffect } from "react";
import { Package } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { BackButton } from "../../components/common/BackButton";
import { apiGet } from "../../services/api";
import { rp, statusStyle } from "../../utils";

export function FOrdersPage() {
  const { navigate } = useNavigationContext();
  const userName = localStorage.getItem("activeUserName") || "Ahmad Rasyid";
  const isNewAccount = userName !== "Ahmad Rasyid";

  const [incomingOrders, setIncomingOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchIncomingOrders = async () => {
      try {
        const data = await apiGet('/orders');
        setIncomingOrders(data as any[]);
      } catch (error) {
        console.error("Gagal menarik pesanan backend:", error);
      }
    };

    if (isNewAccount) {
      fetchIncomingOrders();
    } else {
      // Jika akun demo, panggil data bohong-bohongan dari lokal
      import("../../data").then(module => setIncomingOrders(module.ORDERS_DATA));
    }
  }, [isNewAccount]);

  return (
    <div className="p-8">
      <BackButton onClick={() => navigate("f-dashboard")} />
      <h1 className="text-2xl font-extrabold mb-8">Pesanan Masuk</h1>
      
      {incomingOrders.length === 0 ? (
        <div className="bg-card rounded-3xl border border-border p-16 text-center">
          <Package className="w-14 h-14 text-muted-foreground mx-auto mb-4 opacity-30" />
          <h3 className="text-lg font-bold text-foreground mb-2">Belum ada pesanan masuk</h3>
          <p className="text-muted-foreground text-sm">Pesanan dari pembeli akan otomatis muncul di sini setelah tangkapan Anda dibeli.</p>
        </div>
      ) : (
        <div className="bg-card rounded-3xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {["ID Pesanan", "Produk", "Pembeli", "Tanggal", "Status", "Total"].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {incomingOrders.map(o => (
                  <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono font-bold text-primary">{o.id}</td>
                    <td className="px-6 py-4 text-sm font-medium">{o.product}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{o.buyerName || "Pembeli Rahasia"}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{o.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusStyle(o.status)}`}>{o.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">{rp(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}