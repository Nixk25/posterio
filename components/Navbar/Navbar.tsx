"use client";
import React from "react";
import { NAVBAR_LINKS } from "@/app/constants";
import Link from "next/link";
import { AlignJustify } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full p-2 border-t-0 border relative">
      <nav className="flex sm:px-4 justify-between items-center">
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

        <Link href="/login">
          <button className="bg-accent px-4 py-2 border cursor-pointer ">
            Login
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
