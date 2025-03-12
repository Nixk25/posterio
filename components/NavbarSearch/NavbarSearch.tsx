"use client";
import React, { useState } from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const NavbarSearch = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  return (
    <div>
      <Navbar setIsSearchActive={setIsSearchActive} />
      <SearchBar
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
      />
    </div>
  );
};

export default NavbarSearch;
