import React from "react";
import PosterDetail from "./PosterDetail";
import { PosterProps } from "./ColorsSection";
import { Facebook, Instagram } from "lucide-react";

const DetailRight: React.FC<PosterProps> = ({ poster }) => {
  return (
    <div className="flex my-10 md:my-0  h-max flex-col gap-8 flex-1 items-end text-end relative md:h-full">
      <PosterDetail
        name="Tools"
        detail={poster.tools.map((tool) => (
          <span key={tool}>
            {tool}
            <br />
          </span>
        ))}
      />
      <PosterDetail
        name="Published"
        detail={poster.published.toLocaleDateString()}
      />
      <PosterDetail
        name="Tags"
        detail={poster.tags.map((tag) => (
          <span className="bg-accent p-2" key={tag}>
            {tag}
          </span>
        ))}
      />
      <div className="flex gap-2 absolute bottom-2 md:bottom-12 left-4">
        <Instagram size={20} />
        <Facebook size={20} />
      </div>
    </div>
  );
};

export default DetailRight;
