import {
  BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { useNavigationContext } from "../../context/NavigationContext";
import { BackButton } from "../../components/common/BackButton";
import { REVENUE_DATA } from "../../data";

export function FSalesPage() {
  const { navigate } = useNavigationContext();

  return (
    <div className="p-8">
      <BackButton onClick={() => navigate("f-dashboard")} />
      <h1 className="text-2xl font-extrabold mb-8">Riwayat Penjualan</h1>
      <div className="bg-card rounded-3xl border border-border p-6 mb-6">
        <h2 className="font-bold text-lg mb-4">Pendapatan Bulanan 2026</h2>
        <ResponsiveContainer key="sales-bar-chart" width="100%" height={260}>
          <ReBarChart data={REVENUE_DATA} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5B7FA6" }} />
            <YAxis tick={{ fontSize: 12, fill: "#5B7FA6" }} />
            <Tooltip formatter={(v: number) => [`Rp ${v}M`, "Pendapatan"]} />
            <Bar dataKey="revenue" fill="#0077B6" radius={[8, 8, 0, 0]} />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
