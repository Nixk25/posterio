"use client";
import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

type SearchBarProps = {
  isSearchActive: boolean;
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchBar = ({ isSearchActive, setIsSearchActive }: SearchBarProps) => {
  const [isTextInSearch, setIsTextInSearch] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

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

    // Přidáme posluchač události pro klávesy
    document.addEventListener("keydown", handleEscapeKey);

    // Vyčištění posluchače po odchodu komponenty
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isSearchActive, setIsSearchActive]);

  return (
    <div className="border-b py-3 text-[#818181]">
      <div className="container px-5 sm:px-0 mx-auto relative flex items-center gap-2">
        <div onClick={handleSearchClick}>
          <Search size={20} className="cursor-pointer" />
        </div>
        <Input
          ref={inputRef}
          value={isTextInSearch}
          onChange={(e) => setIsTextInSearch(e.target.value)}
          onFocus={() => setIsSearchActive(true)}
          onBlur={() => setIsSearchActive(false)}
          className="relative z-2 shadow-none ring-0 border-0 bg-transparent"
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
              className="absolute left-13 sm:left-8 z-1"
            >
              what are you looking for?
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchBar;
