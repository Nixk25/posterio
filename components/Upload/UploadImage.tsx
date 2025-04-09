import React from "react";
import { UploadDropzone } from "@/app/utils/uploadthing";
import { toast } from "sonner";
import { PosterDetails, UploadResponse } from "./UploadPage";

const UploadImage = ({
  setPosterImage,
  setPosterDetails,
}: {
  setPosterImage: React.Dispatch<React.SetStateAction<UploadResponse[] | null>>;
  setPosterDetails: React.Dispatch<React.SetStateAction<PosterDetails>>;
}) => {
  return (
    <UploadDropzone
      config={{ mode: "auto" }}
      appearance={{
        button:
          "bg-accent ut-readying:text-black ut-ready:bg-accent ut-readying:bg-accent/50 ut-uploading:bg-accent/50 ut-uploading:cursor-not-allowed ut-ready:text-black rounded-none ut-uploading:ring-0 ut-uploading:outline-none ut-uploading:ring-offset-0 ut-ready:ring-0 ut-ready:outline-none ut-ready:ring-offset-0 ",
        container:
          " focus:bg-accent/20 text-nowrap w-full ring-0 bg-none mt-4 cursor-pointer border-none h-[600px]",
      }}
      content={{
        label: "Upload your poster image",
        allowedContent: "Only PNG & JPG & WEBP images (max 16MB)",
      }}
      className=" ut-label:text-black   uploadButton ut-label:text-xl  "
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
  );
};

export default UploadImage;
