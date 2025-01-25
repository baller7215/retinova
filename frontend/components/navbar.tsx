"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="block top-20 w-full py-6 md:py-14 px-6 md:px-36">
      <div className="flex items-center justify-between md:mx-auto">
        {/* Logo */}
        <div className="text-3xl md:text-5xl text-[#FFFFFF] font-semibold font-sans tracking-wide">
          <Link href="/">
            <div className="flex">
              <span className="block mr-1">Reti</span>
              <Image 
                src="/logo.png" 
                alt="Logo"
                width="75"
                height="75"
                className="max-w-12 md:max-w-72 max-h-12 md:max-h-72"
                >
              </Image>
            </div>
            <span className="block ml-10">Nova</span>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col md:flex-row gap-1 md:gap-10 text-xl md:text-4xl text-[#858585] text-right font-sans font-light">
          <Link
            href="/diagnosis" 
            className="hover:underline hover:text-[#FFFFFF]">
            DIAGNOSIS
          </Link>
          <Link
            href="/services" 
            className="hover:underline hover:text-[#FFFFFF]">
            SERVICES
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
