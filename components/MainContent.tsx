"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PosterImage from "./PosterImage";
import { toast } from "sonner";
import { PosterType } from "@/app/(pages)/poster/[slug]/page";
import { Star } from "lucide-react";
import { getPosters, toggleFavoritePoster } from "@/actions/posterActions";
import { getUserFavorites } from "@/actions/posterActions";
import PosterSkeleton from "./PosterSkeleton";
import { useFilterContext } from "@/context/FilterContext";
import { useSound } from "@/context/SoundContext";

const POSTERS_PER_PAGE = 9;

const MainContent = () => {
  const {
    filteredPosters,
    isFiltered,
    filterPending,
    clearFilters,
    searchResults,
    searchQuery,
    isSearching,
  } = useFilterContext();
  const { playSuccess } = useSound();
  const router = useRouter();
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [posters, setPosters] = useState<PosterType[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Keep showing previous results until new ones arrive
  const [displayedPosters, setDisplayedPosters] = useState<PosterType[]>([]);

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

        const [postersResult, favoritesResult] = await Promise.all([
          getPosters(undefined, POSTERS_PER_PAGE),
          getUserFavorites(),
        ]);

        if (postersResult.success && postersResult.data) {
          setPosters(postersResult.data);
          setNextCursor(postersResult.nextCursor);
        } else if (!postersResult.success) {
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

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !nextCursor) return;
    setIsLoadingMore(true);

    try {
      const result = await getPosters(nextCursor, POSTERS_PER_PAGE);
      if (result.success && result.data) {
        setPosters((prev) => [...prev, ...result.data!]);
        setNextCursor(result.nextCursor);
      }
    } catch {
      toast.error("Failed to load more posters");
    } finally {
      setIsLoadingMore(false);
    }
  }, [nextCursor, isLoadingMore]);

  // Infinite scroll observer
  useEffect(() => {
    if (isFiltered || searchQuery) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextCursor && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const el = loadMoreRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [nextCursor, isLoadingMore, loadMore, isFiltered, searchQuery]);

  const handleLike = (id: string) => async () => {
    try {
      const result = await toggleFavoritePoster(id);

      if (result.success) {
        playSuccess();
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

  // Compute what should be shown
  const nextPosters =
    searchResults.length > 0 || searchQuery
      ? searchResults
      : isFiltered
      ? filteredPosters
      : posters;

  // Only update displayed posters when we have actual new results (not during loading)
  useEffect(() => {
    if (!filterPending && !isSearching) {
      setDisplayedPosters(nextPosters);
    }
  }, [nextPosters, filterPending, isSearching]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (
      !isLoading &&
      !filterPending &&
      displayedPosters.length === 0 &&
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
  }, [isLoading, filterPending, displayedPosters.length, isFiltered, clearFilters]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLoading || filterPending || displayedPosters.length === 0) return;

      if (e.key === "Enter") {
        const focusedCard = cardRefs.current.find(
          (card) => card === document.activeElement
        );
        if (focusedCard) {
          e.preventDefault();
          const index = cardRefs.current.indexOf(focusedCard);
          const poster = displayedPosters[index];
          if (poster?.id) {
            handleClick(index, poster.id);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [displayedPosters, isLoading, filterPending]);

  return (
    <main className="relative h-full w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-0 overflow-hidden z-[1] place-items-start min-h-screen">
      {/* Initial load only — skeleton */}
      {isLoading ? (
        <>
          {Array.from({ length: POSTERS_PER_PAGE }).map((_, i) => (
            <PosterSkeleton key={i} />
          ))}
        </>
      ) : (
        <>
        <AnimatePresence mode="wait">
            {displayedPosters.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="col-span-full flex justify-center items-center w-full min-h-screen"
              >
                No posters found
              </motion.div>
            ) : (
              <motion.div
                key={isFiltered || searchQuery ? displayedPosters.map(p => p.id).join(",") : "main"}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="col-span-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-0 w-full"
              >
              {displayedPosters.map((poster, index) => (
                <motion.div
                  key={poster.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  tabIndex={0}
                  className="flex flex-col first:border-l h-[600px] sm:h-[700px] xl:h-[750px] w-full cursor-pointer origin-center outline-none focus-visible:border-3 focus-visible:border-black focus-visible:scale-95 transition-all duration-300 ease-linear"
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
                  transition={{ duration: 1, ease: "linear" }}
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
                    <span onClick={handleLike(poster.id!)} className="outline-none focus:outline-none" tabIndex={-1}>
                      <Star
                        className="text-3xl transition-all duration-300 ease-linear hover:scale-90 active:scale-150 outline-none"
                        fill={
                          likedPosts.includes(poster.id!)
                            ? "#FEF11F"
                            : "transparent"
                        }
                      />
                    </span>
                  </div>

                  <PosterImage
                    onClick={() => handleClick(index, poster.id!)}
                    src={poster.imgUrl}
                    alt={poster.title}
                    className="w-full h-full"
                    blurDataURL={poster.blurDataURL || poster.colors[0]}
                  />
                </motion.div>
              ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Infinite scroll trigger — outside AnimatePresence */}
          {!isFiltered && !searchQuery && nextCursor && (
            <div
              ref={loadMoreRef}
              className="col-span-full w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-0 min-h-[1px]"
            >
              {isLoadingMore &&
                Array.from({ length: 3 }).map((_, i) => (
                  <PosterSkeleton key={`more-${i}`} />
                ))}
            </div>
          )}
        </>
      )}

      {/* Fullscreen blur overlay on poster click */}
      <AnimatePresence>
        {clickedIndex !== null && (
          <motion.div
            key="click-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-white/40 backdrop-blur-xl"
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default MainContent;
