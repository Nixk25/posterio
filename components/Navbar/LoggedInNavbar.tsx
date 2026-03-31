import React from "react";
import LogOutButton from "./LogOutButton";
import { Plus } from "lucide-react";
import ProfileButton from "./ProfileButton";
import TransitionLink from "../TransitionLink";

const LoggedInNavbar = () => {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-5">
      <TransitionLink href="/upload" className="relative">
        <div className="bg-accent text-black size-7 sm:size-10 flex justify-center items-center">
          <Plus size={14} className="sm:hidden" />
          <Plus size={20} className="hidden sm:block" />
        </div>
      </TransitionLink>
      <div className="relative group">
        <ProfileButton />
        <div className="absolute -bottom-[40px] group-hover:flex hidden -left-15 z-[999999999]">
          <LogOutButton />
        </div>
      </div>
    </div>
  );
};

export default LoggedInNavbar;
