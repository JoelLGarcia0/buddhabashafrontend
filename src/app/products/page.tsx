"use client";

import { useState, useEffect } from "react";
import { getProducts, getCategories, getEffectiveUserId } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { Product, Category } from "@/lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    if (categoryId === null) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category.id === categoryId)
      );
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Our Collection
        </h1>
        <p className="text-lg text-text max-w-2xl mx-auto">
          Discover our handcrafted jewelry pieces, each telling a unique story
          and crafted with love and attention to detail.
        </p>
      </div>

      {/* Categories Filter */}
      {categories.length > 0 && (
        <div className="bg-secondary rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategorySelect(null)}
              className={`px-3 py-1 rounded-full cursor-pointer text-sm ${
                selectedCategory === null
                  ? "bg-primary text-white"
                  : "bg-light text-dark"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`px-3 py-1 rounded-full cursor-pointer text-sm ${
                  selectedCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-light text-black"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Products ({filteredProducts.length})
          </h2>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
