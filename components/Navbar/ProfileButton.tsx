import { User } from "lucide-react";

import TransitionLink from "../TransitionLink";
import React from "react";

const ProfileButton = () => {
  return (
    <TransitionLink href="/profile">
      <div className="bg-black text-accent size-7 sm:size-10 flex justify-center items-center">
        <User size={14} className="sm:hidden" />
        <User size={20} className="hidden sm:block" />
      </div>
    </TransitionLink>
  );
};

export default ProfileButton;
