import React from "react";
import LogOutButton from "./LogOutButton";
import { Plus } from "lucide-react";
import ProfileButton from "./ProfileButton";
import Link from "next/link";

const LoggedInNavbar = () => {
  return (
    <div className="flex items-center justify-center gap-5">
      <Link href="/upload" className="relative">
        <div className="bg-accent text-black rounded-full size-10 flex justify-center items-center">
          <Plus size={20} />
        </div>
      </Link>
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
