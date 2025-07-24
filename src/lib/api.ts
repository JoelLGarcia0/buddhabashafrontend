import { User } from "@clerk/nextjs/server";

const API_BASE_URL = "http://localhost:8000/store";

// Types

export interface UserProfile {
  clerk_user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  shipping_address: Address;
}

export interface ProductImage {
  id: number;
  image: string;
  alt_text?: string;
}

export interface ProductVariant {
  id: number;
  size: string;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number | string;
  image?: string;
  image_url?: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface CartItem {
  id: number;
  variant: ProductVariant;
  quantity: number;
  product: Product;
}

export interface Cart {
  id: number;
  clerk_user_id: string;
  items: CartItem[];
  total: number;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  status: string;
  created_at: string;
  clerk_user_id: string;
  email?: string;
  is_guest: boolean;

  shipping_cost?: number | string;

  shipping_address?: {
    line1?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    name?: string;
  };

  is_shipped?: boolean;
  shipping_provider?: string;
  shipping_service?: string;
  tracking_number?: string;
  shipping_label_url?: string;
  shipped_at?: string;

  first_name?: string;
  last_name?: string;
}

export interface CheckoutSession {
  checkout_url: string;
}

export interface Address {
  name: string;
  line1: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface ShippingRate {
  object_id: string;
  provider: string;
  servicelevel: {
    name: string;
  };
  amount: string;
  estimated_days?: number;
  duration_terms?: string;
  currency: string;
}

export function buildToAddress(
  name: string,
  line1: string,
  city: string,
  state: string,
  postal_code: string,
  country = "US"
): Address {
  return {
    name,
    line1,
    city,
    state,
    postal_code,
    country,
  };
}

// Products & Categories (Public) - Can be used in client components
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products/`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}
export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}/`);
  if (!res.ok) {
    throw new Error("Failed to fetch product details");
  }
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/categories/`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
}

// Cart operations that require authentication - Client-side with clerk_user_id
export async function getCart(
  clerk_user_id?: string,
  token?: string
): Promise<Cart | null> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE_URL}/cart/?clerk_user_id=${clerk_user_id ?? ""}`,
    {
      headers,
    }
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Failed to fetch cart");
  return response.json();
}

export async function addToCart(
  variantId: number,
  quantity: number,
  clerk_user_id?: string,
  token?: string
): Promise<CartItem> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const body = {
    variant: variantId,
    quantity,
    ...(clerk_user_id && { clerk_user_id }),
  };
  console.log("Sending to /cart-items/:", body);

  const response = await fetch(`${API_BASE_URL}/cart-items/`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Cart API error:", errorText);
    throw new Error(
      `Failed to add item to cart: ${response.status} ${errorText}`
    );
  }

  const result = await response.json();
  return result;
}

export async function getCartItems(
  clerk_user_id?: string,
  token?: string
): Promise<CartItem[]> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE_URL}/cart-items/?clerk_user_id=${clerk_user_id ?? ""}`,
    { headers }
  );

  if (!response.ok) throw new Error("Failed to fetch cart items");
  return response.json();
}

export async function cleanCartStock(
  clerk_user_id: string,
  token?: string
): Promise<{ message: string; updates: any[] }> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/clean-cart-stock/`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ clerk_user_id }),
    }
  );

  if (response.status === 404) {
    return { message: "No cart found", updates: [] };
  }

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to clean cart: ${error}`);
  }

  return response.json();
}

export async function updateCartItemQuantity(
  itemId: number,
  newQuantity: number,
  token?: string,
  clerk_user_id?: string
): Promise<void> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const url = `${API_BASE_URL}/cart-items/${itemId}/?clerk_user_id=${
    clerk_user_id ?? ""
  }`;

  const res = await fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ quantity: newQuantity }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to update item: ${error}`);
  }
}

export async function removeCartItem(
  itemId: number,
  token?: string,
  clerk_user_id?: string
): Promise<void> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const url = `${API_BASE_URL}/cart-items/${itemId}/?clerk_user_id=${
    clerk_user_id ?? ""
  }`;

  const res = await fetch(url, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to remove item: ${error}`);
  }
}

// Orders (Auth Required) - Client-side with clerk_user_id parameter
export async function getOrders(
  clerk_user_id?: string,
  token?: string
): Promise<Order[]> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE_URL}/orders/?clerk_user_id=${clerk_user_id}`,
    { headers }
  );
  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
}

// Stripe checkout session
export async function createCheckoutSession(
  items: { variant: number; quantity: number }[],
  email: string,
  clerk_user_id?: string,
  token?: string,
  shipping_address?: Address,
  first_name?: string,
  last_name?: string
): Promise<CheckoutSession> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}/create-checkout-session/`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      items,
      email,
      clerk_user_id,
      shipping_address,
      first_name,
      last_name,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create checkout session: ${error}`);
  }

  return response.json();
}

export function getEffectiveUserId(): string {
  if (typeof window === "undefined") return "";
  let guestId = sessionStorage.getItem("guest_id");
  if (!guestId) {
    guestId = `guest_${crypto.randomUUID()}`;
    sessionStorage.setItem("guest_id", guestId);
  }
  return guestId;
}

// User Profile requests

export async function saveUserProfile(
  profile: UserProfile,
  token?: string
): Promise<UserProfile> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  console.log("Sending user profile to backend:", profile);

  const response = await fetch(`${API_BASE_URL}/user-profile/`, {
    method: "POST",
    headers,
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Error saving profile:", error);
    throw new Error("Failed to save user profile");
  }

  return await response.json();
}

export async function getUserProfile(
  clerk_user_id: string,
  token?: string
): Promise<UserProfile | null> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(
    `${API_BASE_URL}/user-profile/${clerk_user_id}/`,
    { headers }
  );

  if (!response.ok) {
    const error = await response.text();

    if (response.status === 404 || error.includes("User profile not found")) {
      console.log("ℹ️ No user profile yet — that's okay");
      return null;
    }

    console.error("❌ Error getting profile:", error);
    throw new Error("Failed to fetch user profile");
  }

  return await response.json();
}

// Helper function for safe price formatting
export function formatPrice(price: number | string): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return isNaN(numPrice) ? "$0.00" : `$${numPrice.toFixed(2)}`;
}

// Helper function for calculating totals
export function calculateTotal(
  items: { product: { price: number | string }; quantity: number }[]
): number {
  return items.reduce((sum, item) => {
    const price =
      typeof item.product.price === "string"
        ? parseFloat(item.product.price)
        : item.product.price;
    return sum + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);
}
