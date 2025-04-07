import React from "react";
import UploadInfo from "./UploadInfo";
import type { PosterDetails } from "./UploadZone";
import { Facebook, Instagram } from "lucide-react";
const UploadRight = ({
  posterDetails,
  setPosterDetails,
}: {
  posterDetails: PosterDetails;
  setPosterDetails: React.Dispatch<React.SetStateAction<PosterDetails>>;
}) => {
  return (
    <div className="flex flex-col gap-8 my-14 md:my-0  flex-1  h-max md:h-full relative ">
      <UploadInfo
        field="tools"
        label="Tools"
        posterDetails={posterDetails}
        setPosterDetails={setPosterDetails}
      />
      <UploadInfo
        field="published"
        label="Published"
        posterDetails={posterDetails}
        setPosterDetails={setPosterDetails}
        canRename={false}
        bgColor="#D8D9DC"
      />
      <UploadInfo
        field="tags"
        label="Tags"
        posterDetails={posterDetails}
        setPosterDetails={setPosterDetails}
      />

      <div className="flex gap-2 absolute bottom-2 md:bottom-12 left-4">
        <Instagram size={20} />
        <Facebook size={20} />
      </div>
    </div>
  );
};

export default UploadRight;
