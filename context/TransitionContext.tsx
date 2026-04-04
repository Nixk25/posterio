"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Toaster } from "sonner";

type TransitionContextType = {
  navigateTo: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  navigateTo: () => {},
});

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const navigateTo = useCallback((href: string) => {
    if (href === pathname || phase !== "idle") return;
    setPendingHref(href);
    setPhase("exit");
  }, [pathname, phase]);

  // After exit animation, navigate
  useEffect(() => {
    if (phase === "exit" && pendingHref) {
      const timer = setTimeout(() => {
        router.push(pendingHref);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [phase, pendingHref, router]);

  // When pathname changes, trigger enter
  useEffect(() => {
    if (phase === "exit") {
      setPhase("enter");
      setPendingHref(null);
      const timer = setTimeout(() => setPhase("idle"), 400);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      <Toaster richColors />
      <motion.div
        animate={
          phase === "exit"
            ? { opacity: 0, filter: "blur(8px)" }
            : { opacity: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </TransitionContext.Provider>
  );
};

export const useTransition = () => useContext(TransitionContext);
