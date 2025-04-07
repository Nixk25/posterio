import BigTextEffect from "@/components/Login/BigTextEffect";
import DetailSection from "@/components/PosterDetail/DetailSection";
import React from "react";

const posters = [
  {
    title: "Poster Title 1",
    author: "Joe Doe",
    description: "Short description of the poster.",
    fonts: ["Font One", "Font Two"],
    colors: ["#FF5733", "#1E1E1E", "#FFFFFF"],
    tools: ["Figma", "Photoshop"],
    published: new Date("2025-03-25"),
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
    published: new Date("2025-03-20"),
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
    published: new Date("2025-03-15"),
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
    published: new Date("2025-03-15"),
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
    published: new Date("2025-03-15"),
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
    published: new Date("2025-03-15"),
    tags: ["motion", "gradient", "dynamic"],
    views: 211,
    socials: {
      instagram: "https://instagram.com/yourprofile",
      facebook: "https://facebook.com/yourprofile",
    },
    bg: "bg-gradient-to-tr from-orange-500 to-green-400",
  },
];

const Poster = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const index = parseInt(slug);
  const poster = posters[index];

  if (!poster) {
    return <h1 className="p-8 text-2xl">Poster not found 🚫</h1>;
  }

  return (
    <div className="flex flex-col  items-center justify-center overflow-hidden">
      <BigTextEffect headline={poster.title} direction={1} />
      <DetailSection poster={poster} />
    </div>
  );
};

export default Poster;
