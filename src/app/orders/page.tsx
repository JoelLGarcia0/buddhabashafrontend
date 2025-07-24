"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { getOrders } from "@/lib/api";
import { Order } from "@/lib/api";
import OrderCard from "@/components/OrderCard";

export default function OrdersPage() {
  const { isSignedIn, userId, getToken } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn && userId) {
      loadOrders();
    } else {
      setIsLoading(false);
    }
  }, [isSignedIn, userId]);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      if (isSignedIn && userId) {
        const token = await getToken();
        if (!token) {
          console.warn("Missing token in orders page");
          return;
        }

        const ordersData = await getOrders(userId, token);
        setOrders(ordersData);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
      setError("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="max-w-5xl mx-auto text-center py-12 px-4">
        <div className="bg-white rounded-lg shadow-sm p-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Sign in to view orders
          </h1>
          <p className="text-gray-600">
            You need to be signed in to view your order history.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 space-y-8 py-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Orders</h1>
        <p className="text-lg mb-2 text-gray-600">
          Track your past orders and their status
        </p>
      </div>

      {error ? (
        <div className="w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="w-full bg-white rounded-lg shadow-sm p-12 text-center">
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No orders yet
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping to see your
              order history here.
            </p>
            <a
              href="/products"
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              Start Shopping
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          {[...orders]
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((order) => (
              <div key={order.id} className="w-full max-w-3xl">
                <OrderCard order={order} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
