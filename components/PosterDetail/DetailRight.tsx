import React from "react";
import PosterDetail from "./PosterDetail";
import { PosterType } from "@/app/(pages)/poster/[slug]/page";
export type PosterTypeProps = {
  poster: PosterType;
};
const DetailRight: React.FC<PosterTypeProps> = ({ poster }) => {
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
        detail={poster.createdAt.toLocaleDateString()}
      />
      <PosterDetail
        name="Tags"
        detail={poster.posterCategories.map((catObj, idx) => (
          <span key={idx} className="bg-accent  px-2 py-0.5 ">
            {catObj.category.name}
          </span>
        ))}
      />
    </div>
  );
};

export default DetailRight;
