"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { PosterType } from "@/app/(pages)/poster/[slug]/page";
import Image from "next/image";
import Link from "next/link";
const CategoryContent = ({
  activeCategory,
  userPosters,
}: {
  activeCategory: string;
  userPosters: PosterType[];
}) => {
  const filteredPosters = activeCategory === "My posts" ? userPosters : [];
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);
  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto cursor-grab active:cursor-grabbing snap-x snap-mandatory scroll-smooth"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeaveOrUp}
      onMouseUp={handleMouseLeaveOrUp}
      onMouseMove={handleMouseMove}
    >
      <div className="flex gap-5 w-max px-4">
        {filteredPosters.length > 0 ? (
          filteredPosters.map((poster, i) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 * (2 + i) }}
              key={i}
              className="flex flex-col h-full mt-5 mb-10 scroll-snap-start snap-center select-none"
            >
              <div className="flex flex-col gap-2 border select-none">
                <div className="flex flex-col p-2">
                  <h3 className="text-lg font-semibold">{poster.title}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {poster.posterCategories.map((catObj, idx) => (
                      <span key={idx} className="bg-accent text-xs px-2 py-0.5">
                        {catObj.category.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="h-[600px] w-[500px] mx-auto">
                  <Image
                    src={poster.imgUrl}
                    alt={poster.title}
                    className="w-full h-full object-cover"
                    width={300}
                    height={600}
                    draggable="false"
                  />
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <Link
            href="/upload"
            className="h-[300px]  text-3xl flex-col flex justify-center"
          >
            <span>You don&apos;t have any posters</span>
            <span className="underline hover:text-accent transition-all duration-300 ease-in-out">
              Upload some
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CategoryContent;
