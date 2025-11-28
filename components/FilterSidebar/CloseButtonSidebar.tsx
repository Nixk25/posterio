import React from "react";
import { X } from "lucide-react";

const CloseButtonSidebar = ({
  setShowFilters,
}: {
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => setShowFilters(false)}
      className="absolute top-2 right-2 cursor-pointer"
    >
      <X />
    </button>
  );
};

export default CloseButtonSidebar;
