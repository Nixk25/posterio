"use client";
import React from "react";
import { motion } from "motion/react";
const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="loadingText min-h-screen flex justify-center items-center"
    >
      Loading...
    </motion.div>
  );
};

export default Loader;
