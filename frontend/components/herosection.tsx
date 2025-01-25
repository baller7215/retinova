"use client";

import { Button } from "@mui/material";
import { BsArrowUpRightCircle } from "react-icons/bs";
import Image from "next/image";


export default function HeroSection() {
  return (
        <div className="md:flex grid md:flex-cols-2 md:pl-36 py-1 md:py-16 font-sans">
            {/* Left Section: Text and Button Content */}
            <div>
                <div className="flex flex-col w-11/12 md:w-2/3 text-center md:text-left text-balance gap-6 mx-auto md:mx-0">
                    <h1 className="text-3xl md:text-6xl leading-snug font-medium mx-auto md:mx-0">
                        EARLY
                        <br />
                        DIAGNOSING
                        <br />
                        <div className="flex items-center gap-8">
                            <span>OF EYE CANCER</span>
                            <hr className="hidden md:block w-1/3 border-t-4 border-[#FFFFFF] rounded-full" />
                        </div>
                    </h1>
                    <hr className="block md:hidden w-11/12 border-t-4 border-[#FFFFFF] rounded-full mx-auto" />
                    <p className="text-[#FFFFFF] mt-1 md:mt-6 text-sm md:text-lg leading-relaxed font-light">
                        Eye cancer is a rare but serious condition that occurs when
                        malignant cells develop in the tissues of the eye. The most common
                        type in adults is ocular melanoma, which affects the uvea, while
                        retinoblastoma is the most prevalent in children, originating in the
                        retina. Symptoms may include blurry vision, dark spots on the iris,
                        loss of peripheral vision, or a visible tumor. Early detection is
                        crucial for improving outcomes and preserving vision.
                    </p>
                    </div>
                <div className="mt-4 md:mt-8 w-11/12 md:w-2/3 flex justify-between mx-auto md:mx-0">
                    <Button
                    href="/services"
                    variant="contained"
                    sx={{
                        color: "#1E1E1E", 
                        backgroundColor: "#F9C7FF", 
                        fontSize: {xs:"14px", md:"16px"},
                        transition: "transform 0.3s ease",
                        "&:hover": {
                            backgroundColor: "#E6B0E6", 
                            transform: "scale(1.05)"
                          },
                    }}
                    
                    >
                    danny gyno
                    </Button>
                    <Button
                    href="/diagnosis"
                    variant="text"
                    sx={{
                        color: "#FFFFFF",
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        fontSize: {xs:"16px", md:"18px"},
                        transition: "transform 0.3s ease",
                        "&:hover": {
                            transform: "scale(1.05)", 
                          },
                    }}
                    >
                    Get Started
                    <BsArrowUpRightCircle className="hover:animate-spin text-[#F9C7FF]" style={{fontSize: "26px"}}/>
                    </Button>
                </div>
            </div>
            {/* Right Content: Image */}
            <Image
            src="/eye.png"
            alt="Hero Image"
            width={1200} 
            height={400}
            className="hidden md:block"
            />
        </div>
  );
}
