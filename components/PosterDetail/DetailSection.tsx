import React from "react";
import DetailLeft from "./DetailLeft";
import DetailRight from "./DetailRight";
import { PosterType } from "@/app/(pages)/poster/[slug]/page";
import Image from "next/image";
const DetailSection = ({ poster }: { poster: PosterType }) => {
  return (
    <div className="flex w-full border-t   px-4 flex-col md:flex-row justify-between md:py-10 md:h-[820px]">
      <DetailLeft poster={poster} />
      <div className="h-max w-[80%] sm:w-[500px] mx-auto ">
        <Image
          src={poster.imgUrl}
          height={500}
          width={300}
          alt="posterImage"
          className="h-full w-full object-cover "
          placeholder="blur"
          blurDataURL={poster.imgUrl}
        />
      </div>
      <DetailRight poster={poster} />
    </div>
  );
};

export default DetailSection;
