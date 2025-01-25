import HeroSection from "../components/herosection"
"use client";

import Image from "next/image";
import Navbar from "../components/navbar";
import DiagnosisModal from "@/components/diagnosisModal";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div>
      <HeroSection />
      <Navbar />
      <DiagnosisModal isOpen={open} onClose={() => {setOpen(false)}} disease="healthy" />
    </div>
  );
}
