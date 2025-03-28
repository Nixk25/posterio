import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SearchBar from "@/components/FilterSidebar/SearchBar";
import NavbarServer from "@/components/Navbar/NavbarServer";
import Footer from "@/components/Footer/Footer";
import { ViewTransitions } from "next-view-transitions";
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
    <ViewTransitions>
      <html lang="en">
        <body className={` ${ClashGroteskFont.className} antialiased`}>
          <NavbarServer />
          <SearchBar />
          {children}
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
