import Link from "next/link";
import React from "react";
import Icons from "./Icons";

const TopFooter = () => {
  return (
    <div className="flex md:flex-col items-center md:items-start justify-between p-5 gap-3">
      <Link href="/" className="text-2xl ">
        Posterio
      </Link>
      <Icons />
    </div>
  );
};

export default TopFooter;
