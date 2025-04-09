"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";
type Poster = {
  id: string;
  title: string;
  imgUrl: string;
  posterCategories: {
    category: {
      name: string;
    };
  }[];
  user: {
    name: string;
    email: string;
  };
};

const MainContent = () => {
  const router = useRouter();
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [posters, setPosters] = useState<Poster[]>([]);

  const handleClick = (index: number, id: string) => {
    setClickedIndex(index);
    setTimeout(() => {
      router.push(`/poster/${id}`);
    }, 300);
  };

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const res = await fetch("/api/posters");
        const data = await res.json();
        setPosters(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error("Something went wrong 😢", {
            description: `${error.message}`,
          });
        } else {
          toast.error("Something went wrong 😢");
        }
      }
    };

    fetchPosters();
  }, []);

  return (
    <div className="relative h-full w-full grid gap-5 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] p-4 place-items-center overflow-hidden z-[1] min-h-screen">
      {posters.map((poster, index) => (
        <motion.div
          key={index}
          onClick={() => handleClick(index, poster.id)}
          className="flex flex-col h-[600px] sm:h-[700px] w-[300px] sm:w-[400px] border  cursor-pointer origin-center"
          initial={false}
          animate={
            clickedIndex === index
              ? { scale: 15, zIndex: 50 }
              : { scale: 1, zIndex: 1 }
          }
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col  p-2">
            <h3 className=" text-lg font-semibold ">{poster.title}</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {poster.posterCategories.map((catObj, idx) => (
                <span key={idx} className="bg-accent text-xs px-2 py-0.5 ">
                  {catObj.category.name}
                </span>
              ))}
            </div>
          </div>

          <Image
            src={poster.imgUrl}
            alt={poster.title}
            className="w-full h-full object-cover"
            width={300}
            height={600}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default MainContent;
