import Image from "next/image";

import { Button } from "@mui/material";
import { BiAperture } from "react-icons/bi";
import { BsArrowUpRightCircle } from "react-icons/bs";


export default function Diagnosis() {
    return (
          <div className="md:flex grid md:flex-cols-2 md:pl-36 py-1 md:py-4 font-sans">
              {/* Left Section: Description */}
            <div className="flex flex-col gap-5 w-5/6">
                <div className="flex flex-col w-11/12 md:w-5/6 text-center md:text-left text-balance mx-auto md:mx-0">
                    <h1 className="flex text-xl md:text-2xl leading-snug font-medium mx-auto md:mx-0 gap-1">
                        <p>Patient Imaging</p>
                        <BiAperture className="my-auto text-3xl" />
                    </h1>
                    <p className="text-[#FFFFFF] mt-1 md:mt-6 text-sm md:text-base leading-relaxed font-light">
                    Our application provides users with a quick, faster way to diagnose patients using self-taken pictures. 
                    Start by uploading a clear, visible image of your eye. Our purpose is for patients to get a general, 
                    but quick diagnose without having to seek out professionally taken photos first.
                    </p>
                </div>
                <div className="relative bg-[url('/lamp.png')] bg-cover bg-center rounded-xl w-2/3 h-64 md:h-80 flex items-center justify-center">
                    <p className="text-lg md:text-6xl font-extrabold absolute top-28 -left-20 rotate-90">PATIENT</p>
                    <p className="text-lg md:text-6xl font-extrabold absolute -bottom-10 left-6">IMAGING</p>
                    <Button
                        href="/gyno"
                        variant="text"
                        sx={{
                            color: "#FFFFFF",
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            fontSize: {xs:"16px", md:"18px"},
                            transition: "transform 0.3s ease",
                            fontWeight: "light",
                            "&:hover": {
                                transform: "scale(1.05)", 
                            },
                        }}
                    >
                    UPLOAD FILE
                    <BsArrowUpRightCircle className="hover:animate-spin text-[#F9C7FF]" style={{fontSize: "26px"}}/>
                    </Button>
                    <hr className="absolute -bottom-6 right-5 w-1/2 border-t-4 border-[#FFFFFF] rounded-full" />
                </div>
                <div className="flex flex-col mt-14 gap-2 w-3/5 text-right">
                    <div className="flex gap-10">
                        <div className="flex flex-col w-1/5">
                            <p className="font-semibold text-4xl">100+ </p>
                            <p className="font-light text-lg">Photos</p>
                        </div>
                        <p className="w-4/5 text-left">Our imaging utilizes an AI trained model with hand-selected photos to detect uveitis and cataracts.</p>
                    </div>
                    <div className="flex gap-10">
                        <div className="flex flex-col w-1/5">
                            <p className="font-semibold text-4xl">80%</p>
                            <p className="font-light text-lg">Confidence</p>
                            <p className="font-light text-lg">Score</p>
                        </div>
                        <p className="w-4/5 text-left">With a confidence score of __%, we can lessen the amount of false diagnoses and provide patients with an accurate and quick diagnose.</p>
                    </div>
                </div>
            </div>
            {/* Right Content: Image */}
            <Image
                src="/eyenova.png"
                alt="Eye Nova Image"
                width={500} 
                height={100}
                className="hidden md:block md:max-h-[60vh]"
            />
            </div>         
    );
  }