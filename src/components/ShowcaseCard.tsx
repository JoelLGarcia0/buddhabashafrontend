import Image from "next/image";
import React from "react";

type ShowcaseCardProps = {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  height?: string;
  objectPosition?: string;
};

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  image,
  alt,
  title,
  subtitle,
  height = "h-full",
  objectPosition = "center",
}) => {
  return (
    <div
      className={`relative group overflow-hidden hover:shadow-xl active:shadow-xl focus-within:shadow-xl transition-all duration-300 ${height}`}
      tabIndex={0}
    >
      <Image
        src={image}
        alt={alt}
        fill
        style={{ objectPosition }}
        className="object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105 group-focus-within:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100 group-focus-within:opacity-100" />

      <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100 group-focus-within:opacity-100">
        <h3 className="text-sm font-semibold mb-1">{title}</h3>
        <p className="text-xs opacity-90">{subtitle}</p>
      </div>
    </div>
  );
};

export default ShowcaseCard;
