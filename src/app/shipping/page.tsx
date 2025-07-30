export default function ShippingPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Shipping Information
        </h1>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Shipping Methods
            </h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Standard Shipping
                </h3>
                <p className="text-sm text-gray-600 mb-2">2-5 business days</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Processing Time
            </h2>
            <p>
              Orders are typically processed and shipped within 1-2 business
              days. You will receive a shipping confirmation email with tracking
              information once your order ships.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Shipping Destinations
            </h2>
            <p className="mb-4">We currently ship to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All 50 United States</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Tracking Your Order
            </h2>
            <p className="mb-4">
              Once your order ships, you will receive a tracking number via
              email. You can also track your order by logging into your account
              and viewing your order history.
            </p>
            <p>
              If you haven't received your tracking information within 3
              business days of placing your order, please contact us via email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Delivery Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Orders are delivered Monday through Friday</li>
              <li>
                Packages are left at your door unless signature is required
              </li>
              <li>
                We are not responsible for packages left at incorrect addresses
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Shipping Delays
            </h2>
            <p className="mb-4">
              While we strive to deliver your orders on time, shipping delays
              may occur due to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Weather conditions</li>
              <li>Holiday periods</li>
              <li>Carrier delays</li>
              <li>Incorrect or incomplete shipping addresses</li>
            </ul>
            <p className="mt-4">
              We will notify you of any significant delays and work to resolve
              them promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Address Accuracy
            </h2>
            <p>
              Please ensure your shipping address is complete and accurate. We
              are not responsible for packages delivered to incorrect addresses
              provided by customers. Additional shipping fees may apply for
              address corrections or re-shipping.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p>
              For shipping questions or concerns, please contact us at{" "}
              <a
                href="mailto:buddhabashajewelry@gmail.com"
                className="text-primary hover:underline"
              >
                buddhabashajewelry@gmail.com
              </a>{" "}
            </p>
          </section>

          <section>
            <p className="text-sm text-gray-600 mt-8">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
