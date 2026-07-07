import { useState, useRef } from "react";
import { Upload, Plus, Trash2 } from "lucide-react";

export function ImageUploadArea({ images, onAdd, onRemove }: {
  images: string[]; onAdd: (src: string) => void; onRemove: (i: number) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const readFiles = (files: File[]) => {
    files.filter(f => f.type.startsWith("image/")).forEach(f => {
      const reader = new FileReader();
      reader.onload = e => { if (e.target?.result) onAdd(e.target.result as string); };
      reader.readAsDataURL(f);
    });
  };

  return (
    <div>
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); readFiles(Array.from(e.dataTransfer.files)); }}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
          dragging ? "border-accent bg-accent/10 scale-[1.01]" : "border-border hover:border-accent/50 hover:bg-muted/40"
        }`}
      >
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${dragging ? "bg-accent/20" : "bg-muted"}`}>
          <Upload className={`w-8 h-8 transition-colors ${dragging ? "text-accent" : "text-muted-foreground"}`} />
        </div>
        <p className="text-base font-bold text-foreground mb-1">
          {dragging ? "Lepaskan untuk mengunggah" : "Drag & drop foto ikan Anda di sini"}
        </p>
        <p className="text-sm text-muted-foreground">atau <span className="text-accent font-semibold">klik untuk memilih file</span> · JPG, PNG, WebP · Maks. 10MB per foto</p>
        <p className="text-xs text-muted-foreground mt-2">Tambahkan hingga 5 foto · Foto pertama jadi foto utama</p>
        <input
          ref={fileRef} type="file" accept="image/*" multiple
          className="hidden"
          onChange={e => readFiles(Array.from(e.target.files || []))}
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-5 gap-3 mt-4">
          {images.map((src, i) => (
            <div key={i} className="relative group aspect-square rounded-xl overflow-hidden bg-secondary border border-border">
              <img src={src} className="w-full h-full object-cover" alt={`Foto ${i + 1}`} />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={e => { e.stopPropagation(); onRemove(i); }}
                  className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 bg-primary text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  Utama
                </span>
              )}
            </div>
          ))}
          {images.length < 5 && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-accent/50 flex flex-col items-center justify-center gap-1.5 hover:bg-muted/50 transition-all cursor-pointer"
            >
              <Plus className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Tambah</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
