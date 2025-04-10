"use client";
import React from "react";
import { motion } from "motion/react";

const PosterDetail = ({
  name,
  detail,
}: {
  name: string;
  detail: string | string[] | React.ReactNode[] | null | undefined;
}) => {
  const isFlexLayout = name === "Colors" || name === "Tags";

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="flex flex-col justify-center"
    >
      <span className="font-bold detailHeadline text-3xl">{name}</span>
      <div className={`text-xl detailText ${isFlexLayout ? "flex gap-2" : ""}`}>
        {detail}
      </div>
    </motion.div>
  );
};

export default PosterDetail;
