import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavbarSearch from "@/components/NavbarSearch/NavbarSearch";

const ClashGroteskFont = localFont({
  src: "./fonts/ClashGrotesk-Variable.woff2",
});

export const metadata: Metadata = {
  title: "Posterio",
  description:
    "Discover original and stylish posters at Posterio. Minimalist, modern, and experimental designs that will stand out in any space. Create a unique atmosphere with our exclusive prints.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${ClashGroteskFont.className} antialiased`}>
        <NavbarSearch />
        {children}
      </body>
    </html>
  );
}
