"use client";

import React, { createContext, useContext, useState } from "react";
import { filterPosters } from "@/actions/filtersActions";
import { PosterType } from "@/app/(pages)/poster/[slug]/page";

type FiltersState = {
  colors: string[];
  fonts: string[];
  tools: string[];
  categories: string[];
  [key: string]: string[];
};

const defaultFilters: FiltersState = {
  colors: [],
  fonts: [],
  tools: [],
  categories: [],
};

const FilterContext = createContext<{
  filters: FiltersState;
  toggleFilter: (key: string, value: string) => void;
  setMultipleFilters: (key: string, values: string[]) => void;
  clearFilters: () => void;
  fetchFilteredPosters: () => Promise<void>;
  filteredPosters: PosterType[];
  isFiltered: boolean;
  filterPending: boolean;
}>({
  filters: defaultFilters,
  toggleFilter: () => {},
  setMultipleFilters: () => {},
  clearFilters: () => {},
  fetchFilteredPosters: async () => {},
  filteredPosters: [],
  isFiltered: false,
  filterPending: false,
});

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filterPending, setFilterPending] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const [filteredPosters, setFilteredPosters] = useState<PosterType[]>([]);

  const toggleFilter = (key: string, value: string) => {
    setFilters((prev) => {
      const current = prev[key] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  const setMultipleFilters = (key: string, values: string[]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: values,
    }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setFilteredPosters([]);
    setIsFiltered(false);
  };

  const fetchFilteredPosters = async () => {
    try {
      setFilterPending(true);
      const data = await filterPosters(filters);
      setFilteredPosters(data);
      setIsFiltered(true);
    } catch (err) {
      console.error("Failed to fetch filtered posters:", err);
    } finally {
      setFilterPending(false);
    }
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        toggleFilter,
        setMultipleFilters,
        clearFilters,
        fetchFilteredPosters,
        filteredPosters,
        isFiltered,
        filterPending,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
