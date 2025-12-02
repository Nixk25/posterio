"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { filterPosters } from "@/actions/filtersActions";
import { searchPosters } from "@/actions/searchActions";
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
  searchQuery: string;
  searchResults: PosterType[];
  isSearching: boolean;
  setSearchQuery: (query: string) => void;
  performSearch: (query: string) => Promise<void>;
  clearSearch: () => void;
}>({
  filters: defaultFilters,
  toggleFilter: () => {},
  setMultipleFilters: () => {},
  clearFilters: () => {},
  fetchFilteredPosters: async () => {},
  filteredPosters: [],
  isFiltered: false,
  filterPending: false,
  searchQuery: "",
  searchResults: [],
  isSearching: false,
  setSearchQuery: () => {},
  performSearch: async () => {},
  clearSearch: () => {},
});

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filterPending, setFilterPending] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const [filteredPosters, setFilteredPosters] = useState<PosterType[]>([]);
  const [initialized, setInitialized] = useState(false);
  const initialFetchDone = useRef(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PosterType[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Load filters and search from URL on mount
  useEffect(() => {
    if (!initialized) {
      const urlColors = searchParams.get("colors")?.split(",").filter(Boolean) || [];
      const urlFonts = searchParams.get("fonts")?.split(",").filter(Boolean) || [];
      const urlTools = searchParams.get("tools")?.split(",").filter(Boolean) || [];
      const urlCategories = searchParams.get("categories")?.split(",").filter(Boolean) || [];
      const urlSearch = searchParams.get("q") || "";

      const hasFilters = urlColors.length > 0 || urlFonts.length > 0 || urlTools.length > 0 || urlCategories.length > 0;

      if (hasFilters) {
        setFilters({
          colors: urlColors,
          fonts: urlFonts,
          tools: urlTools,
          categories: urlCategories,
        });
        setIsFiltered(true);
      }

      if (urlSearch) {
        setSearchQuery(urlSearch);
      }

      setInitialized(true);
    }
  }, [searchParams, initialized]);

  // Update URL when filters or search change
  useEffect(() => {
    if (!initialized) return;

    const params = new URLSearchParams();

    if (filters.colors.length > 0) params.set("colors", filters.colors.join(","));
    if (filters.fonts.length > 0) params.set("fonts", filters.fonts.join(","));
    if (filters.tools.length > 0) params.set("tools", filters.tools.join(","));
    if (filters.categories.length > 0) params.set("categories", filters.categories.join(","));
    if (searchQuery) params.set("q", searchQuery);

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;

    router.replace(newUrl, { scroll: false });
  }, [filters, searchQuery, router, initialized]);

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

  // Search functions
  const performSearch = useCallback(
    async (query: string) => {
      try {
        setIsSearching(true);
        const result = await searchPosters({
          query,
          filters: {
            categories: filters.categories,
            colorGroups: filters.colors,
            fontCategories: filters.fonts,
            tools: filters.tools,
          },
        });
        if (result.success) {
          setSearchResults(result.data);
        }
      } catch (err) {
        console.error("Failed to search posters:", err);
      } finally {
        setIsSearching(false);
      }
    },
    [filters]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
    setFilteredPosters([]);
    setIsFiltered(false);
    clearSearch();
  }, [clearSearch]);

  // Auto-clear filters when all are empty
  useEffect(() => {
    const allFiltersEmpty =
      filters.colors.length === 0 &&
      filters.fonts.length === 0 &&
      filters.tools.length === 0 &&
      filters.categories.length === 0;

    if (allFiltersEmpty && isFiltered) {
      setFilteredPosters([]);
      setIsFiltered(false);
      clearSearch();
    }
  }, [filters, isFiltered, clearSearch]);

  // Auto-fetch filtered posters when URL params are loaded (only once on init)
  useEffect(() => {
    if (!initialized || initialFetchDone.current) return;

    const hasFilters = filters.colors.length > 0 || filters.fonts.length > 0 || filters.tools.length > 0 || filters.categories.length > 0;
    const hasSearch = searchQuery.length >= 3;

    if (hasSearch) {
      performSearch(searchQuery);
      initialFetchDone.current = true;
    } else if (hasFilters) {
      fetchFilteredPosters();
      initialFetchDone.current = true;
    } else {
      initialFetchDone.current = true;
    }
  }, [initialized, filters, searchQuery, performSearch, fetchFilteredPosters]);

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
        searchQuery,
        searchResults,
        isSearching,
        setSearchQuery,
        performSearch,
        clearSearch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
