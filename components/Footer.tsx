"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
const Footer = () => {
  const [isTextInSearch, setIsTextInSearch] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchActive && inputRef.current) {
      inputRef.current.focus();
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchActive(false);
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isSearchActive, setIsSearchActive]);

  return (
    <footer className="flex justify-between bg-[#DDDADA]">
      <div className="flex flex-col justify-between p-5 gap-3">
        <span className="text-2xl ">Posterio</span>
        <span>Icons</span>
      </div>
      <div className="flex gap-20">
        <div className="flex flex-col gap-3 border p-4 border-t-0 border-b-0">
          <span>Shop</span>
          <span>Gallery</span>
          <span>New arrivals</span>
          <span>Best sellers</span>
        </div>
        <div className="flex flex-col gap-3 border p-4 border-t-0 border-b-0">
          <span>Support</span>
          <span>Contact Us</span>
          <span>Faq</span>
          <span>Shipping & Returns</span>
        </div>
        <div className="flex flex-col gap-3 border p-4 border-t-0 border-b-0">
          <span>Newsletter</span>
          <span>Subscribe for updates</span>
          <div className="flex relative gap-5">
            <Input
              className="relative z-4 rounded-none h-full w-full border bg-transparent"
              ref={inputRef}
              value={isTextInSearch}
              onChange={(e) => setIsTextInSearch(e.target.value)}
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => setIsSearchActive(false)}
            />
            <AnimatePresence>
              {!isSearchActive && !isTextInSearch && (
                <motion.span
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                  className="absolute left-2 top-1/2 text-[#818181] -translate-y-1/2  z-3"
                >
                  Enter your email
                </motion.span>
              )}
            </AnimatePresence>
            <button className="bg-accent px-4 py-2 border cursor-pointer ">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
