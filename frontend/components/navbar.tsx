"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white fixed top-20 w-full px-36">
      <div className="flex items-center justify-between mx-auto">
        {/* Logo */}
        <div className="text-4xl font-bold tracking-wide">
          <Link href="/">
            <span className="block">Reti</span>
            <span className="block ml-10">Nova</span>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex gap-10 text-4xl">
          <Link
           href="/about" 
           className="hover:underline">
          Overview
          </Link>
          <Link 
            href="/" 
            className="hover:underline">
            Home
          </Link>        
        </div>
        </div>
    </nav>
  );
}
