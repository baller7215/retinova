"use client";

import { Button } from "@mui/material";
import { BsArrowUpRightCircle } from "react-icons/bs";
import Image from "next/image";


export default function HeroSection() {
  return (
        <div className="flex flex-cols-2 pl-20 md:pl-36 py-16 font-sans">
            {/* Left Section: Text and Button Content */}
            <div>
                <div className="flex flex-col w-2/3 text-balance gap-6">
                    <h1 className="text-6xl leading-tight font-medium">
                        EARLY
                        <br />
                        DIAGNOSING
                        <br />
                        <div className="flex items-center gap-8">
                            <span>OF EYE CANCER</span>
                            <hr className="w-1/3 border-t-4 border-[#FFFFFF] rounded-full" />
                        </div>
                    </h1>
                    <p className="text-[#FFFFFF] mt-6 text-lg leading-relaxed font-light">
                        Eye cancer is a rare but serious condition that occurs when
                        malignant cells develop in the tissues of the eye. The most common
                        type in adults is ocular melanoma, which affects the uvea, while
                        retinoblastoma is the most prevalent in children, originating in the
                        retina. Symptoms may include blurry vision, dark spots on the iris,
                        loss of peripheral vision, or a visible tumor. Early detection is
                        crucial for improving outcomes and preserving vision.
                    </p>
                    </div>
                <div className="mt-8 w-2/3 flex justify-between">
                    <Button
                    variant="contained"
                    sx={{
                        color: "#1E1E1E", 
                        backgroundColor: "#FFFFFF", 
                        fontSize: "16px"
                    }}
                    >
                    danny gyno
                    </Button>
                    <Button
                    variant="text"
                    sx={{
                        color: "#FFFFFF",
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        fontSize: "18px",
                    }}
                    >
                    Get Started
                    <BsArrowUpRightCircle className="hover:animate-spin" style={{fontSize: "26px"}}/>
                    </Button>
                </div>
            </div>
            {/* Right Content: Image */}
            <Image
            src="/eye.png"
            alt="Hero Image"
            width={1200} 
            height={400}
            />
        </div>
  );
}
