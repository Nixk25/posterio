"use client";
import React, { useState, useEffect } from "react";
import FiltersSidebar from "./FiltersSidebar";
import InputBoosted from "../InputBoosted";
import { Search } from "lucide-react";
import { useFilterContext } from "@/context/FilterContext";

const SearchBar = () => {
  const { searchQuery, performSearch, clearSearch, setSearchQuery } =
    useFilterContext();
  const [search, setSearch] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Sync local search with context on mount (for URL params) - only once
  useEffect(() => {
    if (!isInitialized && searchQuery) {
      setSearch(searchQuery);
      setIsInitialized(true);
    }
  }, [searchQuery, isInitialized]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.trim().length >= 3) {
        setSearchQuery(search);
        performSearch(search);
      } else if (search.trim().length === 0) {
        setSearchQuery("");
        clearSearch();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, performSearch, clearSearch, setSearchQuery]);

  return (
    <form className="sticky top-0 z-99999   flex justify-between items-center w-full h-full border-l border-r">
      <InputBoosted
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        name="what are you looking for?"
        icon={<Search size={20} className="cursor-pointer" />}
        bgColor="#D8D9DC"
        required={false}
      />
      <FiltersSidebar />
    </form>
  );
};

export default SearchBar;
