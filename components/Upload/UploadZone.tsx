"use client";
import React from "react";

import UploadImage from "./UploadImage";
import EnterPosterDetails from "./EnterPosterDetails";
import { PosterDetails, UploadResponse } from "./UploadPage";

const UploadZone = ({
  posterImage,
  setPosterImage,
  posterDetails,
  setPosterDetails,
}: {
  posterImage: UploadResponse[] | null;
  setPosterImage: React.Dispatch<React.SetStateAction<UploadResponse[] | null>>;
  posterDetails: PosterDetails;
  setPosterDetails: React.Dispatch<React.SetStateAction<PosterDetails>>;
}) => {
  return (
    <>
      {posterImage ? (
        <EnterPosterDetails
          posterDetails={posterDetails}
          posterImage={posterImage}
          setPosterDetails={setPosterDetails}
        />
      ) : (
        <UploadImage
          setPosterImage={setPosterImage}
          setPosterDetails={setPosterDetails}
        />
      )}
    </>
  );
};

export default UploadZone;
