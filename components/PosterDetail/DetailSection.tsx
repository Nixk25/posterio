import React from "react";
import DetailLeft from "./DetailLeft";
import DetailRight from "./DetailRight";
import { PosterType } from "@/app/(pages)/poster/[slug]/page";
import PosterImage from "../PosterImage";
const DetailSection = ({ poster }: { poster: PosterType }) => {
  return (
    <div className="flex w-full border-t   px-4 flex-col md:flex-row justify-between md:py-10 md:h-[820px]">
      <DetailLeft poster={poster} />
      <div className="h-max w-[80%] sm:w-[500px] mx-auto">
        <PosterImage
          src={poster.imgUrl}
          height={500}
          width={300}
          alt={poster.title}
          className="h-full w-full"
          blurDataURL={poster.blurDataURL || poster.colors[0]}
        />
      </div>
      <DetailRight poster={poster} />
    </div>
  );
};

export default DetailSection;
