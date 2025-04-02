import Link from "next/link";
import React from "react";

const FooterLinksGroup = ({ items }: { items: string[] }) => {
  return (
    <div className="flex flex-col gap-3 border-b md:border p-4 md:border-t-0 md:border-b-0">
      {items.map((item, i) => (
        <Link href="#" key={i}>
          {item}
        </Link>
      ))}
    </div>
  );
};

export default FooterLinksGroup;
