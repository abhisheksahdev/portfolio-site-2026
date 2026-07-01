"use client";

import "./page.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathName = usePathname();

  return (
    <header
      className="flex justify-between pr-6 pl-6 w-screen py-[1vw] fixed z-50 bg xshadow-2xl
    xborder-b-[0.5px] xborder-gray-800 items-center"
    >
      <div className="font-bold text-3xl font-logo">
        <Link href="/">.AVI</Link>
      </div>
      <nav className="flex items-center">
        <div
          className={`text-gray-400 ${pathName === "/" ? "text-white font-bold" : ""}  hover:text-white block px-4 py-2`}
        >
          <Link href="/">Home</Link>
        </div>
        <div
          className={`text-gray-400 ${pathName === "/work" ? "text-white font-bold" : ""}  hover:text-white px-4 py-2`}
        >
          <Link href="/work">Work</Link>
        </div>
        <div
          className={`text-gray-400 ${pathName === "/about" ? "text-white font-bold" : ""}  hover:text-white px-4 py-2`}
        >
          <Link href="/about">About</Link>
        </div>

        <div
          className={`text-gray-400 ${pathName === "/blog" ? "text-white font-bold" : ""}  hover:text-white px-4 py-2`}
        >
          <Link href="/blog">Blog</Link>
        </div>
        <div
          className={`text-gray-400 ${pathName === "/contact" ? "text-white font-bold" : ""}  hover:text-white px-4 py-2`}
        >
          <Link href="/contact">Start Project</Link>
        </div>
      </nav>
    </header>
  );
}
