"use client";
import React, { useState } from "react";
import PosterDetail from "./PosterDetail";
import { Poster } from "@prisma/client";

export type PosterProps = {
  poster: Poster;
};
const ColorsSection: React.FC<PosterProps> = ({ poster }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleColorCopy = (color: string) => {
    navigator.clipboard.writeText(color).then(() => {
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 1500);
    });
  };
  return (
    <PosterDetail
      name="Colors"
      detail={poster.colors.map((color) => (
        <div key={color} className="relative">
          <div
            onClick={() => handleColorCopy(color)}
            className="w-8 h-8 rounded-full cursor-pointer group"
          >
            <div
              style={{ backgroundColor: color }}
              className="rounded-full w-full h-full"
            />
            <div className="absolute bg-white p-2 bottom-[-40px] left-0 opacity-0 group-hover:opacity-100 z-10 text-xs text-gray-700 transition-all duration-300 ease-in-out">
              {copiedColor === color ? "Copied" : color}
            </div>
          </div>
        </div>
      ))}
    />
  );
};

export default ColorsSection;
