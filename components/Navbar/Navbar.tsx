import React from "react";
import { NAVBAR_LINKS } from "@/app/constants";
import TransitionLink from "../TransitionLink";
import { auth } from "@/auth";
import { headers } from "next/headers";

import LoggedInNavbar from "./LoggedInNavbar";
import MuteButton from "./MuteButton";
import ReloadButton from "./ReloadButton";
import MobileMenu from "./MobileMenu";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header className="w-full p-2 border-t-0 border relative">
      <nav className="flex sm:px-4 justify-between items-center">
        {/* Desktop nav links */}
        <ul className="hidden sm:flex items-center gap-4 text-xs sm:text-base">
          {NAVBAR_LINKS.map((link) => (
            <li key={link.name}>
              <TransitionLink href={link.href}>{link.name}</TransitionLink>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <MobileMenu isLoggedIn={!!session} />

        <ReloadButton />
        <div className="flex items-center gap-2">
          <MuteButton />
          {!session ? (
            <TransitionLink href="/login">
              <button className="bg-accent px-3 py-1.5 sm:px-4 sm:py-2 border cursor-pointer text-sm sm:text-base">
                Login
              </button>
            </TransitionLink>
          ) : (
            <LoggedInNavbar />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
