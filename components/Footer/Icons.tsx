import React from "react";
import { Facebook, Instagram, Dribbble } from "lucide-react";
const Icons = () => {
  return (
    <div className="flex gap-3">
      <Dribbble size={20} className="hover:text-accent cursor-pointer" />
      <Facebook size={20} className="hover:text-accent cursor-pointer" />
      <Instagram size={20} className="hover:text-accent cursor-pointer" />
    </div>
  );
};

export default Icons;
