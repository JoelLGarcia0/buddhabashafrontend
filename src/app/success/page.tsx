import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function SuccessPage() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-lg shadow-md p-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon className="w-8 h-8 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Thank You for Your Order!
        </h1>

        <p className="text-md text-gray-600 mb-8">
          Your order has been successfully placed. We&apos;ll send you a
          confirmation email with your order details and tracking information.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            What&apos;s Next?
          </h2>
          <ul className="text-left text-sm text-dark space-y-2">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-dark rounded-full mt-2 mr-3 flex-shrink-0"></span>
              You&apos;ll receive an order confirmation email shortly
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-dark rounded-full mt-2 mr-3 flex-shrink-0"></span>
              We&apos;ll notify you when your order ships
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-dark rounded-full mt-2 mr-3 flex-shrink-0"></span>
              If you checked out as a guest, you can create an account with the
              same email to view your order history
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/orders"
            className="inline-flex items-center justify-center  bg-primary text-white px-6 py-4 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            View Orders
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-white text-black px-6 py-4 border rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
