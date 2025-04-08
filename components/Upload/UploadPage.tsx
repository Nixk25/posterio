"use client";
import React, { useState } from "react";
import BigTextEffect from "@/components/Login/BigTextEffect";
import UploadZone from "@/components/Upload/UploadZone";
import UploadInfo from "@/components/Upload/UploadInfo";

export type PosterDetails = {
  headline: string;
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
const UploadPage = () => {
  const [posterImage, setPosterImage] = useState<UploadResponse[] | null>(null);
  const [posterDetails, setPosterDetails] = useState<PosterDetails>({
    headline: "",
    author: "",
    description: "",
    fonts: [],
    colors: [],
    tools: [],
    published: new Date(),
    tags: [],
  });
  return (
    <>
      {posterImage ? (
        <div className="m-4">
          <UploadInfo
            field="headline"
            label="Headline"
            posterDetails={posterDetails}
            setPosterDetails={setPosterDetails}
          />
        </div>
      ) : (
        <BigTextEffect headline="Upload your poster" direction={1} />
      )}
      <UploadZone
        posterDetails={posterDetails}
        setPosterDetails={setPosterDetails}
        posterImage={posterImage}
        setPosterImage={setPosterImage}
      />
    </>
  );
};

export default UploadPage;
