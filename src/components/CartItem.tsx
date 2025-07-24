"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { CartItem as CartItemType, formatPrice } from "@/lib/api";
import { TrashIcon } from "@heroicons/react/24/outline";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (
    itemId: number,
    newQuantity: number,
    token: string,
    clerk_user_id?: string
  ) => void;
  onRemove: (itemId: number, token?: string, clerk_user_id?: string) => void;
}

export default function CartItem({
  item,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const { getToken } = useAuth(); // ✅ get the token
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;

    setIsUpdating(true);
    try {
      const token = await getToken();
      const guestId =
        typeof window !== "undefined"
          ? sessionStorage.getItem("guest_id")
          : null;

      const clerk_user_id = token ? undefined : guestId;

      if (!token && !clerk_user_id) {
        throw new Error("No user identifier found");
      }

      onQuantityChange(item.id, newQuantity, token ?? "", clerk_user_id ?? "");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      const token = await getToken(); // Will be null for guests
      const guestId =
        typeof window !== "undefined"
          ? sessionStorage.getItem("guest_id")
          : null;

      const clerk_user_id = token ? undefined : guestId;

      if (!token && !clerk_user_id) {
        throw new Error("No user identifier found");
      }

      onRemove(item.id, token ?? "", clerk_user_id ?? "");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex justify-between items-center gap-4 p-4 bg-white rounded-lg shadow-sm border flex-wrap">
      {/* Left row: image, info, quantity, remove */}
      <div className="flex items-center flex-wrap gap-4 flex-1 min-w-0">
        {/* Image */}
        <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
          {item.product.image_url || item.product.image ? (
            <img
              src={item.product.image_url || item.product.image}
              alt={item.product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              No image
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-[120px]">
          <h3 className="text-lg font-semibold text-gray-900">
            {item.product.name}
          </h3>
          <p className="text-sm text-gray-500">Size: {item.variant?.size}</p>
          <p className="text-md font-bold text-gray-900 mt-1">
            {formatPrice(item.product.price)}
          </p>
        </div>

        {/* Quantity & Remove */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              -
            </button>
            <span className="px-3 py-1 text-gray-900 font-medium min-w-[2rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating || item.quantity >= item.variant.stock}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>

          <button
            onClick={handleRemove}
            disabled={isUpdating}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            title="Remove item"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right column: price summary */}
      <div className="flex flex-col text-right min-w-[100px]">
        <p className="text-sm text-gray-500">
          {formatPrice(item.product.price)} each
        </p>
        <p className="text-lg font-bold text-gray-900">
          {formatPrice(Number(item.product.price) * item.quantity)}
        </p>
      </div>
    </div>
  );
}
