import { MapPin, Star, CheckCircle } from "lucide-react";
import { Fisherman } from "../../types";

export function FishermanCard({ f, onClick }: { f: Fisherman; onClick: () => void }) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="h-28 bg-gradient-to-br from-[#0077B6] to-[#023E8A] relative">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1566622246721-600a52b49b33?w=400&h=128&fit=crop&auto=format)", backgroundSize: "cover" }} />
      </div>
      <div className="px-5 pb-5">
        <div className="-mt-10 mb-3 flex items-end justify-between">
          <div className="relative">
            <img src={f.avatar} alt={f.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md" />
            {f.verified && <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white"><CheckCircle className="w-3 h-3 text-white" /></div>}
          </div>
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-amber-700">{f.rating}</span>
          </div>
        </div>
        <h3 className="font-bold text-foreground text-lg">{f.name}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3"><MapPin className="w-3.5 h-3.5" />{f.location}</div>
        <div className="flex gap-2 mb-4">
          <div className="flex-1 bg-muted rounded-xl p-2 text-center">
            <p className="text-base font-bold text-foreground">{f.experience}y</p>
            <p className="text-xs text-muted-foreground">Pengalaman</p>
          </div>
          <div className="flex-1 bg-muted rounded-xl p-2 text-center">
            <p className="text-base font-bold text-foreground">{f.catches.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Tangkapan</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {f.specialties.map(s => <span key={s} className="text-xs bg-secondary text-primary font-medium px-2.5 py-1 rounded-full">{s}</span>)}
        </div>
        <button onClick={onClick} className="w-full text-sm font-semibold text-white bg-primary rounded-xl py-2.5 hover:bg-primary/90 transition-colors">
          Lihat Profil
        </button>
      </div>
    </div>
  );
}
