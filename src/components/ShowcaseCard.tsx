"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ShowcaseCardProps = {
  image: string;
  alt: string;
  title: string;
  subtitle: string;

  height?: string;
  objectPosition?: string;

  variant?: "fill" | "masonry";

  imgWidth?: number;
  imgHeight?: number;
};

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  image,
  alt,
  title,
  subtitle,
  height = "h-full",
  objectPosition = "center",
  variant = "fill",
  imgWidth = 1200,
  imgHeight = 1600,
}) => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);

  function handleTap() {
    setActive((v) => !v);
    if (!reduce) setTimeout(() => setActive(false), 1800);
  }

  const Overlay = (
    <>
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        className="absolute bottom-3 left-3 right-3 text-white"
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : reduce ? 0 : 8 }}
        transition={{ duration: 0.25 }}
      >
        <h3 className="text-sm font-semibold mb-1">{title}</h3>
        <p className="text-xs opacity-90">{subtitle}</p>
      </motion.div>
    </>
  );

  if (variant === "masonry") {
    return (
      <motion.article
        className="relative overflow-hidden select-none"
        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{ scale: reduce ? 1 : 1.01 }}
        whileTap={{ scale: reduce ? 1 : 0.985 }}
        onHoverStart={() => setActive(true)}
        onHoverEnd={() => setActive(false)}
        onTap={handleTap}
        onBlur={() => setActive(false)}
        tabIndex={0}
      >
        <Image
          src={image}
          alt={alt}
          width={imgWidth}
          height={imgHeight}
          className="w-full h-auto object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
        {Overlay}
      </motion.article>
    );
  }

  return (
    <motion.article
      className={`relative overflow-hidden ${height} select-none`}
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ scale: reduce ? 1 : 1.01 }}
      whileTap={{ scale: reduce ? 1 : 0.985 }}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onTap={handleTap}
      onBlur={() => setActive(false)}
      tabIndex={0}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        style={{ objectPosition }}
        className="object-cover"
        priority={false}
      />
      {Overlay}
    </motion.article>
  );
};

export default ShowcaseCard;
