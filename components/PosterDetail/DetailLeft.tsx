import React from "react";
import PosterDetail from "../PosterDetail";
import ColorsSection, { PosterProps } from "../ColorsSection";

const DetailLeft: React.FC<PosterProps> = ({ poster }) => {
  return (
    <div className="flex flex-col gap-8 my-14 md:my-0   flex-1  h-max md:h-full relative ">
      <PosterDetail name="Author" detail={poster.author} />
      <PosterDetail name="Description" detail={poster.description} />
      <PosterDetail
        name="Fonts"
        detail={poster.fonts.map((font) => (
          <span key={font}>
            {font}
            <br />
          </span>
        ))}
      />

      <ColorsSection poster={poster} />

      <div className="absolute bottom-2 md:bottom-10 flex gap-2 items-center right-4 ">
        <span className=" text-3xl">{poster.views}</span>
        <span>Views</span>
      </div>
    </div>
  );
};

export default DetailLeft;
