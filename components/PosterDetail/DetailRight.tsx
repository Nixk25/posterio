import React from "react";
import PosterDetail from "./PosterDetail";
import { PosterProps } from "./ColorsSection";

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
    </div>
  );
};

export default DetailRight;
