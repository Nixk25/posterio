import MainRegisterClient from "@/components/Login/MainRegisterClient";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Posterio | Register",
  description:
    "Register to your account to access your profile and start creating your posters.",
};

const Register = () => {
  return <MainRegisterClient />;
};

export default Register;
