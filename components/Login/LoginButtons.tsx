import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const LoginButtons = ({
  step,
  backStep,
  nextStep,
  isLogin,
}: {
  step: number;
  backStep: () => void;
  nextStep: () => void;
  isLogin: boolean;
}) => {
  return (
    <div className="flex w-full gap-5">
      {step >= 1 && (
        <button
          onClick={backStep}
          className="bg-accent py-4 w-full border cursor-pointer"
        >
          <div className="flex gap-1 items-center justify-center">
            <ChevronLeft size={20} />
            Back
          </div>
        </button>
      )}
      <button
        onClick={nextStep}
        className="bg-accent py-4 w-full border cursor-pointer"
      >
        <div className="flex gap-1 items-center justify-center">
          {isLogin ? "Log me in" : "Next"}
          {!isLogin && <ChevronRight size={20} />}
        </div>
      </button>
    </div>
  );
};

export default LoginButtons;
