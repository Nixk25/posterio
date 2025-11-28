"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";
import { PosterType } from "@/app/(pages)/poster/[slug]/page";
import { Star } from "lucide-react";
import { getPosters, toggleFavoritePoster } from "@/actions/posterActions";
import { getUserFavorites } from "@/actions/posterActions";
import Loader from "./Loader";
import { useFilterContext } from "@/context/FilterContext";

const MainContent = () => {
  const { filteredPosters, isFiltered, filterPending, clearFilters } =
    useFilterContext();
  const router = useRouter();
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [posters, setPosters] = useState<PosterType[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const handleClick = (index: number, id: string) => {
    setClickedIndex(index);
    setTimeout(() => {
      router.push(`/poster/${id}`);
    }, 1200);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const postersResult = await getPosters();
        const favoritesResult = await getUserFavorites();

        if (postersResult.success) {
          if (postersResult.data) {
            setPosters(postersResult.data);
          }
        } else {
          toast.error("Failed to load posters", {
            description: postersResult.error,
          });
        }

        if (favoritesResult.success) {
          const favoriteIds = favoritesResult.favorites.map(
            (fav) => fav.posterId
          );
          setLikedPosts(favoriteIds);
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        toast.error("Something went wrong", { description: errorMessage });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLike = (id: string) => async () => {
    try {
      const result = await toggleFavoritePoster(id);

      if (result.success) {
        if (result.favorited) {
          setLikedPosts([...likedPosts, id]);
          toast.success("Poster added to favorites!");
        } else {
          setLikedPosts(likedPosts.filter((postId) => postId !== id));
          toast.success("Poster removed from favorites!");
        }
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong with adding poster to favorites");
      console.error(error);
    }
  };
  const postersToShow = isFiltered ? filteredPosters : posters;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (
      !isLoading &&
      !filterPending &&
      postersToShow.length === 0 &&
      isFiltered
    ) {
      timeoutId = setTimeout(() => {
        clearFilters();
        toast.info("Filters have been automatically cleared");
      }, 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [
    isLoading,
    filterPending,
    postersToShow.length,
    isFiltered,
    clearFilters,
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLoading || filterPending || postersToShow.length === 0) return;

      if (e.key === "Enter") {
        const focusedCard = cardRefs.current.find(
          (card) => card === document.activeElement
        );
        if (focusedCard) {
          e.preventDefault();
          const index = cardRefs.current.indexOf(focusedCard);
          const poster = postersToShow[index];
          if (poster?.id) {
            handleClick(index, poster.id);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [postersToShow, isLoading, filterPending]);

  return (
    <main className="relative h-full w-full grid grid-cols-3 gap-0 overflow-hidden z-[1] min-h-screen">
      {isLoading || filterPending ? (
        <Loader />
      ) : postersToShow.length === 0 ? (
        <div>No posters found</div>
      ) : (
        <>
          {postersToShow &&
            postersToShow.length > 0 &&
            postersToShow.map((poster, index) => (
              <motion.div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                tabIndex={0}
                className="flex flex-col first:border-l h-[600px] sm:h-[800px] max-w-[500px] cursor-pointer origin-center focus:outline-none focus:border-3 focus:border-black focus:scale-95 transition-all duration-300 ease-in-out"
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={
                  clickedIndex === index
                    ? {
                        filter: "blur(30px)",
                        scale: 10,
                        zIndex: 50,
                        opacity: 1,
                      }
                    : { filter: "blur(0px)", scale: 1, zIndex: 1, opacity: 1 }
                }
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <div className="flex justify-between items-center p-2 bg-white border-t border-r border-black">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">{poster.title}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {poster.posterCategories?.map((catObj, idx) => (
                        <span
                          key={idx}
                          className="bg-accent text-xs px-2 py-0.5"
                        >
                          {catObj.category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span onClick={handleLike(poster.id!)}>
                    <Star
                      className="text-3xl transition-all duration-300 ease-in-out hover:scale-90 active:scale-150"
                      fill={
                        likedPosts.includes(poster.id!)
                          ? "#FEF11F"
                          : "transparent"
                      }
                    />
                  </span>
                </div>

                <Image
                  onClick={() => handleClick(index, poster.id!)}
                  src={poster.imgUrl}
                  alt={poster.title}
                  className="w-full h-full object-cover"
                  width={300}
                  height={600}
                  placeholder="blur"
                  blurDataURL={poster.blurDataURL || poster.colors[0]}
                />
              </motion.div>
            ))}
        </>
      )}
    </main>
  );
};

export default MainContent;
