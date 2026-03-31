"use client";
import { useFilterContext } from "@/context/FilterContext";
import TransitionLink from "../TransitionLink";
import React from "react";

const ReloadButton = () => {
  const { clearFilters } = useFilterContext();
  return (
    <TransitionLink
      onClick={clearFilters}
      href="/"
      className="text-lg sm:text-2xl absolute -translate-1/2 top-1/2 left-1/2 z-10"
    >
      POSTERIO
    </TransitionLink>
  );
};

export default ReloadButton;
