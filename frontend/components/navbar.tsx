"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="block top-20 w-full py-10 md:py-14 px-20 md:px-36">
      <div className="flex items-center justify-between md:mx-auto">
        {/* Logo */}
        <div className="text-5xl text-[#FFFFFF] font-semibold font-sans tracking-wide">
          <Link href="/">
            <span className="block ">Reti</span>
            <span className="block ml-10">Nova</span>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 text-4xl text-[#858585] text-right font-sans font-light">
          <Link
          href="/about" 
          className="hover:underline hover:text-[#FFFFFF]">
          OVERVIEW
          </Link>
          <Link 
            href="/" 
            className="hover:underline hover:text-[#FFFFFF]">
            HOME
          </Link>        
        </div>
      </div>
    </nav>
  );
}
