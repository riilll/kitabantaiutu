import { useState, useRef, useCallback } from "react";
import {
  Upload, Sparkles, CheckCircle, AlertCircle, RotateCcw,
  Fish, ArrowRight, Info, Camera, Zap, Eye, ShieldCheck,
  ChevronRight
} from "lucide-react";
import { useNavigation } from "../../hooks/useNavigation";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface AnalysisResult {
  score: number;
  confidence: number;
  category: string;
  freshnessTier: "ultra" | "very" | "fresh" | "moderate" | "poor";
  indicators: string[];
  warnings: string[];
  recommendation: string;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function getTierConfig(tier: AnalysisResult["freshnessTier"]) {
  const map = {
    ultra:    { label: "Ultra Segar",   color: "#10B981", bg: "bg-emerald-50",  border: "border-emerald-300", text: "text-emerald-700", ring: "#10B981" },
    very:     { label: "Sangat Segar",  color: "#14B8A6", bg: "bg-teal-50",     border: "border-teal-300",    text: "text-teal-700",    ring: "#14B8A6" },
    fresh:    { label: "Segar",         color: "#0077B6", bg: "bg-blue-50",     border: "border-blue-300",    text: "text-blue-700",    ring: "#0077B6" },
    moderate: { label: "Cukup Segar",   color: "#F59E0B", bg: "bg-amber-50",    border: "border-amber-300",   text: "text-amber-700",   ring: "#F59E0B" },
    poor:     { label: "Tidak Segar",   color: "#EF4444", bg: "bg-red-50",      border: "border-red-300",     text: "text-red-700",     ring: "#EF4444" },
  };
  return map[tier];
}

function scoreTier(score: number): AnalysisResult["freshnessTier"] {
  if (score >= 93) return "ultra";
  if (score >= 83) return "very";
  if (score >= 70) return "fresh";
  if (score >= 50) return "moderate";
  return "poor";
}

const ALL_POSITIVE = [
  "Mata jernih dan cerah",
  "Insang berwarna merah segar",
  "Kulit mengkilap dan bercahaya",
  "Tekstur daging terlihat baik",
  "Warna tubuh masih cerah",
  "Tidak ada tanda pembusukan",
  "Sisik masih menempel dengan kuat",
  "Struktur tubuh masih utuh dan tegap",
];

function mockAnalyze(file: File): Promise<AnalysisResult> {
  // Deterministic-ish seed from filename so same file gives same result
  const seed = [...file.name].reduce((s, c) => s + c.charCodeAt(0), 0);
  return new Promise(resolve => {
    setTimeout(() => {
      const base = 80 + (seed % 17);           // 80–96
      const score = Math.min(98, base);
      const confidence = Math.min(96, score - 1 + (seed % 4));
      const tier = scoreTier(score);

      const shuffled = [...ALL_POSITIVE].sort((a, b) => ((seed * 37 + a.charCodeAt(0)) % 7) - 3.5);
      const indicators = shuffled.slice(0, 4 + (seed % 2));

      const recommendations: Record<AnalysisResult["freshnessTier"], string> = {
        ultra:    "Seafood ini tampak dalam kondisi sangat segar dan layak dikonsumsi. Segera olah untuk menjaga kualitasnya.",
        very:     "Seafood ini terlihat sangat segar berdasarkan analisis visual. Cocok untuk dikonsumsi dan diolah segera.",
        fresh:    "Seafood ini tampak segar dan layak untuk dikonsumsi. Pastikan disimpan dengan baik sebelum diolah.",
        moderate: "Seafood ini terlihat cukup segar namun perlu diperhatikan. Segera olah dan pastikan kebersihan penanganannya.",
        poor:     "Berdasarkan analisis visual, kondisi seafood ini kurang optimal. Disarankan pemeriksaan langsung oleh profesional.",
      };

      resolve({ score, confidence, freshnessTier: tier, category: getTierConfig(tier).label, indicators, warnings: [], recommendation: recommendations[tier] });
    }, 2300);
  });
}

// ─── CIRCULAR GAUGE ───────────────────────────────────────────────────────────
function ScoreGauge({ score, tier, animate }: { score: number; tier: AnalysisResult["freshnessTier"]; animate: boolean }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = animate ? circumference - (score / 100) * circumference : circumference;
  const { color } = getTierConfig(tier);

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
        {/* Track */}
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="10" />
        {/* Progress */}
        <circle
          cx="70" cy="70" r={radius} fill="none"
          stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold text-foreground leading-none">{score}%</span>
        <span className="text-xs text-muted-foreground font-semibold mt-1">Skor AI</span>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export function AIFreshnessPage() {
  const { navigate } = useNavigation();
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [gaugeAnimate, setGaugeAnimate] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
        setFileName(file.name);
        setResult(null);
        setGaugeAnimate(false);
        setAnalyzing(true);
        mockAnalyze(file).then(res => {
          setResult(res);
          setAnalyzing(false);
          setTimeout(() => setGaugeAnimate(true), 100);
        });
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleReset = () => {
    setPreview(null);
    setFileName("");
    setResult(null);
    setAnalyzing(false);
    setGaugeAnimate(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const tier = result ? result.freshnessTier : "fresh";
  const tierCfg = getTierConfig(tier);

  return (
    <div className="pt-16 min-h-screen bg-background">

      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0B1F3A] to-[#0077B6] py-14">
        <div className="absolute inset-0 opacity-8"
          style={{ backgroundImage: "radial-gradient(circle, #00B4D8 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.08 }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 bg-[#00B4D8]/20 border border-[#00B4D8]/30 rounded-full px-4 py-1.5 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#00B4D8]" />
            <span className="text-xs font-bold text-[#00B4D8] tracking-wide">AI-POWERED FEATURE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            AI Freshness Analysis
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            Upload foto seafood Anda dan biarkan AI kami mengestimasi tingkat kesegaran berdasarkan karakteristik visual.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { icon: <Zap className="w-4 h-4" />, text: "Hasil dalam 2 detik" },
              { icon: <Eye className="w-4 h-4" />, text: "Analisis visual akurat" },
              { icon: <ShieldCheck className="w-4 h-4" />, text: "Bebas digunakan" },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-white/80 text-sm">
                {b.icon} {b.text}
              </div>
            ))}
          </div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-8 fill-background">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">

          {/* LEFT — Upload */}
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-extrabold text-foreground mb-1">Upload Foto Seafood</h2>
              <p className="text-sm text-muted-foreground">Pilih atau seret foto seafood yang ingin dianalisis.</p>
            </div>

            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => !preview && fileRef.current?.click()}
              className={`relative border-2 border-dashed rounded-3xl transition-all duration-200 overflow-hidden ${
                dragging ? "border-accent bg-accent/8 scale-[1.01]" : preview ? "border-border" : "border-border hover:border-accent/60 hover:bg-muted/40 cursor-pointer"
              }`}
            >
              {preview ? (
                /* Image preview */
                <div className="relative">
                  <img src={preview} alt="Uploaded seafood" className="w-full h-72 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071428]/60 to-transparent" />
                  {analyzing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#071428]/70 backdrop-blur-sm">
                      <div className="relative mb-4">
                        <div className="w-16 h-16 rounded-full border-4 border-[#00B4D8]/30 border-t-[#00B4D8] animate-spin" />
                        <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-[#00B4D8]" />
                      </div>
                      <p className="text-white font-bold text-sm">Menganalisis kesegaran…</p>
                      <p className="text-white/60 text-xs mt-1">AI sedang memeriksa karakteristik visual</p>
                    </div>
                  )}
                  {result && !analyzing && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      <CheckCircle className="w-3.5 h-3.5" /> Analisis selesai
                    </div>
                  )}
                  <button
                    onClick={e => { e.stopPropagation(); handleReset(); }}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-foreground rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 shadow transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Ganti Foto
                  </button>
                </div>
              ) : (
                /* Empty state */
                <div className="py-14 flex flex-col items-center text-center px-8">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-5 transition-colors ${dragging ? "bg-accent/20" : "bg-muted"}`}>
                    <Upload className={`w-9 h-9 transition-colors ${dragging ? "text-accent" : "text-muted-foreground"}`} />
                  </div>
                  <p className="text-base font-bold text-foreground mb-1">
                    {dragging ? "Lepaskan untuk mengunggah" : "Seret & lepas foto di sini"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-5">
                    atau <span className="text-accent font-semibold">klik untuk memilih</span>
                  </p>
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-2xl hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-lg shadow-primary/20 mb-5"
                  >
                    <Camera className="w-4 h-4" /> Pilih Foto
                  </button>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>✓ JPG, PNG, WebP</span>
                    <span>✓ Maks. 10 MB</span>
                    <span>✓ Min. 200×200 px</span>
                  </div>
                </div>
              )}
            </div>

            <input
              ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f); }}
            />

            {/* File info */}
            {fileName && (
              <div className="flex items-center gap-3 bg-muted/60 rounded-2xl px-4 py-3 text-sm">
                <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Fish className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium text-foreground truncate flex-1">{fileName}</span>
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              </div>
            )}

            {/* Sample images hint */}
            {!preview && (
              <div className="bg-card rounded-2xl border border-border p-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Contoh jenis foto yang baik</p>
                <div className="flex gap-2">
                  {[
                    "https://images.unsplash.com/photo-1713804708016-e1f61ea2c0ca?w=80&h=80&fit=crop",
                    "https://images.unsplash.com/photo-1577105106699-5c230ed0bd70?w=80&h=80&fit=crop",
                    "https://images.unsplash.com/photo-1504309250229-4f08315f3b5c?w=80&h=80&fit=crop",
                    "https://images.unsplash.com/photo-1762508338570-bfbbac03bec4?w=80&h=80&fit=crop",
                  ].map((src, i) => (
                    <div key={i} className="w-14 h-14 rounded-xl overflow-hidden bg-muted border border-border">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="flex items-center text-xs text-muted-foreground px-1">
                    Foto jelas & pencahayaan baik
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Results */}
          <div>
            {!result && !analyzing ? (
              /* Placeholder */
              <div className="bg-card rounded-3xl border-2 border-dashed border-border p-10 text-center h-full flex flex-col items-center justify-center min-h-[340px]">
                <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-5">
                  <Sparkles className="w-9 h-9 text-muted-foreground opacity-50" />
                </div>
                <p className="font-bold text-foreground mb-1">Hasil analisis akan muncul di sini</p>
                <p className="text-sm text-muted-foreground">Upload foto seafood untuk memulai analisis AI</p>
              </div>
            ) : analyzing ? (
              /* Loading skeleton */
              <div className="bg-card rounded-3xl border border-border p-7 space-y-5 animate-pulse">
                <div className="h-5 bg-muted rounded-xl w-2/3" />
                <div className="w-36 h-36 bg-muted rounded-full mx-auto" />
                <div className="space-y-2">
                  {[1,2,3,4].map(i => <div key={i} className={`h-4 bg-muted rounded-xl ${i % 2 === 0 ? "w-3/4" : "w-full"}`} />)}
                </div>
              </div>
            ) : result && (
              /* Results card */
              <div className={`bg-card rounded-3xl border-2 ${tierCfg.border} shadow-xl overflow-hidden`}>
                {/* Header band */}
                <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${tierCfg.color}, ${tierCfg.color}88)` }} />

                <div className="p-7">
                  {/* Title */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Sparkles className="w-4 h-4" style={{ color: tierCfg.color }} />
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: tierCfg.color }}>
                          AI Freshness Score
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-foreground">{result.category}</h3>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${tierCfg.bg} ${tierCfg.text} border ${tierCfg.border}`}>
                      Kepercayaan {result.confidence}%
                    </div>
                  </div>

                  {/* Gauge */}
                  <ScoreGauge score={result.score} tier={result.freshnessTier} animate={gaugeAnimate} />

                  {/* Visual Analysis */}
                  <div className="mt-6">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                      Indikator Visual
                    </p>
                    <div className="space-y-2">
                      {result.indicators.map(ind => (
                        <div key={ind} className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${tierCfg.color}20` }}>
                            <CheckCircle className="w-3 h-3" style={{ color: tierCfg.color }} />
                          </div>
                          <span className="text-sm text-foreground">{ind}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className={`mt-5 ${tierCfg.bg} border ${tierCfg.border} rounded-2xl p-4`}>
                    <p className="text-xs font-bold mb-1.5" style={{ color: tierCfg.color }}>Rekomendasi AI</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{result.recommendation}</p>
                  </div>

                  {/* CTAs */}
                  <div className="mt-6 flex flex-col gap-2.5">
                    <button
                      onClick={handleReset}
                      className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 transition-all hover:scale-[1.01] shadow-md shadow-primary/20"
                    >
                      <RotateCcw className="w-4 h-4" /> Analisis Gambar Lain
                    </button>
                    <button
                      onClick={() => navigate("products")}
                      className="w-full flex items-center justify-center gap-2 border-2 border-border text-foreground font-semibold py-3.5 rounded-2xl hover:bg-muted hover:border-primary/40 transition-all text-sm"
                    >
                      <Fish className="w-4 h-4" /> Lihat Tangkapan Hari Ini
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── HOW IT WORKS ────────────────────────────────────── */}
        <section className="mt-16">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">CARA KERJA</p>
            <h2 className="text-3xl font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Bagaimana AI Kami Bekerja?
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Teknologi computer vision kami menganalisis atribut visual seafood secara instan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: <Upload className="w-7 h-7 text-[#00B4D8]" />,
                bg: "bg-[#E0F9FF]",
                title: "Upload Foto",
                desc: "Unggah foto seafood Anda dalam format JPG atau PNG. Pastikan gambar jelas dengan pencahayaan yang baik untuk hasil terbaik.",
              },
              {
                step: "02",
                icon: <Sparkles className="w-7 h-7 text-primary" />,
                bg: "bg-primary/10",
                title: "Analisis AI",
                desc: "Model AI kami menganalisis karakteristik visual seperti kecerahan mata, warna insang, kilauan kulit, dan kondisi umum.",
              },
              {
                step: "03",
                icon: <CheckCircle className="w-7 h-7 text-emerald-600" />,
                bg: "bg-emerald-50",
                title: "Terima Hasil",
                desc: "Dapatkan skor kesegaran estimasi, kategori, indikator visual terdeteksi, dan rekomendasi dalam hitungan detik.",
              },
            ].map(s => (
              <div key={s.step} className="bg-card rounded-3xl border border-border p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <span className="absolute top-5 right-5 text-5xl font-extrabold text-muted/30 select-none leading-none">
                  {s.step}
                </span>
                <div className={`w-14 h-14 ${s.bg} rounded-2xl flex items-center justify-center mb-5`}>{s.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DISCLAIMER ──────────────────────────────────────── */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="font-bold text-amber-800 mb-1">Perhatian — Hasil Estimasi</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              AI Freshness Analysis memberikan estimasi berdasarkan analisis gambar dan <strong>tidak dapat menggantikan</strong> pemeriksaan kualitas profesional. Hasil aktual dapat bervariasi berdasarkan faktor seperti penanganan, penyimpanan, dan kondisi yang tidak terlihat secara visual. Selalu lakukan pengecekan langsung sebelum konsumsi.
            </p>
          </div>
        </div>

        {/* ── EXPLORE CTA ─────────────────────────────────────── */}
        <div className="mt-8 bg-gradient-to-r from-[#0077B6] to-[#00B4D8] rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="text-xl font-extrabold text-white mb-1">Temukan Seafood Segar Hari Ini</h3>
            <p className="text-white/70 text-sm">Semua produk di Nelayani datang dengan jaminan kesegaran langsung dari nelayan.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={() => navigate("products")}
              className="flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-2xl hover:bg-white/90 transition-all hover:scale-[1.02] shadow-xl text-sm"
            >
              <Fish className="w-4 h-4" /> Jelajahi Tangkapan
            </button>
            <button
              onClick={() => navigate("fishermen-list")}
              className="flex items-center gap-2 bg-white/15 border border-white/30 text-white font-semibold px-5 py-3 rounded-2xl hover:bg-white/25 transition-all text-sm"
            >
              Lihat Nelayan <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
