"use client";
import React from "react";
import { NAVBAR_LINKS } from "@/app/constants/constants";
import Link from "next/link";
import { Search, AlignJustify } from "lucide-react";

type NavbarProps = {
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ setIsSearchActive }: NavbarProps) => {
  return (
    <header className="w-full p-2   border-b relative">
      <nav className="flex container px-5 sm:px-0 mx-auto  justify-between items-center">
        <AlignJustify className="flex sm:hidden cursor-pointer" size={20} />
        <ul className="sm:flex items-center gap-4 hidden ">
          {NAVBAR_LINKS.map((link) => (
            <li className=" text-sm" key={link.name}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className="text-xl absolute -translate-1/2 top-1/2 left-1/2 "
        >
          POSTERIO
        </Link>
        <div className="flex items-center gap-5  ">
          <Link href="/login">
            <button className="bg-accent px-4 py-2 border cursor-pointer ">
              Login
            </button>
          </Link>
          <div onClick={() => setIsSearchActive(true)}>
            <Search size={20} className="cursor-pointer" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
