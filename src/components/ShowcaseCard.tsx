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
};

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  image,
  alt,
  title,
  subtitle,
  height = "h-full",
  objectPosition = "center",
}) => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);

  // auto-hide
  function handleTap() {
    setActive((v) => !v);
    if (!reduce) {
      setTimeout(() => setActive(false), 1800);
    }
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
      aria-pressed={active}
      transition={{ duration: 0.25 }}
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

      {/* Overlay (tap/hover controlled) */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Caption (tap/hover controlled) */}
      <motion.div
        className="absolute bottom-3 left-3 right-3 text-white"
        animate={{
          opacity: active ? 1 : 0,
          y: active ? 0 : reduce ? 0 : 8,
        }}
        transition={{ duration: 0.25 }}
      >
        <h3 className="text-sm font-semibold mb-1">{title}</h3>
        <p className="text-xs opacity-90">{subtitle}</p>
      </motion.div>
    </motion.article>
  );
};

export default ShowcaseCard;
