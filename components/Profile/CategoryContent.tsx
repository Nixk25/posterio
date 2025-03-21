"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
const CategoryContent = ({ activeCategory }: { activeCategory: string }) => {
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
        {[...Array(3)].map((_, i) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 * (2 + i) }}
            key={i}
            className="flex flex-col h-[600px] w-[500px] border mt-5 mb-10 shrink-0 scroll-snap-start snap-center select-none"
          >
            {activeCategory === "My posts" && (
              <>
                <h3 className="px-2 ">Starry Night</h3>
                <div className="bg-gray-800 h-full w-full" />
              </>
            )}
            {activeCategory === "Favorites" && (
              <>
                <h3 className="px-2 ">Favorite piece</h3>
                <div className="bg-yellow-200 h-full w-full" />
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryContent;
