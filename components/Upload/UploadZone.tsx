"use client";
import React, { useState } from "react";

import UploadImage from "./UploadImage";
import EnterPosterDetails from "./EnterPosterDetails";

export type PosterDetails = {
  author: string;
  description: string;
  fonts: string[];
  colors: string[];
  tools: string[];
  published: Date;
  tags: string[];
};
export type UploadResponse = {
  name: string;
  serverData: { uploadedBy: string };
  size: number;
  type: string;
  ufsUrl: string;
};

const UploadZone = () => {
  const [posterImage, setPosterImage] = useState<UploadResponse[] | null>(null);

  const [posterDetails, setPosterDetails] = useState<PosterDetails>({
    author: "",
    description: "",
    fonts: [],
    colors: [],
    tools: [],
    published: new Date(),
    tags: [],
  });

  console.log(posterDetails);

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
