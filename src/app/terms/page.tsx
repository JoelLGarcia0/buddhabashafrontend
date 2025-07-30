export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Terms of Service
        </h1>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using BuddhaBashaJewelry.com, you accept and
              agree to be bound by the terms and provision of this agreement. If
              you do not agree to abide by the above, please do not use this
              service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Use License
            </h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on BuddhaBasha's website for
              personal, non-commercial transitory viewing only.
            </p>
            <p className="mb-4">
              This is the grant of a license, not a transfer of title, and under
              this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or for any public
                display
              </li>
              <li>
                Attempt to reverse engineer any software contained on the
                website
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Product Information
            </h2>
            <p className="mb-4">
              We strive to display our products as accurately as possible.
              However, we do not warrant that product descriptions, colors,
              information, or other content available on the site is accurate,
              complete, reliable, current, or error-free.
            </p>
            <p>
              Product images are representative and may vary from actual
              products. We reserve the right to modify or discontinue any
              product without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Pricing and Payment
            </h2>
            <p className="mb-4">
              All prices are subject to change without notice. We reserve the
              right to modify or discontinue any product or service at any time.
            </p>
            <p>
              Payment is processed securely through Stripe. By making a
              purchase, you authorize us to charge your payment method for the
              total amount of your order.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. User Accounts
            </h2>
            <p className="mb-4">
              When you create an account with us, you must provide accurate and
              complete information. You are responsible for safeguarding the
              password and for all activities that occur under your account.
            </p>
            <p>
              You agree not to use the service to transmit any material that is
              defamatory, offensive, or otherwise objectionable, or that
              infringes on the rights of others.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Limitation of Liability
            </h2>
            <p>
              In no event shall BuddhaBasha Jewelry or its suppliers be liable
              for any damages (including, without limitation, damages for loss
              of data or profit, or due to business interruption) arising out of
              the use or inability to use the materials on our website, even if
              we or our authorized representative has been notified orally or in
              writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Disclaimer
            </h2>
            <p>
              The materials on BuddhaBasha Jewelry's website are provided on an
              'as is' basis. BuddhaBasha Jewelry makes no warranties, expressed
              or implied, and hereby disclaims and negates all other warranties
              including without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Privacy Policy
            </h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy,
              which also governs your use of the website, to understand our
              practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              9. Governing Law
            </h2>
            <p>
              These terms and conditions are governed by and construed in
              accordance with the laws of the United States and you irrevocably
              submit to the exclusive jurisdiction of the courts in that
              location.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              10. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms of service at any time.
              We will notify users of any material changes by posting the new
              terms on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              11. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us at{" "}
              <a
                href="mailto:buddhabashajewelry@gmail.com"
                className="text-primary hover:underline"
              >
                buddhabashajewelry@gmail.com
              </a>
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
