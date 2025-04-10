"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { PosterType } from "@/app/(pages)/poster/[slug]/page";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deletePoster } from "@/actions/posterActions";
const CategoryContent = ({
  activeCategory,
  userPosters,
  setUserPosters,
}: {
  activeCategory: string;
  userPosters: PosterType[];
  setUserPosters: React.Dispatch<React.SetStateAction<PosterType[]>>;
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

  const handleDelete = async (posterId: string) => {
    const confirmed = confirm("Opravdu chcete smazat tento poster?");
    if (!confirmed) return;

    try {
      await deletePoster(posterId);
      setUserPosters((prev) => prev.filter((p) => p.id !== posterId));
      toast.success("Poster deleted successfully", {
        description: "We hope you will make another poster soon!",
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error("We couldn't delete the poster", {
        description: errorMessage,
      });
    }
  };
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
              className="flex flex-col h-full mt-5 mb-10 scroll-snap-start snap-center select-none group"
            >
              <Link
                href={`/poster/${poster.id}`}
                className="flex flex-col gap-2 border select-none"
              >
                <div className="flex flex-col p-2">
                  <h3 className="text-lg font-semibold">{poster.title}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {poster.posterCategories!.map((catObj, idx) => (
                      <span key={idx} className="bg-accent text-xs px-2 py-0.5">
                        {catObj.category.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="h-[600px] w-max mx-auto  relative">
                  <Image
                    src={poster.imgUrl}
                    alt={poster.title}
                    className="w-full h-full object-cover group-hover:blur-md transition-all duration-300 ease-in-out"
                    width={300}
                    height={600}
                    draggable="false"
                    placeholder="blur"
                    blurDataURL={poster.colors[0]}
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black group-hover:opacity-70 opacity-0 z-10 transition-all duration-300 ease-in-out">
                    <div className="absolute  group-hover:opacity-100 opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(poster.id!);
                        }}
                        className="flex border rounded-full p-4 text-white border-white justify-center items-center hover:text-red-400 transition-colors duration-300 ease-in-out cursor-pointer"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
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
