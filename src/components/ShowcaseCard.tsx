"use client";

import Image from "next/image";
import React from "react";
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

  return (
    <motion.article
      className={`relative overflow-hidden ${height}`}
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ scale: reduce ? 1 : 1.015 }}
      whileTap={{ scale: reduce ? 1 : 0.985 }}
      transition={{ duration: 0.25 }}
      tabIndex={0}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        style={{ objectPosition }}
        className="object-cover will-change-transform"
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover={{ opacity: 1 }}
        whileTap={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.35 }}
      />

      {/* Caption */}
      <motion.div
        className="absolute bottom-3 left-3 right-3 text-white"
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ opacity: 1, y: 0 }}
        whileTap={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.35 }}
      >
        <h3 className="text-sm font-semibold mb-1">{title}</h3>
        <p className="text-xs opacity-90">{subtitle}</p>
      </motion.div>
    </motion.article>
  );
};

export default ShowcaseCard;
