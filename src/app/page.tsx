import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { FaInstagram } from "react-icons/fa";
import ShowcaseCard from "@/components/ShowcaseCard";

export default function Home() {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="-mt-8 -mx-4 sm:-mx-6 md:w-full md:-mx-0 relative w-screen min-h-[450px] lg:h-[55vh] bg-cover bg-bottom bg-no-repeat bg-[url('/images/buddhabashahero3.jpg')]">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-0" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-8">
          <div className="max-w-lg text-left">
            <p className="text-sm text-white/70 uppercase tracking-widest mb-2">
              Made with Meaning
            </p>
            <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-4">
              Handcrafted Jewelry for the{" "}
              <span className="text-white font-accent font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
                Soul
              </span>
            </h1>
            <p className="text-white text-md md:text-lg mb-6">
              Discover unique, beautifully crafted jewelry pieces that tell your
              story. Each piece is carefully made with love and attention to
              detail.
            </p>
            <div className="flex flex-col gap-4 items-start w-full max-w-[150px]">
              <Link
                href="/products"
                className="w-full text-sm inline-flex items-center justify-center bg-primary text-white px-6 py-4 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                Shop Now
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/cart"
                className="w-full text-sm inline-flex items-center justify-center bg-white border border-gray-200 text-black px-6 py-3 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-secondary rounded-lg shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose BuddhaBasha?
            </h2>
            <p className="text-lg text-text">
              We believe in creating jewelry that speaks to your heart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-dark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Handcrafted with Love
              </h3>
              <p className="text-dark">
                I personally handcraft each piece with care, ensuring meaning
                and beauty in every design
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-dark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quality Guaranteed
              </h3>
              <p className="text-dark">
                We use only the finest materials and stand behind the quality of
                every piece we create.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-dark"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Unique Designs
              </h3>
              <p className="text-dark">
                Stand out with our unique, one-of-a-kind designs that reflect
                your individual style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Jewelry Showcase Section */}

      <section>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Curated for You
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each piece tells a story of craftsmanship, beauty, and meaning.
              Discover the artistry behind our handcrafted jewelry collection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
            {/* Left Long Card */}
            <div className="md:col-span-1">
              <ShowcaseCard
                image="/images/jewellong.jpg"
                alt="Stackable Silver Rings"
                title="Stacked Simplicity"
                subtitle="Minimalist bands with timeless charm"
                height="h-[400px]"
              />
            </div>

            {/* 4 Small Cards in 2x2 grid */}
            <div className="md:col-span-2 grid grid-cols-2 gap-1 h-[400px]">
              <ShowcaseCard
                image="/images/jewel1.jpg"
                alt="Lapis Lazuli Chain Bracelet"
                title="Lapis Links"
                subtitle="Bold lapis centerpiece with chain detail"
                objectPosition="bottom"
              />
              <ShowcaseCard
                image="/images/jewel6.jpg"
                alt="Turquoise Dangle Earrings"
                title="Turquoise Bloom"
                subtitle="Vibrant stones framed in beaded silver"
                objectPosition="center 65%"
              />
              <ShowcaseCard
                image="/images/jewel2.jpg"
                alt="Pearl Teardrop Earrings"
                title="Moonlit Drops"
                subtitle="Lustrous pearls for evening elegance"
              />
              <ShowcaseCard
                image="/images/jewel5.jpg"
                alt="Raw Crystal Cuffs"
                title="Earthbound Energy"
                subtitle="Raw gemstones on suede and silver"
              />
            </div>

            {/* Right Long Card */}
            <div className="md:col-span-1">
              <ShowcaseCard
                image="/images/jewel7.jpg"
                alt="Jasper Stud Earrings"
                title="Stone & Soul"
                subtitle="Handmade jasper studs with natural tones"
                height="h-[400px]"
                objectPosition="center 30%"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 bg-light shadow-md rounded-lg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to Find Your Perfect Piece?
          </h2>
          <p className="text-xl text-dark mb-8">
            Browse our collection and discover jewelry that speaks to your soul.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center border bg-white font-semi text-black px-6 py-4 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Explore Collection
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-white shadow-md rounded-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Real stories from people who wear our jewelry with love
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-light p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic mb-4">
                "Absolutely stunning! I get compliments every time I wear my
                BuddhaBasha necklace. It truly feels special."
              </p>
              <p className="text-gray-900 font-semibold">– Alyssa R.</p>
            </div>

            <div className="bg-light p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic mb-4">
                "The craftsmanship is top-tier, and I love knowing each piece is
                made with meaning. Highly recommend."
              </p>
              <p className="text-gray-900 font-semibold">– Jamal W.</p>
            </div>

            <div className="bg-light p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic mb-4">
                "My bracelet arrived quickly and was even more beautiful in
                person. The perfect gift — to myself!"
              </p>
              <p className="text-gray-900 font-semibold">– Priya S.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Follow Us Section */}
      <section className="py-8 bg-lightgray text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Connected with Us
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Follow{" "}
            <span className="font-semibold text-primary">
              @BuddhaBashaJewelry
            </span>{" "}
            on social media for the latest drops, behind-the-scenes, and styling
            inspiration.
          </p>
          <Link
            href="https://www.instagram.com/buddhabashajewelry/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 justify-center bg-primary text-white px-6 py-3 rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <FaInstagram className="w-5 h-5" />
            Follow Us
          </Link>
        </div>
      </section>
    </div>
  );
}
