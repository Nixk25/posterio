"use client";
import React from "react";
import { motion } from "motion/react";
const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl"
    >
      Loading...
    </motion.div>
  );
};

export default Loading;
