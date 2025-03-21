"use client";
import { useParams } from "next/navigation";
import React from "react";

const posters = [
  { title: "Starry Night", bg: "bg-indigo-900" },
  { title: "Mona Lisa", bg: "bg-yellow-200" },
  { title: "The Scream", bg: "bg-gradient-to-tr from-pink-500 to-indigo-400" },
  { title: "The Persistence of Memory", bg: "bg-gray-700" },
  { title: "Girl with a Pearl Earring", bg: "bg-amber-500" },
  { title: "The Birth of Venus", bg: "bg-pink-300" },
  { title: "The Last Supper", bg: "bg-green-300" },
  { title: "American Gothic", bg: "bg-gray-300" },
  { title: "The Night Watch", bg: "bg-yellow-500" },
];

const Poster = () => {
  const { slug } = useParams<{ slug: string }>();
  const index = parseInt(slug);
  const poster = posters[index];

  if (!poster) {
    return <h1 className="p-8 text-2xl">Poster not found 🚫</h1>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">{poster.title}</h1>
      <div className={`h-[600px] w-[300px] border ${poster.bg}`} />
    </div>
  );
};

export default Poster;
