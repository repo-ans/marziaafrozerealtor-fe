"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const word = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function RevealText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="mr-[0.3em] inline-block overflow-hidden align-top">
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
