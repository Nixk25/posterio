import React from "react";
import { motion } from "motion/react";
import InputBoosted from "../InputBoosted";

type PosterDetails = {
  author: string;
  description: string;
  fonts: string[];
  colors: string[];
};

type UploadInfoProps = {
  field: keyof PosterDetails;
  label: string;
  posterDetails: PosterDetails;
  setPosterDetails: React.Dispatch<React.SetStateAction<PosterDetails>>;
};

const UploadInfo: React.FC<UploadInfoProps> = ({
  field,
  label,
  posterDetails,
  setPosterDetails,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="flex flex-col justify-center"
    >
      <span className="font-bold detailHeadline text-3xl">{label}</span>
      <InputBoosted
        value={posterDetails[field]}
        onChange={(e) =>
          setPosterDetails((prev) => ({
            ...prev,
            [field]: e.target.value,
          }))
        }
        name={label}
      />
    </motion.div>
  );
};

export default UploadInfo;
