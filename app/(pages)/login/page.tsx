import LoginBlock from "@/components/Login/LoginBlock";
import BigTextEffect from "@/components/Login/BigTextEffect";
import React from "react";
const Login = () => {
  return (
    <div className="flex min-h-screen relative  border border-t-0 border-b-0 items-center flex-col">
      <BigTextEffect direction={1} headline="Login" />
      <LoginBlock nameInput="johndoe@gmail.com" name="Email address" />
    </div>
  );
};

export default Login;
