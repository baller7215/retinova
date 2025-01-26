
import Image from "next/image";
import React from "react";

import { BiAperture } from "react-icons/bi";
import UploadButton from "../../components/uploadbutton"


export default function Diagnosis() {
    return (
          <div className="md:flex grid md:flex-cols-2 md:pl-36 py-1 md:py-4 font-sans">
              {/* Left Section: Description */}
            <div className="flex flex-col gap-3 md:gap-5 w-5/6 mx-auto md:mx-0">
                <div className="flex flex-col w-full md:w-5/6 text-center md:text-left text-balance mx-auto md:mx-0">
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
                {/* Upload Image Section */}
                <div className="relative bg-[url('/lamp.png')] bg-repeat-round md:bg-no-repeat bg-contain md:bg-cover bg-right-top md:bg-center rounded-xl w-full md:w-2/3 h-32 md:h-80 flex items-center justify-center">
                    <p className="text-2xl md:text-6xl font-extrabold absolute top-10 md:top-28 -left-1 md:-left-20 rotate-90">PATIENT</p>
                    <p className="text-2xl md:text-6xl font-extrabold absolute -bottom-5 md:-bottom-10 left-10 md:left-6">IMAGING</p>
                    <UploadButton />
                    <hr className="absolute -bottom-3 md:-bottom-6 right-1 md:right-5 w-1/2 border-t-4 border-[#FFFFFF] rounded-full" />
                </div>
                {/* Statistics */}
                <div className="flex flex-row md:flex-col mt-11 md:mt-14 gap-1 md:gap-6 justify-between w-full md:w-3/5 text-left md:text-right my-auto">
                    <div className="flex md:gap-10">
                        <div className="flex flex-row md:flex-col gap-2 md:gap-0 w-2/5 md:w-1/5">
                            <p className="font-semibold text-xl md:text-4xl my-auto">100+ </p>
                            <p className="font-light text-sm md:text-lg my-auto">Photos</p>
                        </div>
                        <p className="hidden md:block w-4/5 text-left text-xs md:text-lg">Our imaging utilizes an AI trained model with hand-selected photos to detect uveitis and cataracts.</p>
                    </div>
                    <div className="flex md:gap-10">
                        <div className="flex flex-row md:flex-col gap-2 md:gap-0 w-2/5 md:w-1/5">
                            <p className="font-semibold text-xl md:text-4xl my-auto">80%</p>
                            <div className="flex flex-col">
                                <p className="font-light text-sm md:text-lg my-auto">Confidence</p>
                                <p className="font-light text-sm md:text-lg my-auto">Score</p>
                            </div>
                        </div>
                        <p className="hidden md:block w-4/5 text-left text-xs md:text-lg">With a confidence score of __%, we can lessen the amount of false diagnoses and provide patients with an accurate and quick diagnose.</p>
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