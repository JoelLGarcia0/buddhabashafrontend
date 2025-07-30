export default function ReturnPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Return & Refund Policy
        </h1>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Return Window
            </h2>
            <p>
              We accept returns within <strong>30 days</strong> of the original
              purchase date. Items must be returned in their original condition,
              unworn, and with all original packaging.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What Can Be Returned
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All jewelry items in original, unworn condition</li>
              <li>Items with original packaging and tags</li>
              <li>Items that have not been altered or damaged</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What Cannot Be Returned
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Items that have been worn, damaged, or altered</li>
              <li>Items without original packaging or tags</li>
              <li>Custom or personalized items</li>
              <li>Sale or clearance items (unless defective)</li>
              <li>Items purchased more than 30 days ago</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              How to Return
            </h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contact us via email within 30 days of purchase</li>
              <li>Provide your order number and reason for return</li>
              <li>We will provide you with a return shipping label</li>
              <li>Package the item securely with all original materials</li>
              <li>Ship the item back using the provided label</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Refund Process
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Refunds will be processed within 5-7 business days of receiving
                your return
              </li>
              <li>Original shipping costs are non-refundable</li>
              <li>
                Return shipping costs are the responsibility of the customer
              </li>
              <li>Refunds will be issued to the original payment method</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Damaged or Defective Items
            </h2>
            <p>
              If you receive a damaged or defective item, please contact us
              immediately. We will provide a prepaid return label and process a
              full refund including shipping costs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p>
              For return inquiries, please contact us at{" "}
              <a
                href="mailto:buddhabashajewelry@gmail.com"
                className="text-primary hover:underline"
              >
                buddhabashajewelry@gmail.com
              </a>{" "}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Important Notes
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All returns must be initiated within 30 days of purchase</li>
              <li>Items must be in original, unworn condition</li>
              <li>
                We reserve the right to refuse returns that don&apos;t meet our
                policy
              </li>
              <li>This policy does not affect your statutory rights</li>
            </ul>
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
