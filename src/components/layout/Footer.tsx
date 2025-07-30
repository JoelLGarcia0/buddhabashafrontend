import React from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-secondary border-t border-light mt-4 py-4">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6">
          {/* Company Info */}

          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-black">
              Buddha Basha Jewelry
            </h3>
            <p className="text-xs text-gray-600">
              Handcrafted jewelry for the mindful soul.
            </p>
            <a
              href="https://instagram.com/buddhabashajewelry"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-xs text-gray-600 hover:text-primary transition"
            >
              <FaInstagram className="mr-1 w-5 h-5 text-dark" />
              @buddhabashajewelry
            </a>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-black">
              Customer Service
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-black">Legal</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-black">Account</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/orders"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-black text-xs">
            © {new Date().getFullYear()} Buddha Basha Jewelry. All Rights
            Reserved.
          </p>
          <p className="text-xs text-gray-600">
            Website by{" "}
            <a
              className="font-medium hover:text-primary transition-colors"
              href="https://restweb.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              RESTWeb.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
