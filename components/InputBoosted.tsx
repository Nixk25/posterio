"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Input } from "./ui/input";
const InputBoosted = ({
  name,
  icon,
  isUppercase = true,
  type = "text",
  value,
  onChange,
  step,
  bgColor = "#fff",
}: {
  name: string;
  icon?: React.ReactNode;
  isUppercase?: boolean;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: number;
  bgColor?: string;
}) => {
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
    if (value) {
      setIsTextInSearch(value);
    } else {
      setIsTextInSearch("");
    }
  }, [value, step]);

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
      className={`border-b h-full  ${
        icon ? "sm:pl-6" : "sm:pl-2"
      } pl-2 w-full overflow-hidden  ${
        isTextInSearch ? "text-[#000]" : "text-[#818181]"
      } `}
      style={{ backgroundColor: bgColor }}
    >
      <div className="relative flex h-full w-full items-center   gap-2">
        {icon && <div onClick={handleSearchClick}>{icon}</div>}
        <Input
          required
          type={type}
          ref={inputRef}
          value={value}
          onChange={onChange}
          onFocus={() => setIsSearchActive(true)}
          onBlur={() => setIsSearchActive(false)}
          className={`relative z-4 shadow-none ring-0   border-0 bg-transparent ${
            isUppercase ? "uppercase" : "normalText"
          }`}
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
              className={`absolute ${
                icon ? "left-8" : "left-2"
              } w-full top-1/2 -translate-y-1/2  z-3 ${
                isUppercase ? "uppercase" : "normalText"
              }`}
            >
              {name}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InputBoosted;
