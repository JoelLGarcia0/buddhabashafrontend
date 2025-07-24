import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";
import CartInitializer from "@/components/layout/CartInitializer";
import Footer from "@/components/layout/Footer";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BuddhaBasha - Handcrafted Jewelry",
  description: "Discover beautiful handcrafted jewelry at BuddhaBasha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${playfair.variable} antialiased bg-lightgray`}
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CartInitializer />
                {children}
                <Toaster position="bottom-right" />
              </div>
            </main>

            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
