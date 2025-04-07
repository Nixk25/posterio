"use client";
import LoginBlock from "@/components/Login/LoginBlock";
import BigTextEffect from "@/components/Login/BigTextEffect";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const steps = [
  {
    headline: "Login",
    nameInput: "johndoe@gmail.com",
    name: "Your email",
    type: "email",
    key: "email",
  },
  {
    headline: "Login",
    nameInput: "*******",
    name: "Your password",
    type: "password",
    key: "password",
  },
];

const MainLoginClient = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
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
      handleLogin();
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

  const OnSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    nextStep();
  };

  const handleLogin = async () => {
    await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          if (ctx.response?.status === 401) {
            const errorMessage =
              ctx.error.message ||
              "User not found. Please check your credentials.";

            toast.error("Login failed", {
              description: errorMessage,
            });
          } else {
            const errorMessage = ctx.error.message || "Something went wrong";
            toast.error("Something went wrong", {
              description: errorMessage,
            });
          }
        },
      }
    );
  };
  return (
    <form
      onSubmit={OnSubmit}
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

export default MainLoginClient;
