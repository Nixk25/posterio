import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import LoginButtons from "./LoginButtons";
import { Step } from "./LoginBlock";

const LoginBlockBottom = ({
  step,
  backStep,
  nextStep,
  steps,
}: {
  step: number;
  backStep: () => void;
  nextStep: () => void;
  steps: Step[];
}) => {
  const pathname = usePathname();
  const isLogin = pathname === "/login";
  return (
    <>
      {isLogin && (
        <div className="flex text-xs sm:text-base w-full px-4 py-2 justify-between items-center">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>Remember Me</span>
          </div>
          <span className=" underline cursor-pointer">Forgot password</span>
        </div>
      )}
      <div className="flex w-full justify-center items-center gap-2 flex-col px-4 mt-2">
        <LoginButtons
          step={step}
          steps={steps}
          backStep={backStep}
          nextStep={nextStep}
          isLogin={isLogin}
        />
        <Link
          href={isLogin ? "/register" : "/login"}
          className="underline cursor-pointer"
        >
          {isLogin ? "Create new profile" : "I already have an account"}
        </Link>
      </div>
    </>
  );
};

export default LoginBlockBottom;
