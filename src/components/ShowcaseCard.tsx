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
      className={`relative group overflow-hidden hover:shadow-xl transition-all duration-300 ${height}`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        style={{ objectPosition }}
        className={`w-full object-cover group-hover:scale-105 transition-transform duration-500`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-sm font-semibold mb-1">{title}</h3>
        <p className="text-xs opacity-90">{subtitle}</p>
      </div>
    </div>
  );
};

export default ShowcaseCard;
