import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollLines() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 flex justify-between overflow-hidden">
      {/* Left side curling line */}
      <svg 
        className="h-[120%] w-20 md:w-32 opacity-100 text-white" 
        viewBox="0 0 100 1000" 
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 50 -100 C -50 100, 150 300, 50 500 C -50 700, 150 900, 50 1100"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="20 10"
          style={{ strokeDashoffset: useTransform(scrollYProgress, [0, 1], [0, 1000]) }}
        />
      </svg>

      {/* Right side curling line (mirrored) */}
      <svg 
        className="h-[120%] w-20 md:w-32 opacity-100 text-white" 
        viewBox="0 0 100 1000" 
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 50 -100 C 150 100, -50 300, 50 500 C 150 700, -50 900, 50 1100"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="20 10"
          style={{ strokeDashoffset: useTransform(scrollYProgress, [0, 1], [0, 1000]) }}
        />
      </svg>
    </div>
  );
}
