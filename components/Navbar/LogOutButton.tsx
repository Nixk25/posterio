"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/auth-client";
import { toast } from "sonner";
const LogOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.info("You have been logged out successfully.");
            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
    }
  };
  return (
    <button
      onClick={handleSignOut}
      className="bg-accent px-4 py-2 border cursor-pointer text-nowrap  "
    >
      Log out
    </button>
  );
};

export default LogOutButton;
