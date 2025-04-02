import React from "react";
import TopFooter from "./TopFooter";
import BottomFooter from "./BottomFooter";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-between bg-[#DDDADA] border ">
      <TopFooter />
      <BottomFooter />
    </footer>
  );
};

export default Footer;
