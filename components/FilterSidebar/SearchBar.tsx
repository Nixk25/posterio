"use client";
import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import FiltersSidebar from "./FiltersSidebar";

const SearchBar = () => {
  const [isTextInSearch, setIsTextInSearch] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchClick = () => {
    setIsSearchActive(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

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
    <div
      className={`border border-t-0 border-r-0 pl-4 bg-background  sticky top-0 ${
        isTextInSearch ? "text-[#000]" : "text-[#818181]"
      } `}
    >
      <div className="flex justify-between items-center">
        <div className="px-2  relative flex w-full items-center  gap-2">
          <div onClick={handleSearchClick}>
            <Search size={20} className="cursor-pointer" />
          </div>
          <Input
            ref={inputRef}
            value={isTextInSearch}
            onChange={(e) => setIsTextInSearch(e.target.value)}
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => setIsSearchActive(false)}
            className="relative z-4 shadow-none ring-0 border-0 bg-transparent"
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
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="absolute left-10  w-full  z-3"
              >
                what are you looking for?
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <FiltersSidebar />
      </div>
    </div>
  );
};

export default SearchBar;
