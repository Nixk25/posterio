"use client";
import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
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
