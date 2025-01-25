"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";


export default function Navbar() {
  return (
    <footer className="absolute flex text-[#858585] font-sans bottom-2 ml-auto py-1 md:py-0 px-2 md:px-6 w-full justify-end items-center gap-2 md:gap-4">
        <div className="flex flex-col text-xs md:text-xl">
            <a href="https://www.youtube.com/watch?v=phuiiNCxRMg" target="_blank" className="text-center">made w/ 💥</a>
            <p>irvine hacks '25</p>
        </div>
        <div>
        <Link href="https://github.com/baller7215/resinova" target="_blank" rel="noopener noreferrer">
          <FaGithub className="w-5 md:w-10 h-5 md:h-10 hover:text-gray-400" />
        </Link>
      </div>
    </footer>
  );
}
