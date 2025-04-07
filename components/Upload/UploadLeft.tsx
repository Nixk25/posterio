import React from "react";
import UploadInfo from "./UploadInfo";
import type { PosterDetails } from "./UploadZone";
const UploadLeft = ({
  posterDetails,
  setPosterDetails,
  colors,
}: {
  posterDetails: PosterDetails;
  setPosterDetails: React.Dispatch<React.SetStateAction<PosterDetails>>;
  colors: string[];
}) => {
  return (
    <div className="flex flex-col gap-8 my-14 md:my-0 flex-1  h-max md:h-full relative ">
      <UploadInfo
        field="author"
        label="Author"
        posterDetails={posterDetails}
        setPosterDetails={setPosterDetails}
        canRename={false}
        bgColor="#D8D9DC"
      />
      <UploadInfo
        field="description"
        label="Description"
        posterDetails={posterDetails}
        setPosterDetails={setPosterDetails}
      />
      <UploadInfo
        field="fonts"
        label="Fonts"
        posterDetails={posterDetails}
        setPosterDetails={setPosterDetails}
      />
      <div className="flex gap-4 mt-10 flex-wrap justify-center">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-24 h-24 rounded shadow-md border"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      <div className="absolute bottom-2 md:bottom-10 flex gap-2 items-center right-4 ">
        <span className=" text-3xl">0</span>
        <span>Views</span>
      </div>
    </div>
  );
};

export default UploadLeft;
