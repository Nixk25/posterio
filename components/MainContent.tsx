import Link from "next/link";
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

const MainContent = () => {
  return (
    <div className="h-full w-full border border-t-0 border-b-0 grid gap-5 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] p-4 place-items-center">
      {posters.map((poster, index) => (
        <Link
          href={`/poster/${index}`}
          key={index}
          className="flex flex-col h-[600px] w-[300px] border shadow"
        >
          <h3 className="px-2 py-1 text-lg font-semibold">{poster.title}</h3>
          <div className={`h-full w-full ${poster.bg}`} />
        </Link>
      ))}
    </div>
  );
};

export default MainContent;
