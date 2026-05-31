"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Links() {
  const pathName = usePathname();

  return (
    <header
      className="flex justify-between pr-6 pl-6 w-screen py-[1vw] fixed z-50 bg-background shadow-2xl
    border-b-[0.5px] border-gray-800"
    >
      <div className="font-bold text-lg ">Abhishek</div>
      <nav className="flex gap-[2vw]">
        <div
          className={`text-gray-400 ${pathName === "/" ? "text-white font-bold" : ""}  hover:text-white`}
        >
          <Link href="/">Home</Link>
        </div>
        <div
          className={`text-gray-400 ${pathName === "/work" ? "text-white font-bold" : ""}  hover:text-white`}
        >
          <Link href="/work">Work</Link>
        </div>
        <div
          className={`text-gray-400 ${pathName === "/about" ? "text-white font-bold" : ""}  hover:text-white`}
        >
          <Link href="/about">About</Link>
        </div>
        <div
          className={`text-gray-400 ${pathName === "/contact" ? "text-white font-bold" : ""}  hover:text-white`}
        >
          <Link href="/contact">Contact</Link>
        </div>
        <div
          className={`text-gray-400 ${pathName === "/blog" ? "text-white font-bold" : ""}  hover:text-white`}
        >
          <Link href="/blog">Blog</Link>
        </div>
        <div>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
