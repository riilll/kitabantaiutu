import { MapPin, Package, Clock } from "lucide-react";
import { Product } from "../../types";
import { freshnessStyle, rp } from "../../utils";

export function CatchCard({ p, onDetail, onAdd }: { p: Product; onDetail: () => void; onAdd: () => void }) {
  return (
    <div
      onClick={onDetail}
      className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:-translate-y-1.5 hover:ring-2 hover:ring-primary/15 transition-all duration-300 group cursor-pointer active:scale-[0.98]"
    >
      <div className="relative overflow-hidden h-44 bg-secondary">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${freshnessStyle(p.freshness)}`}>{p.freshness}</span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2.5 py-1 text-xs font-bold text-foreground">{p.category}</div>
        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 shadow-lg">
            Lihat Detail →
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">{p.name}</h3>
          <div className="text-right">
            <p className="text-base font-bold text-primary">{rp(p.price)}</p>
            <p className="text-xs text-muted-foreground">per kg</p>
          </div>
        </div>
        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-accent" />{p.location}
          </div>
          <div className="flex gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1"><Package className="w-3.5 h-3.5 text-accent" />{p.weight} kg</div>
            <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-accent" />Tiba {p.arrival}</div>
          </div>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onAdd(); }}
          className="w-full text-sm font-semibold text-white bg-primary rounded-xl py-2.5 hover:bg-primary/90 transition-colors"
        >
          Pre-Order Sekarang
        </button>
      </div>
    </div>
  );
}
