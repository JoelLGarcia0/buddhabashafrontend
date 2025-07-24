import Link from "next/link";
import { XCircleIcon } from "@heroicons/react/24/outline";

export default function CancelPage() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-lg shadow-md p-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircleIcon className="w-8 h-8 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Order Cancelled
        </h1>

        <p className="text-md text-gray-600 mb-8">
          Your order was cancelled. No charges were made to your account. Your
          cart items are still available if you'd like to try again.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Need Help?
          </h2>
          <p className="text-gray-600 mb-4">
            If you encountered any issues during checkout, please don't hesitate
            to contact our support team.
          </p>
          <p className="text-sm text-gray-500">
            Email: support@buddhabasha.com
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/cart"
            className="inline-flex items-center justify-center  bg-primary text-white px-6 py-4 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Return to Cart
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center  bg-white text-black px-6 py-4 border rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
