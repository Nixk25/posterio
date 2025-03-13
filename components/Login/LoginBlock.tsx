"use client";
import React from "react";
import InputBoosted from "../InputBoosted";
import LoginBlockBottom from "./LoginBlockBottom";
import { motion } from "motion/react";

const LoginBlock = ({
  name,
  nameInput,
  nextStep,
  backStep,
  step,
}: {
  name: string;
  nameInput: string;
  nextStep?: () => void;
  backStep?: () => void;
  step?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.7 }}
      className={`min-w-[300px] py-[100px] bg-background w-[80%] max-w-[800px] border flex flex-col justify-center items-center z-2 ${
        step === 2 ? "mt-0" : "mt-[-200px]"
      } `}
    >
      <div className="w-full">
        <span className="p-4 text-3xl sm:text-6xl font-thin">{name}</span>
        <InputBoosted isUppercase={false} name={nameInput} />
      </div>
      <LoginBlockBottom
        step={step!}
        backStep={backStep!}
        nextStep={nextStep!}
      />
    </motion.div>
  );
};

export default LoginBlock;
