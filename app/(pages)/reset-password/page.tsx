"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/auth-client";
import { toast } from "sonner";
import BigTextEffect from "@/components/Login/BigTextEffect";
import InputBoosted from "@/components/InputBoosted";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token"));
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      await authClient.resetPassword({
        newPassword: formData.password,
        token: token || "",
      });
      toast.success("Password reset successfully");
      router.push("/login");
    } catch {
      toast.error("Failed to reset password", {
        description: "The link may have expired. Try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (token === undefined) return null;

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-2xl">Invalid reset link</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleReset}
      className="flex min-h-screen relative border border-t-0 border-b-0 items-center flex-col overflow-hidden"
    >
      <BigTextEffect headline="Reset Password" direction={1} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.7 }}
        className="min-w-[300px] py-[50px] md:py-[100px] bg-background w-[80%] max-w-[800px] border flex flex-col justify-center items-center z-2 mt-[-70px]"
      >
        <div className="w-full">
          <span className="p-4 text-3xl sm:text-6xl font-thin">New password</span>
          <InputBoosted
            type="password"
            isUppercase={false}
            name="********"
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            step={0}
            bgColor="#D8D9DC"
          />
        </div>
        <div className="w-full mt-4">
          <span className="p-4 text-3xl sm:text-6xl font-thin">Confirm password</span>
          <InputBoosted
            type="password"
            isUppercase={false}
            name="********"
            value={formData.confirmPassword}
            onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            step={1}
            bgColor="#D8D9DC"
          />
        </div>
        <div className="flex w-full px-4 mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-accent py-4 w-full border cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </motion.div>
    </form>
  );
}
