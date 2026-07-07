import { ShoppingCart, Minus, Plus, X, CreditCard } from "lucide-react";
import { useNavigationContext } from "../../context/NavigationContext";
import { useCartContext } from "../../context/CartContext";
import { BackButton } from "../../components/common/BackButton";
import { rp } from "../../utils";

export function CartPage() {
  const { navigate } = useNavigationContext();
  const { cart, removeFromCart, updateKg, cartTotal } = useCartContext();

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <BackButton onClick={() => navigate("products")} />
        <h1 className="text-3xl font-extrabold text-foreground mb-8 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-primary" /> Keranjang <span className="text-lg font-normal text-muted-foreground">({cart.length} item)</span>
        </h1>
        {cart.length === 0 ? (
          <div className="py-24 text-center bg-card rounded-3xl border border-border">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
            <p className="text-xl font-bold mb-2">Keranjang kosong</p>
            <p className="text-muted-foreground mb-6">Jelajahi tangkapan hari ini dan tambahkan seafood segar!</p>
            <button onClick={() => navigate("products")} className="bg-primary text-white font-bold px-8 py-3 rounded-2xl hover:bg-primary/90 transition-colors">Jelajahi Tangkapan</button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.product.id} className="bg-card rounded-2xl border border-border p-5 flex gap-4">
                  <div className="w-24 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.product.location}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-muted rounded-xl p-0.5">
                        <button onClick={() => updateKg(item.product.id, -1)} className="w-7 h-7 rounded-lg bg-card flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Minus className="w-3 h-3" /></button>
                        <span className="w-8 text-center text-sm font-bold">{item.kg}kg</span>
                        <button onClick={() => updateKg(item.product.id, 1)} className="w-7 h-7 rounded-lg bg-card flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Plus className="w-3 h-3" /></button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold">{rp(item.product.price * item.kg)}</span>
                        <button onClick={() => removeFromCart(item.product.id)} className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors text-muted-foreground"><X className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-card rounded-3xl border border-border p-6 h-fit">
              <h3 className="font-bold text-lg mb-5">Ringkasan Pesanan</h3>
              <div className="space-y-3 mb-5">
                {cart.map(i => <div key={i.product.id} className="flex justify-between text-sm"><span className="text-muted-foreground">{i.product.name} ({i.kg}kg)</span><span className="font-semibold">{rp(i.product.price * i.kg)}</span></div>)}
              </div>
              <div className="border-t border-border pt-4 mb-5">
                <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Ongkos Kirim</span><span className="text-emerald-600 font-semibold">Gratis</span></div>
                <div className="flex justify-between font-extrabold text-xl"><span>Total</span><span className="text-primary">{rp(cartTotal)}</span></div>
              </div>
              <button onClick={() => navigate("checkout")} className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" /> Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
