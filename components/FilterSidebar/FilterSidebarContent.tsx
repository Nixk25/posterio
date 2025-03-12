import React, { useEffect, useRef } from "react";
import { Filters } from "@/app/constants";
import { motion } from "motion/react";
import CloseButtonSidebar from "./CloseButtonSidebar";
import Filter from "./Filter";
const FilterSidebarContent = ({
  setShowFilters,
  showFilters,
}: {
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  showFilters: boolean;
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClose = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key === "Escape") {
        setShowFilters(false);
      } else if (
        event instanceof MouseEvent &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener("mousedown", handleClose);
      document.addEventListener("keydown", handleClose);
    }

    return () => {
      document.removeEventListener("mousedown", handleClose);
      document.removeEventListener("keydown", handleClose);
    };
  }, [showFilters, setShowFilters]);
  return (
    <motion.div
      ref={sidebarRef}
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-background border border-t-0  absolute top-0 left-0  z-5 flex justify-evenly gap-5 w-full "
    >
      <CloseButtonSidebar setShowFilters={setShowFilters} />
      {Filters.map((filter) => (
        <Filter filter={filter} key={filter.key} />
      ))}
    </motion.div>
  );
};

export default FilterSidebarContent;
