import React from "react";
import { NAVBAR_LINKS } from "@/app/constants";
import Link from "next/link";
import { auth } from "@/auth";
import { headers } from "next/headers";

import LoggedInNavbar from "./LoggedInNavbar";
const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header className="w-full p-2 border-t-0 border relative">
      <nav className="flex sm:px-4 justify-between items-center">
        <ul className="flex items-center gap-4 text-xs sm:text-base  ">
          {NAVBAR_LINKS.map((link) => (
            <li key={link.name}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className="text-2xl absolute -translate-1/2 top-1/2 left-1/2 "
        >
          POSTERIO
        </Link>
        {!session ? (
          <Link href="/login">
            <button className="bg-accent px-4 py-2 border cursor-pointer ">
              Login
            </button>
          </Link>
        ) : (
          <LoggedInNavbar />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
