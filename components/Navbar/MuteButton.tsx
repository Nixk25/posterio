"use client";

import { Volume2, VolumeOff } from "lucide-react";
import { useSound } from "@/context/SoundContext";

const MuteButton = () => {
  const { isMuted, toggleMute } = useSound();

  return (
    <button
      onClick={toggleMute}
      className="p-1 sm:p-2 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted ? <VolumeOff size={20} /> : <Volume2 size={20} />}
    </button>
  );
};

export default MuteButton;
