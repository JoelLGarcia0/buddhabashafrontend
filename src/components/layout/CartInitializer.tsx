// components/CartInitializer.tsx
"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { getCartItems, getEffectiveUserId } from "@/lib/api";
import { useCartStore } from "@/lib/store/useCartStore";

export default function CartInitializer() {
  const { isSignedIn, userId, getToken } = useAuth();
  const { setCartData } = useCartStore();

  useEffect(() => {
    async function loadCartCount() {
      try {
        const id = isSignedIn && userId ? userId : getEffectiveUserId();
        const token = isSignedIn ? await getToken() : undefined;

        const items = await getCartItems(id, token ?? undefined);
        setCartData(items);
      } catch (error) {
        console.error("Failed to load cart count globally", error);
      }
    }

    loadCartCount();
  }, [isSignedIn, userId, getToken, setCartData]);

  return null;
}
