import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import CloseButtonSidebar from "./CloseButtonSidebar";
import Filter from "./Filter";
import { getFilterOptions } from "@/actions/filtersActions";
import { useFilterContext } from "@/context/FilterContext";

type AvailableFilterOption = {
  label: string;
  value: string;
  color?: boolean;
};

type AvailableFilters = {
  categories: AvailableFilterOption[];
  colors: AvailableFilterOption[];
  fonts: AvailableFilterOption[];
  tools: AvailableFilterOption[];
};

const FilterSidebarContent = ({
  setShowFilters,
  showFilters,
}: {
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  showFilters: boolean;
}) => {
  const { fetchFilteredPosters } = useFilterContext();
  const { filters } = useFilterContext();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [availableFilters, setAvailableFilters] =
    useState<AvailableFilters | null>(null);

  useEffect(() => {
    const fetchFilters = async () => {
      const filters = await getFilterOptions();
      setAvailableFilters(filters);
    };

    fetchFilters();
  }, []);

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

  const hasActiveFilters = Object.values(filters).some(
    (values) => values.length > 0
  );

  return (
    <motion.div
      ref={sidebarRef}
      initial={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      exit={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-background border absolute top-7 flex-col left-0 z-99999 flex justify-evenly w-full overflow-auto"
    >
      <CloseButtonSidebar setShowFilters={setShowFilters} />
      <div className="flex">
        {!availableFilters ? (
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="loadingText min-h-[300px] w-full  flex justify-center items-center"
          >
            Loading...
          </motion.div>
        ) : (
          Object.entries(availableFilters).map(([key, options]) => (
            <Filter
              filter={{
                title: key,
                key,
                options,
              }}
              key={key}
            />
          ))
        )}
      </div>
      {hasActiveFilters && (
        <div
          className="flex w-full justify-center border-t cursor-pointer hover:bg-accent transition-all duration-300 ease-in-out items-center"
          onClick={(e) => {
            e.preventDefault();
            fetchFilteredPosters();
            setShowFilters(false);
          }}
        >
          <button className="cursor-pointer">Apply filters</button>
        </div>
      )}
    </motion.div>
  );
};

export default FilterSidebarContent;
