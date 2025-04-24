import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Step } from "./LoginBlock";

const LoginButtons = ({
  step,
  backStep,
  steps,
  isLogin,
  isLoading,
}: {
  step: number;
  backStep: () => void;
  nextStep: () => void;
  steps: Step[];
  isLogin: boolean;
  isLoading?: boolean;
}) => {
  return (
    <div className="flex w-full gap-5">
      {step >= 1 && (
        <button
          type="button"
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
        type="submit"
        className="bg-accent py-4 w-full border cursor-pointer"
      >
        <div className="flex gap-1 items-center justify-center">
          {steps && steps.length > 0 && step === steps.length - 1
            ? isLogin
              ? "Log me in"
              : isLoading
                ? "Creating account..."
                : "Create new account"
            : "Next"}
          <ChevronRight size={20} />
        </div>
      </button>
    </div>
  );
};

export default LoginButtons;
