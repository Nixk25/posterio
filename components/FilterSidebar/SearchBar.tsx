"use client";
import React, { useState } from "react";
import FiltersSidebar from "./FiltersSidebar";
import InputBoosted from "../InputBoosted";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  return (
    <form className="sticky top-0 z-99999   flex justify-between items-center w-full h-full border-l border-r">
      <InputBoosted
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        name="what are you looking for?"
        icon={<Search size={20} className="cursor-pointer" />}
        bgColor="#D8D9DC"
      />
      <FiltersSidebar />
    </form>
  );
};

export default SearchBar;
