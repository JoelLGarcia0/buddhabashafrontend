"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useCartStore } from "@/lib/store/useCartStore";

export default function Navbar() {
  const { cartCount } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-secondary shadow-sm border-b sticky top-0 z-50 border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo + Links */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                width={120}
                height={60}
                src="/images/buddahbashapng.png"
                alt="BuddhaBasha Logo"
                className="h-14 w-auto"
              />
              <span className="text-xl font-heading font-bold text-dark hidden sm:block">
                BuddhaBasha
              </span>
            </Link>
            <div className="ml-6 hidden sm:flex items-baseline space-x-0">
              <Link
                href="/"
                className="text-dark hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-dark hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Products
              </Link>
              <Link
                href="/contact"
                className="text-dark hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Contact Us
              </Link>
              <SignedIn>
                <Link
                  href="/orders"
                  className="text-dark hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Orders
                </Link>
              </SignedIn>
            </div>
          </div>

          {/* Cart + Auth */}
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="text-dark hover:text-primary p-2 rounded-md relative transition-transform duration-200 hover:-translate-y-0.5"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md ring-1 ring-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Desktop Buttons */}
            <SignedOut>
              <div className="hidden sm:flex gap-2">
                <SignInButton mode="modal">
                  <button className="bg-white text-black border text-sm px-3 py-2 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-primary text-white text-sm px-3 py-2 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            {/* Mobile Menu Button */}
            <SignedOut>
              <div className="sm:hidden relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2 rounded-md border bg-white shadow-sm"
                >
                  {menuOpen ? (
                    <XMarkIcon className="h-5 w-5" />
                  ) : (
                    <Bars3Icon className="h-5 w-5" />
                  )}
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-44  bg-white border rounded-md shadow-lg p-4 z-50 space-y-4">
                    <Link
                      href="/"
                      onClick={() => setMenuOpen(false)}
                      className="block text-sm px-3 py-2 rounded-md hover:bg-gray-100 text-dark"
                    >
                      Home
                    </Link>
                    <Link
                      href="/products"
                      onClick={() => setMenuOpen(false)}
                      className="block text-sm px-3 py-2 rounded-md hover:bg-gray-100 text-dark"
                    >
                      Products
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setMenuOpen(false)}
                      className="block text-sm px-3 py-2 rounded-md hover:bg-gray-100 text-dark"
                    >
                      Contact Us
                    </Link>
                    <SignInButton mode="modal">
                      <button
                        onClick={() => setMenuOpen(false)}
                        className="w-full bg-white text-black border text-sm px-3 py-2 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                      >
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button
                        onClick={() => setMenuOpen(false)}
                        className="w-full bg-primary text-white text-sm px-3 py-2 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                      >
                        Sign Up
                      </button>
                    </SignUpButton>
                  </div>
                )}
              </div>
            </SignedOut>

            {/* Always show UserButton when signed in */}
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
