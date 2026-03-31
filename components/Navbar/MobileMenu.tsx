"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import TransitionLink from "../TransitionLink";
import { NAVBAR_LINKS } from "@/app/constants";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/context/SoundContext";
import { Volume2, VolumeOff } from "lucide-react";

const MobileMenu = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMuted, toggleMute } = useSound();

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 cursor-pointer"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-background border-b z-50 pt-[40px]"
          >
            <ul className="flex flex-col p-4 gap-3">
              {NAVBAR_LINKS.map((link) => (
                <li key={link.name}>
                  <TransitionLink
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg"
                  >
                    {link.name}
                  </TransitionLink>
                </li>
              ))}
              {isLoggedIn && (
                <>
                  <li>
                    <TransitionLink
                      href="/upload"
                      onClick={() => setIsOpen(false)}
                      className="text-lg"
                    >
                      Upload
                    </TransitionLink>
                  </li>
                  <li>
                    <TransitionLink
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="text-lg"
                    >
                      Profile
                    </TransitionLink>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={toggleMute}
                  className="flex items-center gap-2 text-lg cursor-pointer"
                >
                  {isMuted ? <VolumeOff size={18} /> : <Volume2 size={18} />}
                  {isMuted ? "Unmute" : "Mute"}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
