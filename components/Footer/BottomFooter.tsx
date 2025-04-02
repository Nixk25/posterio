import React from "react";
import FooterLinksGroup from "./FooterLinksGroup";
import NewsletterFooterSection from "./NewsletterFooterSection";

const BottomFooter = () => {
  return (
    <div className="flex md:flex-row flex-col md:gap-20">
      <div className="border-t md:border-t-0">
        <FooterLinksGroup
          items={["Shop", "Gallery", "New arrivals", "Best sellers"]}
        />
      </div>
      <FooterLinksGroup
        items={["Support", "Contact Us", "Faq", "Shipping & Returns"]}
      />
      <NewsletterFooterSection />
    </div>
  );
};

export default BottomFooter;
