"use client";
import LoginBlock from "@/components/Login/LoginBlock";
import BigTextEffect from "@/components/Login/BigTextEffect";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { headline: "Name", nameInput: "John Doe", name: "Your name" },
  { headline: "Email", nameInput: "johndoe@gmail.com", name: "Your email" },
  { headline: "Password", nameInput: "*******", name: "Your password" },
];

const Register = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextStep = () => {
    if (step < steps.length - 1) {
      setDirection(1);

      setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 50);
    }
  };

  const backStep = () => {
    if (step > 0) {
      setDirection(-1);

      setTimeout(() => {
        setStep((prev) => prev - 1);
      }, 50);
    }
  };

  return (
    <div className="flex min-h-screen relative border border-t-0 border-b-0 items-center flex-col overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction < 0 ? 100 : -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full flex flex-col items-center"
        >
          <BigTextEffect
            direction={direction}
            headline={steps[step].headline}
          />
          <LoginBlock
            nameInput={steps[step].nameInput}
            name={steps[step].name}
            nextStep={nextStep}
            backStep={backStep}
            step={step}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Register;
