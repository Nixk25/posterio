"use client";
import React, { useState } from "react";
import { Vibrant } from "node-vibrant/browser";
import { UploadDropzone } from "@/app/utils/uploadthing";
import Image from "next/image";
import { motion } from "motion/react";
import { toast } from "sonner";
import UploadLeft from "./Upload/UploadLeft";
import UploadRight from "./Upload/UploadRight";

export type PosterDetails = {
  author: string;
  description: string;
  fonts: string[];
  colors: string[];
};
type UploadResponse = {
  name: string;
  serverData: { uploadedBy: string };
  size: number;
  type: string;
  ufsUrl: string;
};

const UploadZone = () => {
  const [posterImage, setPosterImage] = useState<UploadResponse[] | null>(null);
  console.log(posterImage);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [posterDetails, setPosterDetails] = useState<PosterDetails>({
    author: "",
    description: "",
    fonts: [],
    colors: [],
  });

  const rgbToHex = (rgb: number[]): string => {
    const hex = rgb.map((x) => x.toString(16).padStart(2, "0")).join("");
    return `#${hex}`;
  };

  const handleImageLoad = async () => {
    setIsImageLoading(false);
    if (posterImage && posterImage[0]?.ufsUrl) {
      const palette = await Vibrant.from(posterImage[0]?.ufsUrl).getPalette();
      const colorArray = Object.values(palette)
        .filter((swatch) => swatch)
        .sort((a, b) => (b?.population || 0) - (a?.population || 0))
        .slice(0, 3)
        .map((swatch) => rgbToHex(swatch!.rgb));

      setPosterDetails((prev) => ({
        ...prev,
        colors: colorArray,
      }));
    }
  };

  return (
    <>
      {posterImage ? (
        <div className="flex justify-center items-center mb-20">
          <div className="relative flex justify-center items-center">
            {isImageLoading && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl"
              >
                Loading...
              </motion.div>
            )}
            <div className="flex w-full px-4 flex-col md:flex-row justify-between  md:py-10 md:h-[720px]">
              <UploadLeft
                colors={posterDetails.colors}
                posterDetails={posterDetails}
                setPosterDetails={setPosterDetails}
              />
              <motion.div
                className="h-[600px] w-[80%] sm:w-max "
                animate={{
                  opacity: !isImageLoading ? 1 : 0,
                  filter: !isImageLoading ? "blur(0px)" : "blur(10px)",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Image
                  src={posterImage[0].ufsUrl}
                  height={500}
                  width={300}
                  alt="posterImage"
                  className="h-full w-full object-cover "
                  placeholder="blur"
                  blurDataURL={posterImage[0].ufsUrl}
                  onLoadingComplete={handleImageLoad}
                />
              </motion.div>
              <UploadRight />
            </div>
          </div>
        </div>
      ) : (
        <UploadDropzone
          config={{ mode: "auto" }}
          appearance={{
            button:
              "bg-accent ut-readying:text-black ut-ready:bg-accent ut-readying:bg-accent/50 ut-uploading:bg-accent/50 ut-uploading:cursor-not-allowed ut-ready:text-black rounded-none ut-uploading:ring-0 ut-uploading:outline-none ut-uploading:ring-offset-0 ut-ready:ring-0 ut-ready:outline-none ut-ready:ring-offset-0    ",
          }}
          content={{
            label: "Upload your poster image",
            allowedContent: "Only PNG & JPG & WEBP images (max 16MB)",
          }}
          className="mt-4 ut-label:text-black cursor-pointer border-none uploadButton  ut-label:text-xl text-nowrap w-full ring-0 h-[600px]"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            toast.success("Image uploaded successfully", {
              description: "Your image has been uploaded successfully.",
            });
            setPosterImage(res);

            setPosterDetails((prev) => ({
              ...prev,
              author: res[0]?.serverData.uploadedBy || "",
            }));
          }}
          onUploadError={(error: Error) => {
            toast.error("Something went wrong", {
              description: `Please try again later. ${error.message}`,
            });
          }}
          onChange={(acceptedFiles) => {
            if (acceptedFiles.length === 0) {
              toast.warning(
                "We support only PNG, JPG, and WEBP images and the file size must be under 1MB."
              );
            }
          }}
        />
      )}
    </>
  );
};

export default UploadZone;
