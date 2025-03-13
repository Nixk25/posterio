import React from "react";
import FiltersSidebar from "./FiltersSidebar";
import InputBoosted from "../InputBoosted";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="sticky top-0   flex justify-between items-center w-full h-full border-l border-r">
      <InputBoosted
        name="what are you looking for?"
        icon={<Search size={20} className="cursor-pointer" />}
      />
      <FiltersSidebar />
    </div>
  );
};

export default SearchBar;
