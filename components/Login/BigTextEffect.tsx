"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
const BigTextEffect = ({
  headline,
  direction,
}: {
  headline: string;
  direction: number;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    resizeText();

    window.addEventListener("resize", resizeText);

    return () => {
      window.removeEventListener("resize", resizeText);
    };
  }, []);

  const resizeText = () => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) {
      return;
    }

    const containerWidth = container.offsetWidth;
    let min = 1;
    let max = 500;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      text.style.fontSize = mid + "px";

      if (text.offsetWidth <= containerWidth) {
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }

    text.style.fontSize = max + "px";
  };

  return (
    <div
      className="flex relative z-[-1]  w-full leading-[1] items-center overflow-hidden "
      ref={containerRef}
    >
      <span className="mx-auto whitespace-nowrap text-center" ref={textRef}>
        {headline.split("").map((char, i) => {
          const charIndex = direction > 0 ? i : headline.length - 1 - i;
          const delay = 0.15 * charIndex;

          return (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut", delay: delay }}
            >
              {char}
            </motion.span>
          );
        })}
      </span>
    </div>
  );
};

export default BigTextEffect;
