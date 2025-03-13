import React from "react";
import { ListFilter } from "lucide-react";
const FilterButton = ({
  setShowFilters,
}: {
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="p-[4px] sm:p-[2px] bg-background relative z-5 border-t-0  border border-r-0 hover:bg-accent transition-all duration-300 w-max cursor-pointer "
      onClick={() => setShowFilters((prev) => !prev)}
    >
      <ListFilter />
    </div>
  );
};

export default FilterButton;
