"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import UploadLeft from "./UploadLeft";
import UploadRight from "./UploadRight";
import { useRouter } from "next/navigation";
import { Vibrant } from "node-vibrant/browser";
import { PosterDetails, UploadResponse } from "./UploadPage";
import { toast } from "sonner";
import { createPoster } from "@/actions/posterActions";

const EnterPosterDetails = ({
  posterImage,
  setPosterDetails,
  posterDetails,
}: {
  posterImage: UploadResponse[];
  setPosterDetails: React.Dispatch<React.SetStateAction<PosterDetails>>;
  posterDetails: PosterDetails;
}) => {
  const [isPending, startTransition] = useTransition();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const router = useRouter();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const result = await createPoster(posterDetails);

        if (result.success) {
          toast.success("Poster submitted successfully! 🖼️", {
            description: "Thank you for your work! 🙏",
          });
          router.replace("/");
        } else {
          toast.error("Something went wrong 😢", {
            description: result.error || "Failed to create poster",
          });
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error("Something went wrong 😢", {
            description: error.message,
          });
        } else {
          toast.error("Something went wrong 😢");
        }
      }
    });
  };
  return (
    <div className="flex w-full mb-20">
      <div className="relative w-full flex justify-center items-center">
        {isImageLoading && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loadingText"
          >
            Loading...
          </motion.div>
        )}
        <form
          onSubmit={handleSubmit}
          className="w-full flex justify-center items-center flex-col"
        >
          <div className="flex w-full px-4 flex-col md:flex-row justify-between md:py-10 md:h-[720px] gap-10">
            <UploadLeft
              colors={posterDetails.colors}
              posterDetails={posterDetails}
              setPosterDetails={setPosterDetails}
            />
            <motion.div
              className="h-[600px] w-full flex justify-center items-center sm:w-[500px] mx-auto "
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
                onLoad={handleImageLoad}
              />
            </motion.div>
            <UploadRight
              posterDetails={posterDetails}
              setPosterDetails={setPosterDetails}
            />
          </div>
          <button
            type="submit"
            className="bg-accent px-4 py-2 border cursor-pointer"
          >
            {isPending ? "Creating..." : "Create new poster"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnterPosterDetails;
