"use client";

import { useState, useEffect } from "react";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import {
  getCartItems,
  createCheckoutSession,
  calculateTotal,
  formatPrice,
  getEffectiveUserId,
} from "@/lib/api";
import { CartItem, saveUserProfile, getUserProfile } from "@/lib/api";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function CheckoutPage() {
  const { isSignedIn, userId, getToken } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [address, setAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postal_code: "",
    country: "US",
    name: "",
  });
  const [clerkEmail, setClerkEmail] = useState("");
  const [savedAddress, setSavedAddress] = useState<
    (typeof address & { first_name?: string; last_name?: string }) | null
  >(null);

  const { user } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saveProfile, setSaveProfile] = useState(false);

  const isFormValid =
    email.trim() !== "" &&
    address.line1.trim() !== "" &&
    address.city.trim() !== "" &&
    address.state.trim() !== "" &&
    address.postal_code.trim() !== "";

  useEffect(() => {
    loadCartItems();
    prefillProfile();

    if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      setEmail(user.primaryEmailAddress.emailAddress); // can edit
      setClerkEmail(user.primaryEmailAddress.emailAddress); // locked for backend
    }
  }, [isSignedIn, userId, user]);

  const prefillProfile = async () => {
    if (!isSignedIn || !userId) return;
    try {
      const token = await getToken();
      if (!token) return;
      const profile = await getUserProfile(userId, token);
      if (profile) {
        setSavedAddress({
          ...profile.shipping_address,
          first_name: profile.first_name,
          last_name: profile.last_name,
        });
      }
    } catch (err) {
      console.warn("No saved profile or failed to fetch", err);
    }
  };

  const loadCartItems = async () => {
    setIsLoading(true);
    try {
      let token: string | undefined;
      let id: string | undefined;

      if (isSignedIn && userId) {
        token = (await getToken()) ?? undefined;
        if (!token) throw new Error("Missing Auth Token");
        id = userId;
      } else {
        // 👇 Handle guest users
        id = getEffectiveUserId();
      }

      const items = await getCartItems(id, token);
      setCartItems(items);
    } catch (error) {
      console.error("Failed to load cart items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartItems.length || !email) return;

    setIsProcessing(true);
    try {
      const items = cartItems.map((item) => ({
        variant: item.variant.id,
        quantity: item.quantity,
      }));

      let token: string | undefined;
      let user_id: string | undefined;

      if (isSignedIn && userId) {
        token = (await getToken()) ?? undefined;
        if (!token) throw new Error("Missing Clerk token");
        user_id = userId;

        if (saveProfile) {
          await saveUserProfile(
            {
              clerk_user_id: userId,
              email: clerkEmail,
              first_name: firstName,
              last_name: lastName,
              shipping_address: {
                ...address,
                name: `${firstName} ${lastName}`.trim(),
              },
            },
            token
          );
        }
      } else {
        // Handle guest user
        user_id = getEffectiveUserId();
      }

      const session = await createCheckoutSession(
        items,
        email,
        user_id,
        token,
        {
          ...address,
          name: `${firstName} ${lastName}`, // Add name inside shipping_address
        },
        firstName,
        lastName
      );

      window.location.href = session.checkout_url;
    } catch (error) {
      console.error("Checkout error:", error);

      alert("Checkout failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  const total = calculateTotal(cartItems);
  const flatShipping = 5.0;
  const orderTotal = total + flatShipping;

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dark mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading checkout...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-md p-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-6">
            Add some items to your cart before checking out.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center  bg-primary text-white px-6 py-4 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/cart"
          className="inline-flex items-center text-sm text-primary hover:underline cursor-pointer mb-4 font-medium "
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Checkout Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

          <form onSubmit={handleCheckout} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-dark focus:border-transparent"
                placeholder="your@email.com"
              />
              <p className="text-xs text-gray-500 mt-2">
                {isSignedIn ? (
                  <>
                    This email will be used to send your order confirmation.
                    Your account email (<strong>{clerkEmail}</strong>) will not
                    be changed.
                  </>
                ) : (
                  <>We'll send your order confirmation to this email address.</>
                )}
              </p>
            </div>

            {isSignedIn && savedAddress && (
              <div className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                <p className="text-sm text-gray-700 mb-2">
                  You have a saved shipping address:
                </p>
                <div className="text-sm text-gray-600 leading-tight">
                  {savedAddress.first_name || savedAddress.last_name ? (
                    <p>
                      {savedAddress.first_name} {savedAddress.last_name}
                    </p>
                  ) : (
                    savedAddress.name && <p>{savedAddress.name}</p>
                  )}
                  <p>{savedAddress.line1}</p>
                  <p>
                    {savedAddress.city}, {savedAddress.state}{" "}
                    {savedAddress.postal_code}
                  </p>
                  <p>{savedAddress.country}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setAddress(savedAddress);
                    if (savedAddress.first_name)
                      setFirstName(savedAddress.first_name);
                    if (savedAddress.last_name)
                      setLastName(savedAddress.last_name);
                  }}
                  className="mt-3 inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-white rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300  ease-in-out cursor-pointer"
                >
                  Use this address
                </button>
              </div>
            )}
            {/* Shipping Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Address:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-dark focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-dark focus:border-transparent"
                  />
                </div>

                {/* Street Address */}
                <div>
                  <label
                    htmlFor="line1"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Street Address
                  </label>
                  <input
                    id="street1"
                    type="text"
                    placeholder="Street Address"
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-dark focus:border-transparent"
                    value={address.line1}
                    onChange={(e) =>
                      setAddress({ ...address, line1: e.target.value })
                    }
                    required
                  />
                </div>

                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="City"
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-dark focus:border-transparent"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    required
                  />
                </div>

                {/* State */}
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    placeholder="State"
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-dark focus:border-transparent"
                    value={address.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                    required
                  />
                </div>

                {/* ZIP Code */}
                <div>
                  <label
                    htmlFor="postal_code"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ZIP Code
                  </label>
                  <input
                    id="zip"
                    type="text"
                    placeholder="ZIP Code"
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-dark focus:border-transparent"
                    value={address.postal_code}
                    onChange={(e) =>
                      setAddress({ ...address, postal_code: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {isSignedIn && (
              <div className="flex items-center mt-4">
                <input
                  id="saveProfile"
                  type="checkbox"
                  checked={saveProfile}
                  onChange={(e) => setSaveProfile(e.target.checked)}
                  className="h-4 w-4 text-dark border-gray-300 rounded"
                />
                <label
                  htmlFor="saveProfile"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Save this shipping info for next time
                </label>
              </div>
            )}
            <button
              type="submit"
              disabled={isProcessing || !isFormValid}
              className="w-full bg-primary font-semi text-white px-6 py-4 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center block cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : "Proceed to Payment"}
            </button>
          </form>

          {!isSignedIn && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-dark">
                <strong>Guest Checkout:</strong> You're checking out as a guest.{" "}
                <SignInButton mode="modal">
                  <button className="text-primary font-semibold hover:underline">
                    Sign in
                  </button>
                </SignInButton>{" "}
                to save your order history and get faster checkout next time.
              </p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Order Summary
          </h2>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                  {item.product.image_url || item.product.image ? (
                    <img
                      src={item.product.image_url || item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full flex items-center justify-center text-gray-400 text-xs ${
                      item.product.image_url || item.product.image
                        ? "hidden"
                        : ""
                    }`}
                  >
                    No image
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-500">
                    Size: {item.variant?.size}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatPrice(Number(item.product.price) * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">${flatShipping.toFixed(2)}</span>
            </div>

            <div className="border-t pt-2 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
