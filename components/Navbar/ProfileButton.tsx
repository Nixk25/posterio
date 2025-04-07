import { User } from "lucide-react";

import Link from "next/link";
import React from "react";

const ProfileButton = () => {
  return (
    <Link href="/profile">
      <div className="bg-black text-accent rounded-full size-10 flex justify-center items-center">
        <User size={20} />
      </div>
    </Link>
  );
};

export default ProfileButton;
