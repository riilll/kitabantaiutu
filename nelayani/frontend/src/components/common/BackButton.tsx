import { ArrowLeft } from "lucide-react";

export function BackButton({ onClick, label = "Kembali" }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm font-semibold transition-colors group mb-6"
    >
      <div className="w-8 h-8 rounded-xl bg-card border border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
        <ArrowLeft className="w-4 h-4" />
      </div>
      {label}
    </button>
  );
}
