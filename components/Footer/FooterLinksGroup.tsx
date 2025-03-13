import Link from "next/link";
import React from "react";

const FooterLinksGroup = ({ items }: { items: string[] }) => {
  return (
    <div className="flex flex-col gap-3 border-b sm:border p-4 sm:border-t-0 sm:border-b-0">
      {items.map((item, i) => (
        <Link href="#" key={i}>
          {item}
        </Link>
      ))}
    </div>
  );
};

export default FooterLinksGroup;
