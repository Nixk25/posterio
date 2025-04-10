"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import CategoryContent from "./CategoryContent";
import { getUserPosters } from "@/actions/posterActions";
import { PosterType } from "@/app/(pages)/poster/[slug]/page";

const ProfileBottom = () => {
  const [activeCategory, setActiveCategory] = useState("My posts");
  const [userPosters, setUserPosters] = useState<PosterType[]>([]);

  useEffect(() => {
    const fetchUserPosters = async () => {
      const result = await getUserPosters();

      if (result.success) {
        setUserPosters(result.posters);
      } else {
        console.error("Chyba při načítání:", result.error);
      }
    };

    fetchUserPosters();
  }, []);

  const categories = [
    {
      name: "My posts",
    },
    {
      name: "Favorites",
    },
  ];

  return (
    <>
      <motion.hr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      />
      <div className="flex gap-5 mx-4 text-3xl mt-3 overflow-auto">
        {categories.map(({ name }, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: 0.5 * (2 + i),
            }}
            key={i}
            onClick={() => setActiveCategory(name)}
            className="cursor-pointer z- px-1 select-none relative "
          >
            {name}
            {activeCategory === name && (
              <motion.div
                layoutId="yellow-rectangle"
                className="absolute top-0 left-0 origin-left z-[-1] h-full w-full bg-accent"
              />
            )}
          </motion.span>
        ))}
      </div>

      <CategoryContent
        activeCategory={activeCategory}
        userPosters={userPosters}
        setUserPosters={setUserPosters}
      />
    </>
  );
};

export default ProfileBottom;
