import React from "react";
import UploadInfo from "./UploadInfo";
import { PosterDetails } from "./UploadPage";

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
        isText
      />
      <UploadInfo
        field="fonts"
        label="Fonts"
        posterDetails={posterDetails}
        setPosterDetails={setPosterDetails}
        required={false}
      />

      <div className="flex gap-2 ">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-8 h-8 rounded-full cursor-pointer group relative"
          >
            <div
              style={{ backgroundColor: color }}
              className="rounded-full w-full h-full"
            />
            <div className="absolute bg-white p-2 bottom-[-40px] left-0 opacity-0 group-hover:opacity-100 z-10 text-xs text-gray-700 transition-all duration-300 ease-in-out">
              {color}
            </div>
          </div>
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
