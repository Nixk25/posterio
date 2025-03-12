import React from "react";
import { ListFilter } from "lucide-react";
const FilterButton = ({
  setShowFilters,
}: {
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="p-4 relative z-5 border-t-0 border-b-0 border hover:bg-accent transition-all duration-300 w-max cursor-pointer "
      onClick={() => setShowFilters((prev) => !prev)}
    >
      <ListFilter />
    </div>
  );
};

export default FilterButton;
