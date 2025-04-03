"use client";
import LoginBlock from "@/components/Login/LoginBlock";
import BigTextEffect from "@/components/Login/BigTextEffect";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/auth-client";
import { toast } from "sonner";

const steps = [
  {
    headline: "Name",
    nameInput: "John Doe",
    name: "Your name",
    type: "text",
    key: "name",
  },
  {
    headline: "Email",
    nameInput: "johndoe@gmail.com",
    name: "Your email",
    type: "email",
    key: "email",
  },
  {
    headline: "Password",
    nameInput: "*******",
    name: "Your password",
    type: "password",
    key: "password",
  },
];

const MainRegisterClient = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nextStep = () => {
    if (step < steps.length - 1) {
      setDirection(1);
      setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 50);
    } else {
      handleRegistration();
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

  const onSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    nextStep();
  };

  const handleRegistration = async () => {
    console.log(formData);
    await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      },
      {
        onSuccess: () => {
          toast("Account created", {
            description:
              "Your account has been created. Check your email for a verification link.",
          });
        },
        onError: (ctx) => {
          console.log("Error:", ctx);
          toast.error("Something went wrong", {
            description: "Please try again later.",
          });
        },
      }
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex min-h-screen relative border border-t-0 border-b-0 items-center flex-col overflow-hidden"
    >
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
            type={steps[step].type}
            value={formData[(steps[step].key as keyof typeof formData) || ""]}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [steps[step].key as keyof typeof formData]: e.target.value,
              }))
            }
            nextStep={nextStep}
            backStep={backStep}
            step={step}
            steps={steps}
          />
        </motion.div>
      </AnimatePresence>
    </form>
  );
};

export default MainRegisterClient;
