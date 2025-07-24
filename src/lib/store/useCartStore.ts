import { create } from "zustand";
import { CartItem } from "../api";

type CartStore = {
  cartItems: CartItem[];
  cartCount: number;
  setCartData: (items: CartItem[]) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  cartCount: 0,
  setCartData: (items) =>
    set({
      cartItems: items,
      cartCount: items.reduce((sum, item) => sum + item.quantity, 0),
    }),
  clearCart: () => set({ cartItems: [], cartCount: 0 }),
}));
