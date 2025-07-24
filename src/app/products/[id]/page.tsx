"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import {
  getProductById,
  addToCart,
  getCartItems,
  formatPrice,
  Product,
  ProductVariant,
  getEffectiveUserId,
} from "@/lib/api";
import { useCartStore } from "@/lib/store/useCartStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ProductPageCarousel from "@/components/ui/ProductPageCarousel";
import ProductDetailsTabs from "@/components/ProductDetailsTab";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { getToken } = useAuth();
  const { setCartData } = useCartStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);
  const [variantInCartQty, setVariantInCartQty] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id as string);
        console.log("Fetched product:", data); // 🐛 Debug entire product
        console.log("Product Images:", data.images);
        setProduct(data);
        if (data.variants?.length) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (error) {
        console.error("Error loading product", error);
      }
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchVariantCartQty = async () => {
      const token = (await getToken()) ?? undefined;
      let userId: string;

      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        userId = payload.sub;
      } else {
        userId = getEffectiveUserId();
      }

      if (!selectedVariant) return;

      const cartItems = await getCartItems(userId, token);
      const item = cartItems.find((i) => i.variant.id === selectedVariant.id);
      setVariantInCartQty(item?.quantity || 0);
    };
    fetchVariantCartQty();
  }, [selectedVariant]);

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) {
      toast.error("Please select a size");
      return;
    }

    const remaining = selectedVariant.stock - variantInCartQty;
    if (quantity > remaining) {
      toast.error("You've already added the maximum available stock.");
      return;
    }

    setIsLoading(true);
    try {
      const token = (await getToken()) ?? undefined;

      let userId: string;
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        userId = payload.sub; // Clerk user ID
      } else {
        userId = getEffectiveUserId();
      }

      await addToCart(selectedVariant.id, quantity, userId, token);

      setVariantInCartQty((prev) => prev + quantity);
      const updatedCart = await getCartItems(userId, token);
      setCartData(updatedCart);
      toast.success("Added to cart!");
    } catch (err) {
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) return <p className="text-center p-10">Loading...</p>;

  const availableQty = selectedVariant
    ? selectedVariant.stock - variantInCartQty
    : 0;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button
        onClick={() => router.push("/products")}
        className="text-sm text-primary hover:underline cursor-pointer mb-4 font-medium inline-block"
      >
        ← Back to All Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ProductPageCarousel
            mainImage={product.image || "/placeholder.jpg"}
            additionalImages={product.images || []}
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-800">{formatPrice(product.price)}</p>
          <ProductDetailsTabs description={product.description} />

          {/* Size Selection */}
          <div className="mb-4 mt-2">
            <label className="block text-sm font-medium mb-1">Size</label>
            <div className="flex flex-wrap gap-2">
              {product.variants?.map((variant) => {
                const itemInCart = product.variants
                  ? product.variants.find((v) => v.id === variant.id)
                  : null;

                // Pull quantity for this variant from global cart (optional optimization)
                const cartItems = useCartStore.getState().cartItems || [];
                const cartQtyForVariant =
                  cartItems.find((i) => i.variant.id === variant.id)
                    ?.quantity || 0;

                const availableForVariant = variant.stock - cartQtyForVariant;
                const isDisabled = availableForVariant <= 0;
                const isSelected = selectedVariant?.id === variant.id;

                return (
                  <button
                    key={variant.id}
                    onClick={() => {
                      setSelectedVariant(variant);
                      setQuantity(1);
                    }}
                    disabled={isDisabled}
                    className={`
                    px-3 py-1 border rounded transition text-sm
                    ${
                      isDisabled
                        ? "opacity-50 cursor-not-allowed bg-white"
                        : "cursor-pointer"
                    }
                    ${
                      isSelected && !isDisabled
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700"
                    }
                  `}
                  >
                    <span
                      className={isDisabled ? "line-through text-gray-400" : ""}
                    >
                      {variant.size}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selection */}
          {availableQty > 0 && (
            <div className="mb-4">
              <label className="block text-sm mb-1">
                Quantity (Available: {availableQty})
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded px-3 py-2"
              >
                {Array.from(
                  { length: Math.min(10, availableQty) },
                  (_, i) => i + 1
                ).map((qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant || availableQty === 0 || isLoading}
            className="w-full   bg-primary text-white px-6 py-4 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:"
          >
            {isLoading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
