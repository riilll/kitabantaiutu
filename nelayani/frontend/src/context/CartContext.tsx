import { createContext, useState, useContext } from "react";
import { CartItem, Product } from "../types";
import { useAuthContext } from "./AuthContext";

interface CartContextValue {
  cart: CartItem[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: number) => void;
  updateKg: (id: number, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
  onRequireAuth,
}: {
  children: React.ReactNode;
  onRequireAuth: () => void;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { isGuest } = useAuthContext();

  const addToCart = (p: Product) => {
    if (isGuest) { onRequireAuth(); return; }
    setCart(prev => {
      const exists = prev.find(i => i.product.id === p.id);
      return exists
        ? prev.map(i => i.product.id === p.id ? { ...i, kg: i.kg + 1 } : i)
        : [...prev, { product: p, kg: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.product.id !== id));

  const updateKg = (id: number, delta: number) =>
    setCart(prev => prev.map(i => i.product.id === id ? { ...i, kg: Math.max(1, i.kg + delta) } : i));

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, i) => s + i.kg, 0);
  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.kg, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateKg, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
}
