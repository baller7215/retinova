"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";


export default function Navbar() {
  return (
    <footer className="flex bg-black text-white fixed bottom-0 right-0 px-6 w-full justify-end items-center gap-4">
        <p className="text-xl text-[#858585]">irvine hacks '25</p>
        <div>
        <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub className="w-10 h-10 text-[#858585] hover:text-gray-400" />
        </Link>
      </div>
    </footer>
  );
}
