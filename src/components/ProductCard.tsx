"use client";

import Link from "next/link";
import { Product, formatPrice } from "@/lib/api";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className="aspect-square bg-gray-200 relative">
          <img
            src={
              product.image_url ||
              product.images?.[0]?.image ||
              "/placeholder.jpg"
            }
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.nextElementSibling?.classList.remove("hidden");
            }}
          />
          <div
            className={`w-full h-full flex items-center justify-center text-gray-400 ${
              product.image_url || product.images?.[0]?.image ? "hidden" : ""
            }`}
          >
            <span>No image</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>

          <p className="text-lg font-medium text-gray-900 mt-2">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
