import TransitionLink from "../TransitionLink";
import React from "react";
import Icons from "./Icons";

const TopFooter = () => {
  return (
    <div className="flex md:flex-col items-center md:items-start justify-between p-5 gap-3">
      <TransitionLink href="/" className="text-2xl ">
        Posterio
      </TransitionLink>
      <Icons />
    </div>
  );
};

export default TopFooter;
