"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const TAG = {
  div: motion.div,
  aside: motion.aside,
  section: motion.section,
} as const;

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: keyof typeof TAG;
}) {
  const MotionTag = TAG[as];

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
