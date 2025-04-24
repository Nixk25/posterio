"use client";
import { useFilterContext } from "@/context/FilterContext";
import Link from "next/link";
import React from "react";

const ReloadButton = () => {
  const { clearFilters } = useFilterContext();
  return (
    <Link
      onClick={clearFilters}
      href="/"
      className="text-2xl absolute -translate-1/2 top-1/2 left-1/2 "
    >
      POSTERIO
    </Link>
  );
};

export default ReloadButton;
