"use client";

import { useState, useEffect } from "react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import {
  getCart,
  getCartItems,
  calculateTotal,
  getEffectiveUserId,
  updateCartItemQuantity,
  removeCartItem,
  cleanCartStock,
} from "@/lib/api";
import CartItem from "@/components/CartItem";
import { CartItem as CartItemType } from "@/lib/api";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store/useCartStore";

export default function CartPage() {
  const { isSignedIn, userId, getToken } = useAuth();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setCartData } = useCartStore();

  useEffect(() => {
    loadCart();
  }, [isSignedIn, userId]);

  const loadCart = async () => {
    setIsLoading(true);
    try {
      let user_id: string | undefined;
      let token: string | undefined;

      if (isSignedIn && userId) {
        user_id = userId;
        token = (await getToken()) ?? undefined;
      } else {
        user_id = isSignedIn && userId ? userId : getEffectiveUserId();
      }

      await cleanCartStock(user_id, token);

      const [, itemsData] = await Promise.all([
        getCart(user_id, token),
        getCartItems(user_id, token),
      ]);

      setCartItems(itemsData);
      setCartData(itemsData);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = async (
    itemId: number,
    newQuantity: number,
    token: string,
    clerk_user_id?: string
  ) => {
    try {
      await updateCartItemQuantity(itemId, newQuantity, token, clerk_user_id);
      await loadCart();
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const handleRemoveItem = async (
    itemId: number,
    token?: string,
    clerk_user_id?: string
  ) => {
    try {
      await removeCartItem(itemId, token, clerk_user_id);
      toast.success("Item removed from cart");
      await loadCart();
    } catch (error) {
      console.error("Failed to remove item", error);
      toast.error("Could not remove item from cart");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your cart...</p>
      </div>
    );
  }

  const total = calculateTotal(cartItems);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart</h1>
        <p className="text-lg text-gray-600">
          Review your items and proceed to checkout
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-4 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              Start Shopping
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 sm:items-center space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-primary font-semi text-white px-6 py-4 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center block"
              >
                Proceed to Checkout
              </Link>

              {!isSignedIn && (
                <p className="text-sm text-gray-500 mt-3 text-center">
                  You can checkout as a guest or{" "}
                  <SignInButton mode="modal">
                    <button className="text-primary font-semibold hover:underline">
                      sign in
                    </button>
                  </SignInButton>{" "}
                  to save your cart.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
