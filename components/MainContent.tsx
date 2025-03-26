"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";

const posters = [
  {
    title: "Poster Title 1",
    description: "Short description of the poster.",
    fonts: ["Font One", "Font Two"],
    colors: ["#FF5733", "#1E1E1E", "#FFFFFF"],
    tools: ["Figma", "Photoshop"],
    published: "2025-03-25",
    tags: ["modern", "bold", "typography"],
    views: 123,
    socials: {
      instagram: "https://instagram.com/yourprofile",
      facebook: "https://facebook.com/yourprofile",
    },
    bg: "bg-indigo-900",
  },
  {
    title: "Poster Title 2",
    description: "Another short description.",
    fonts: ["Helvetica", "Courier New"],
    colors: ["#FFD700", "#000000", "#F5F5F5"],
    tools: ["Illustrator"],
    published: "2025-03-20",
    tags: ["minimal", "blackwhite"],
    views: 98,
    socials: {
      instagram: "https://instagram.com/yourprofile",
      facebook: "https://facebook.com/yourprofile",
    },
    bg: "bg-yellow-200",
  },
  {
    title: "Poster Title 3",
    description: "Something about the concept.",
    fonts: ["Roboto", "Montserrat"],
    colors: ["#E91E63", "#3F51B5", "#FFFFFF"],
    tools: ["Figma", "After Effects"],
    published: "2025-03-15",
    tags: ["motion", "gradient", "dynamic"],
    views: 211,
    socials: {
      instagram: "https://instagram.com/yourprofile",
      facebook: "https://facebook.com/yourprofile",
    },
    bg: "bg-gradient-to-tr from-pink-500 to-indigo-400",
  },
  {
    title: "Poster Title 4",
    description: "Something about the concept.",
    fonts: ["Roboto", "Montserrat"],
    colors: ["#E91E63", "#3F51B5", "#FFFFFF"],
    tools: ["Figma", "After Effects"],
    published: "2025-03-15",
    tags: ["motion", "gradient", "dynamic"],
    views: 211,
    socials: {
      instagram: "https://instagram.com/yourprofile",
      facebook: "https://facebook.com/yourprofile",
    },
    bg: "bg-gradient-to-tr from-pink-500 to-orange-400",
  },
  {
    title: "Poster Title 5",
    description: "Something about the concept.",
    fonts: ["Roboto", "Montserrat"],
    colors: ["#E91E63", "#3F51B5", "#FFFFFF"],
    tools: ["Figma", "After Effects"],
    published: "2025-03-15",
    tags: ["motion", "gradient", "dynamic"],
    views: 211,
    socials: {
      instagram: "https://instagram.com/yourprofile",
      facebook: "https://facebook.com/yourprofile",
    },
    bg: "bg-gradient-to-tr from-pink-500 to-green-400",
  },
  {
    title: "Poster Title 6",
    description: "Something about the concept.",
    fonts: ["Roboto", "Montserrat"],
    colors: ["#E91E63", "#3F51B5", "#FFFFFF"],
    tools: ["Figma", "After Effects"],
    published: "2025-03-15",
    tags: ["motion", "gradient", "dynamic"],
    views: 211,
    socials: {
      instagram: "https://instagram.com/yourprofile",
      facebook: "https://facebook.com/yourprofile",
    },
    bg: "bg-gradient-to-tr from-orange-500 to-green-400",
  },
];

const MainContent = () => {
  const router = useRouter();
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setClickedIndex(index);
    setTimeout(() => {
      router.push(`/poster/${index}`);
    }, 600); // počkej na animaci
  };

  return (
    <div className="relative h-full w-full grid gap-5 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] p-4 place-items-center overflow-hidden z-[1]">
      {posters.map((poster, index) => (
        <motion.div
          key={index}
          onClick={() => handleClick(index)}
          className="flex flex-col h-[600px] w-[300px] border shadow cursor-pointer  origin-center"
          initial={false}
          animate={
            clickedIndex === index
              ? { scale: 15, zIndex: 50 }
              : { scale: 1, zIndex: 1 }
          }
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <h3 className="px-2 py-1 text-lg font-semibold">{poster.title}</h3>
          <div className={`h-full w-full ${poster.bg}`} />
        </motion.div>
      ))}
    </div>
  );
};

export default MainContent;
