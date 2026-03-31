"use client";

import Image from "next/image";
import { useState } from "react";

type PosterImageProps = {
  src: string;
  alt: string;
  blurDataURL?: string | null;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
  draggable?: string;
};

const PosterImage = ({
  src,
  alt,
  blurDataURL,
  width = 500,
  height = 700,
  className = "",
  onClick,
  draggable,
}: PosterImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={onClick}>
      {/* Blur placeholder layer — heavily blurred so it looks like soft colors */}
      {blurDataURL && (
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-out scale-110"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(60px)",
            opacity: isLoaded ? 0 : 0.5,
          }}
        />
      )}
      {/* Actual image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setIsLoaded(true)}
        draggable={draggable === "false" ? false : undefined}
      />
    </div>
  );
};

export default PosterImage;
