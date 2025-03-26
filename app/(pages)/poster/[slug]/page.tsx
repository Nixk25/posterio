"use client";
import BigTextEffect from "@/components/Login/BigTextEffect";
import PosterDetail from "@/components/PosterDetail";
import { Facebook, Instagram } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

const posters = [
  {
    title: "Poster Title 1",
    author: "Joe Doe",
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
    author: "Joe Doe",
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
    author: "Joe Doe",
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
    author: "Joe Doe",
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
    author: "Joe Doe",
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
    author: "Joe Doe",
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

const Poster = () => {
  const { slug } = useParams<{ slug: string }>();
  const index = parseInt(slug);
  const poster = posters[index];

  if (!poster) {
    return <h1 className="p-8 text-2xl">Poster not found 🚫</h1>;
  }

  return (
    <div className="flex flex-col  items-center justify-center overflow-hidden">
      <BigTextEffect headline={poster.title} direction={1} />
      <div className="flex w-full border-t  px-4 flex-col sm:flex-row justify-between  h-[680px] pt-10 ">
        <div className="flex flex-col gap-8   flex-1  h-max sm:h-full relative ">
          <PosterDetail name="Author" detail={poster.author} />
          <PosterDetail name="Description" detail={poster.description} />
          <PosterDetail name="Fonts" detail={poster.fonts.join(", ")} />

          <div className=" flex flex-col justify-center ">
            <span className="font-bold detailHeadline text-3xl">Colors</span>
            <div className="flex gap-2">
              {poster.colors.map((color, index) => (
                <span
                  key={index}
                  style={{ backgroundColor: color }}
                  className="rounded-full w-6 h-6"
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-2 sm:bottom-10 flex gap-2 items-center right-4 ">
            <span className=" text-3xl">{poster.views}</span>
            <span>Views</span>
          </div>
        </div>
        <div
          className={`h-[600px]  flex justify-center items-center mx-auto w-[300px] border ${poster.bg}`}
        />
        <div className="flex  h-max flex-col gap-8 flex-1 items-end text-end relative sm:h-full">
          <PosterDetail name="Tools" detail={poster.tools.join(", ")} />
          <PosterDetail name="Published" detail={poster.published} />
          <PosterDetail name="Tags" detail={poster.tags.join(", ")} />
          <div className="flex gap-2 absolute bottom-2 sm:bottom-12 left-4">
            <Instagram size={20} />
            <Facebook size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
