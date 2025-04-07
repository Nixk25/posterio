"use client";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import UploadInfo from "./UploadInfo";
import { PosterDetails } from "./UploadPage";
const EnterSocials = ({
  posterDetails,
  setPosterDetails,
}: {
  posterDetails: PosterDetails;
  setPosterDetails: React.Dispatch<React.SetStateAction<PosterDetails>>;
}) => {
  const [showUpload, setShowUpload] = useState(false);
  return (
    <div className="flex gap-2 absolute -top-20 md:bottom-12 left-0 md:left-4">
      {showUpload ? (
        <div className="flex items-end gap-5">
          <UploadInfo
            field="socials"
            label="Socials"
            posterDetails={posterDetails}
            setPosterDetails={setPosterDetails}
          />
          <button
            onClick={() => setShowUpload(false)}
            className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition"
          >
            <Minus size={20} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowUpload(true)}
          className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition"
        >
          <Plus size={20} />
        </button>
      )}
    </div>
  );
};

export default EnterSocials;
