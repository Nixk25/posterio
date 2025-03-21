"use client";
import React, { useState } from "react";
import InputBoosted from "../InputBoosted";

const NewsletterFooterSection = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  return (
    <div className="flex flex-col gap-3 border-b sm:border p-4 sm:border-t-0 sm:border-b-0 ">
      <span>Newsletter</span>
      <span>Subscribe for updates</span>
      <div className="flex relative gap-5">
        <InputBoosted
          value={newsletterEmail}
          onChange={(e) => setNewsletterEmail(e.target.value)}
          isUppercase={false}
          name="youremail@gmail.com"
        />
        <button className="bg-accent px-4 py-2 border cursor-pointer ">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsletterFooterSection;
