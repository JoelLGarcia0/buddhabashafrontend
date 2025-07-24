"use client";
import { useState } from "react";

interface ProductCarouselProps {
  mainImage: string;
  additionalImages: { image: string; alt_text?: string }[];
}

const normalizeImageUrl = (url: string) => {
  return url.startsWith("http")
    ? url
    : `https://res.cloudinary.com/dskd9ayw6/${url}`;
};

export default function ProductCarousel({
  mainImage,
  additionalImages,
}: ProductCarouselProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  const allImages = [
    { image: mainImage, alt_text: "Main product image" },
    ...additionalImages,
  ];

  return (
    <div>
      <div className="w-full max-w-sm aspect-square bg-gray-100 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 mb-4 mx-auto">
        <img
          src={normalizeImageUrl(selectedImage)}
          alt="Selected"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {allImages.map((img, idx) => (
          <img
            key={idx}
            src={normalizeImageUrl(img.image)}
            alt={img.alt_text || "Thumbnail"}
            className={`h-16 w-16 rounded-md object-cover border-2 cursor-pointer ${
              selectedImage === img.image ? "border-primary" : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(img.image)}
          />
        ))}
      </div>
    </div>
  );
}
