"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";
import { PosterType } from "@/app/(pages)/poster/[slug]/page";
import { ThumbsUp } from "lucide-react";
import { getPosters } from "@/actions/posterActions";

const MainContent = () => {
  const router = useRouter();
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [posters, setPosters] = useState<PosterType[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const handleClick = (index: number, id: string) => {
    setClickedIndex(index);
    setTimeout(() => {
      router.push(`/poster/${id}`);
    }, 300);
  };

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const result = await getPosters();

        if (result.success) {
          if (result.data) {
            setPosters(result.data);
          }
        } else {
          toast.error("Failed to load posters", {
            description: result.error,
          });
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        toast.error("Something went wrong", {
          description: errorMessage,
        });
      }
    };

    fetchPosters();
  }, []);

  const handleLike = (id: number) => () => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter((postId) => postId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  return (
    <main className="relative h-full w-full grid gap-5 grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] p-4 place-items-center overflow-hidden z-[1] min-h-screen">
      {posters.map((poster, index) => (
        <motion.div
          key={index}
          className="flex flex-col h-[600px] sm:h-[700px] w-[300px] sm:w-[400px] border  cursor-pointer origin-center"
          initial={false}
          animate={
            clickedIndex === index
              ? { scale: 15, zIndex: 50 }
              : { scale: 1, zIndex: 1 }
          }
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center p-2 bg-white">
            <div className="flex flex-col">
              <h3 className=" text-lg font-semibold ">{poster.title}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {poster.posterCategories!.map((catObj, idx) => (
                  <span key={idx} className="bg-accent text-xs px-2 py-0.5 ">
                    {catObj.category.name}
                  </span>
                ))}
              </div>
            </div>
            <span onClick={handleLike(index)}>
              <ThumbsUp
                className="text-3xl transition-all duration-300 ease-in-out hover:scale-90 active:scale-150"
                fill={likedPosts.includes(index) ? "#FEF11F" : "transparent"}
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
            blurDataURL={poster.colors[0]}
          />
        </motion.div>
      ))}
    </main>
  );
};

export default MainContent;
