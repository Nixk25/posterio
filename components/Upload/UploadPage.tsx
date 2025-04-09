"use client";
import React, { useEffect, useState } from "react";
import BigTextEffect from "@/components/Login/BigTextEffect";
import UploadZone from "@/components/Upload/UploadZone";
import UploadInfo from "@/components/Upload/UploadInfo";

export type PosterDetails = {
  title: string;
  author: string;
  description: string;
  fonts: string[];
  colors: string[];
  tools: string[];
  imgUrl: string;
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
    title: "",
    author: "",
    description: "",
    fonts: [],
    colors: [],
    tools: [],
    imgUrl: posterImage?.[0]?.ufsUrl || "",
    published: new Date(),
    tags: [],
  });

  useEffect(() => {
    if (posterImage?.[0]?.ufsUrl) {
      setPosterDetails((prev) => ({
        ...prev,
        imgUrl: posterImage[0].ufsUrl,
      }));
    }
  }, [posterImage]);
  return (
    <>
      {posterImage ? (
        <div className="m-4">
          <UploadInfo
            field="title"
            label="title"
            posterDetails={posterDetails}
            setPosterDetails={setPosterDetails}
            isText
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
