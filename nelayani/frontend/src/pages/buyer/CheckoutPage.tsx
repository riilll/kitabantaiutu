import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, Anchor, Lock, Fish, ShoppingBag } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { useCartContext } from "../../context/CartContext";
import { SHIPPING_OPTIONS, PAYMENT_OPTIONS } from "../../data";
import { rp } from "../../utils";
import { apiPost } from "../../services/api"; // Import fungsi API untuk menembak data ke backend

export function CheckoutPage() {
  const { navigate } = useNavigationContext();
  const { cart, clearCart } = useCartContext();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedShipping, setSelectedShipping] = useState("jnt");
  const [selectedPayment, setSelectedPayment] = useState("bca");
  const [orderId, setOrderId] = useState("");

  // Tarik data secara otomatis dari localStorage jika ada
  const [addressData, setAddressData] = useState({
    name: localStorage.getItem("activeUserName") || "",
    phone: localStorage.getItem("activeUserPhone") || "",
    email: localStorage.getItem("activeUserEmail") || "",
    address: localStorage.getItem("activeUserAddress") || "",
    city: localStorage.getItem("activeUserCity") || "",
    zipcode: "",
    notes: ""
  });

  const shipping = SHIPPING_OPTIONS.find(s => s.id === selectedShipping)!;
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.kg, 0);
  const serviceFee = 2000;
  const totalPayment = subtotal + shipping.cost + serviceFee;

  const CHECKOUT_STEPS = [
    { n: 1, label: "Alamat", full: "Alamat Pengiriman" },
    { n: 2, label: "Pengiriman", full: "Metode Pengiriman" },
    { n: 3, label: "Pembayaran", full: "Pembayaran" },
  ];

  const handleNextFromAddress = () => {
    if (!addressData.name || !addressData.phone || !addressData.address || !addressData.city) {
      alert("Mohon lengkapi Nama, Nomor HP, Alamat, dan Kota terlebih dahulu.");
      return;
    }
    setStep(2);
  };

  const handleCheckout = async () => {
    // 1. Buat ID Pesanan
    const newOrderId = `MF-${Math.floor(Math.random() * 9000) + 1000}`;
    setOrderId(newOrderId);

    // 2. Format produk pesanan
    const productNames = cart.map(i => `${i.product.name} ${i.kg}kg`).join(', ');

    // 3. Format data pesanan yang akan dikirim ke Backend
    const payload = {
      id: newOrderId,
      product: productNames,
      status: "Diproses",
      total: totalPayment,
      buyerName: addressData.name, // Agar backend tahu siapa yang pesan
      buyerEmail: addressData.email
    };

    try {
      // 4. Tembak data pesanan ke backend API
      await apiPost('/orders', payload);
      setStep(4); // Lanjut ke halaman sukses jika berhasil
    } catch (error) {
      console.error("Gagal mengirim pesanan:", error);
      alert("Gagal memproses pesanan. Pastikan server backend (Node.js) Anda sudah menyala.");
    }
  };

  if (step === 4) return (
    <div className="pt-16 min-h-screen bg-[#F0F8FF] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="bg-card rounded-3xl border border-border shadow-xl p-10 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground mb-2">Pesanan Berhasil!</h1>
          <p className="text-muted-foreground mb-1">No. Pesanan <span className="font-bold text-foreground font-mono">#{orderId}</span></p>
          <p className="text-muted-foreground text-sm mb-8">
            Seafood Anda sedang disiapkan oleh nelayan dan akan segera dikirim melalui <strong>{shipping.name}</strong>. Estimasi tiba: <strong>{shipping.est}</strong>.
          </p>
          <div className="bg-muted rounded-2xl p-5 mb-6 text-left space-y-2">
            {cart.map(i => (
              <div key={i.product.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{i.product.name} ({i.kg}kg)</span>
                <span className="font-semibold">{rp(i.product.price * i.kg)}</span>
              </div>
            ))}
            <div className="border-t border-border pt-2 mt-2 flex justify-between font-extrabold">
              <span>Total Dibayar</span><span className="text-primary">{rp(totalPayment)}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { clearCart(); navigate("user-dashboard"); }}
              className="flex-1 bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 transition-colors">
              Lacak Pesanan
            </button>
            <button onClick={() => { clearCart(); navigate("home"); }}
              className="flex-1 border-2 border-border text-foreground font-bold py-3.5 rounded-2xl hover:bg-muted transition-colors">
              Belanja Lagi
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const paymentGroups = Array.from(new Set(PAYMENT_OPTIONS.map(p => p.group)));

  return (
    <div className="pt-16 min-h-screen bg-[#F0F8FF]">
      {/* Checkout header */}
      <div className="bg-white border-b border-border sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-4">
            <button onClick={() => navigate("cart")}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary text-sm font-semibold transition-colors">
              <ArrowLeft className="w-4 h-4" /> Keranjang
            </button>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <Anchor className="w-3 h-3 text-white" />
              </div>
              <span className="font-bold text-foreground text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Nela<span className="text-primary">yani</span>
              </span>
            </div>
            <span className="text-muted-foreground text-sm">/ Checkout</span>
          </div>

          <div className="flex items-center justify-center gap-0 pb-5">
            {CHECKOUT_STEPS.map((s, i) => (
              <div key={s.n} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step > s.n ? "bg-emerald-500 text-white" :
                    step === s.n ? "bg-primary text-white shadow-lg shadow-primary/25 scale-110" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {step > s.n ? <CheckCircle className="w-4 h-4" /> : s.n}
                  </div>
                  <span className={`text-xs font-semibold whitespace-nowrap transition-colors ${step === s.n ? "text-primary" : step > s.n ? "text-emerald-600" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
                {i < CHECKOUT_STEPS.length - 1 && (
                  <div className={`w-20 sm:w-32 h-0.5 mx-3 mb-5 transition-colors duration-300 ${step > s.n ? "bg-emerald-400" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          <div>
            {step === 1 && (
              <div className="bg-card rounded-3xl border border-border shadow-sm p-8">
                <h2 className="text-xl font-extrabold text-foreground mb-6 flex items-center gap-2">
                  <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">1</div>
                  Alamat Pengiriman
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { key: "name", label: "Nama Penerima", placeholder: "Ahmad Fauzi", col: "sm:col-span-1" },
                    { key: "phone", label: "Nomor HP / WhatsApp", placeholder: "+62 812 3456 7890", col: "sm:col-span-1" },
                    { key: "email", label: "Email (opsional)", placeholder: "nama@email.com", col: "sm:col-span-2", type: "email" },
                  ].map(f => (
                    <div key={f.label} className={f.col}>
                      <label className="block text-sm font-semibold text-foreground mb-2">{f.label}</label>
                      <input 
                        type={f.type ?? "text"} 
                        placeholder={f.placeholder}
                        value={addressData[f.key as keyof typeof addressData]}
                        onChange={(e) => setAddressData({ ...addressData, [f.key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-shadow" 
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-2">Alamat Lengkap</label>
                    <textarea 
                      rows={3} 
                      placeholder="Jl. Teuku Umar No. 12, Gampong Ateuk, Kec. Baiturrahman"
                      value={addressData.address}
                      onChange={(e) => setAddressData({ ...addressData, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Kota / Kabupaten</label>
                    <input 
                      placeholder="Banda Aceh"
                      value={addressData.city}
                      onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Kode Pos</label>
                    <input 
                      placeholder="23111"
                      value={addressData.zipcode}
                      onChange={(e) => setAddressData({ ...addressData, zipcode: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-2">Catatan Tambahan <span className="font-normal text-muted-foreground">(opsional)</span></label>
                    <input 
                      placeholder="Contoh: Paket jangan ditaruh di luar, hubungi sebelum tiba"
                      value={addressData.notes}
                      onChange={(e) => setAddressData({ ...addressData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" 
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <button onClick={handleNextFromAddress}
                    className="flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-lg shadow-primary/20">
                    Lanjutkan <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-card rounded-3xl border border-border shadow-sm p-8">
                <h2 className="text-xl font-extrabold text-foreground mb-6 flex items-center gap-2">
                  <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">2</div>
                  Metode Pengiriman
                </h2>
                <div className="space-y-3">
                  {SHIPPING_OPTIONS.map(opt => {
                    const active = selectedShipping === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedShipping(opt.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                          active ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/40 hover:bg-muted/40"
                        }`}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0"
                          style={{ backgroundColor: opt.bg }}
                        >
                          {opt.abbr}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-foreground">{opt.name}</p>
                          <p className="text-sm text-muted-foreground">{opt.service} · Est. {opt.est}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="text-right">
                            <p className="font-bold text-foreground">{rp(opt.cost)}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            active ? "border-primary bg-primary" : "border-muted-foreground/40"
                          }`}>
                            {active && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={() => setStep(1)}
                    className="flex items-center gap-2 border-2 border-border text-foreground font-bold px-7 py-3.5 rounded-2xl hover:bg-muted transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Kembali
                  </button>
                  <button onClick={() => setStep(3)}
                    className="flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-lg shadow-primary/20">
                    Lanjutkan <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-card rounded-3xl border border-border shadow-sm p-8">
                <h2 className="text-xl font-extrabold text-foreground mb-6 flex items-center gap-2">
                  <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">3</div>
                  Metode Pembayaran
                </h2>
                <div className="space-y-6">
                  {paymentGroups.map(group => (
                    <div key={group}>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">{group}</p>
                      <div className="grid grid-cols-1 gap-2.5">
                        {PAYMENT_OPTIONS.filter(p => p.group === group).map(opt => {
                          const active = selectedPayment === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setSelectedPayment(opt.id)}
                              className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                                active ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/40 hover:bg-muted/30"
                              }`}
                            >
                              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${active ? "bg-primary/10" : "bg-muted"}`}>
                                {opt.emoji}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-foreground text-sm">{opt.name}</p>
                                <p className="text-xs text-muted-foreground">{opt.sub}</p>
                              </div>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                active ? "border-primary bg-primary" : "border-muted-foreground/40"
                              }`}>
                                {active && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={() => setStep(2)}
                    className="flex items-center gap-2 border-2 border-border text-foreground font-bold px-7 py-3.5 rounded-2xl hover:bg-muted transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Kembali
                  </button>
                  <button onClick={handleCheckout}
                    className="flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-lg shadow-primary/20">
                    <ShoppingBag className="w-4 h-4" /> Buat Pesanan
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 lg:sticky lg:top-[140px]">
            <div className="bg-card rounded-3xl border border-border shadow-sm p-6">
              <h3 className="font-bold text-foreground text-base mb-5">Ringkasan Pesanan</h3>
              <div className="space-y-4 mb-5">
                {cart.slice(0, 3).map(item => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">{item.kg} kg × {rp(item.product.price)}</p>
                    </div>
                    <p className="text-sm font-bold text-foreground flex-shrink-0">{rp(item.product.price * item.kg)}</p>
                  </div>
                ))}
                {cart.length > 3 && (
                  <p className="text-xs text-muted-foreground text-center">+{cart.length - 3} produk lainnya</p>
                )}
              </div>

              <div className="border-t border-border pt-4 space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({cart.reduce((s, i) => s + i.kg, 0)} kg)</span>
                  <span className="font-semibold">{rp(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ongkos Kirim</span>
                  <span className={`font-semibold transition-colors ${step >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
                    {step >= 2 ? rp(shipping.cost) : "Pilih kurir"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Biaya Layanan</span>
                  <span className="font-semibold">{rp(serviceFee)}</span>
                </div>
              </div>

              <div className="border-t border-border mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-foreground">Total Pembayaran</span>
                  <span className="text-xl font-extrabold text-primary">{step >= 2 ? rp(totalPayment) : rp(subtotal + serviceFee)}</span>
                </div>
                {step >= 2 && (
                  <p className="text-xs text-muted-foreground mt-1 text-right">{shipping.name} · Est. {shipping.est}</p>
                )}
              </div>
            </div>

            <div className="bg-card rounded-3xl border border-border shadow-sm p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Fish className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Jaminan Seafood Segar</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">Ditangkap segar · Dikemas hati-hati · Kualitas terjamin</p>
                </div>
              </div>
              <div className="border-t border-border pt-4 flex items-start gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Pembayaran Aman</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">SSL Protected · 100% transaksi aman & terenkripsi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}