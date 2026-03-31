"use client";
import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import FilterButton from "./FilterButton";
import FilterSidebarContent from "./FilterSidebarContent";
import { usePathname } from "next/navigation";

const FiltersSidebar = () => {
  const [showFilters, setShowFilters] = useState(false);
  const pathname = usePathname();
  if (pathname !== "/") {
    return null;
  }

  return (
    <div className="h-full">
      <AnimatePresence>
        <FilterButton setShowFilters={setShowFilters} />
      </AnimatePresence>
      {showFilters && (
        <button
          onClick={() => setShowFilters(false)}
          className="fixed top-[85px] right-3 cursor-pointer z-[9999999]"
        >
          <X />
        </button>
      )}
      <AnimatePresence>
        {showFilters && (
          <FilterSidebarContent
            setShowFilters={setShowFilters}
            showFilters={showFilters}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FiltersSidebar;
