"use client";
import React from "react";
import InputBoosted from "../InputBoosted";
import LoginBlockBottom from "./LoginBlockBottom";
import { motion } from "motion/react";

export type Step = {
  headline: string;
  nameInput: string;
  name: string;
  type: string;
  key: string;
};

const LoginBlock = ({
  name,
  nameInput,
  nextStep,
  backStep,
  step,
  type = "text",
  value,
  onChange,
  steps,
}: {
  name: string;
  nameInput: string;
  nextStep?: () => void;
  backStep?: () => void;
  step?: number;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  steps: Step[];
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.7 }}
      className={`min-w-[300px] py-[50px] md:py-[100px] bg-background w-[80%] max-w-[800px] border flex flex-col justify-center items-center z-2 ${
        step === 2 ? "mt-0" : "mt-[-100px] md:mt-[-200px]"
      } `}
    >
      <div className="w-full">
        <span className="p-4 text-3xl sm:text-6xl font-thin">{name}</span>
        <InputBoosted
          type={type}
          isUppercase={false}
          name={nameInput}
          value={value}
          onChange={onChange}
          step={step!}
          bgColor="#D8D9DC"
        />
      </div>
      <LoginBlockBottom
        step={step!}
        backStep={backStep!}
        nextStep={nextStep!}
        steps={steps}
      />
    </motion.div>
  );
};

export default LoginBlock;
