import MainLoginClient from "@/components/Login/MainLoginClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posterio | Login",
  description:
    "Login to your account to access your profile and start creating your posters.",
};

const Login = () => {
  return <MainLoginClient />;
};

export default Login;
