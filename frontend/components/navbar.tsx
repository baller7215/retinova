"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black fixed top-20 w-full px-36">
      <div className="flex items-center justify-between mx-auto">
        {/* Logo */}
        <div className="text-5xl text-[#FFFFFF] font-bold tracking-wide">
          <Link href="/">
            <span className="block ">Reti</span>
            <span className="block ml-10">Nova</span>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex gap-10 text-4xl text-[#858585] font-thin">
          <Link
           href="/about" 
           className="hover:underline hover:text-[#FFFFFF]">
          Overview
          </Link>
          <Link 
            href="/" 
            className="hover:underline hover:text-[#FFFFFF]">
            Home
          </Link>        
        </div>
        </div>
    </nav>
  );
}
