import React from "react";
import DetailLeft from "./DetailLeft";
import DetailRight from "./DetailRight";
import { Poster } from "./ColorsSection";

const DetailSection = ({ poster }: { poster: Poster }) => {
  return (
    <div className="flex w-full border-t  px-4 flex-col md:flex-row justify-between md:py-10 md:h-[720px]">
      <DetailLeft poster={poster} />
      <div
        className={`h-[600px]  flex justify-center items-center mx-auto w-[500px] border ${poster.bg}`}
      />
      <DetailRight poster={poster} />
    </div>
  );
};

export default DetailSection;
