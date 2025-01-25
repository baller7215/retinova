import Image from "next/image";

import { Button } from "@mui/material";
import { BsArrowUpRightCircle } from "react-icons/bs";


export default function Services() {
    return (
          <div className="md:flex grid md:flex-cols-2 md:pl-36 py-1 md:py-4 font-sans">
              {/* Left Section: Description */}
            <div className="flex flex-col gap-5 w-5/6">
            <hr className="w-3/4 border-t-2 border-[#FFFFFF] mb-4" />
                <div className="flex flex-col mt-2 mb-2 gap-2 w-3/4 text-right">
                    <div className="flex gap-10">
                        <div className="flex flex-col w-3/5">
                            <p className="font-semibold text-2xl text-left">Find Trusted Nearby Optometry Clinics </p>
                        </div>
                        <p className="w-/5 text-left">Welcome to RetiNova’s map feature, where we utilize Google Map API to provide you with nearby trusted experts. It is always recommended to seek out professional advice.</p>
                    </div>
                </div>
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26496.35798577608!2d-118.02439809824002!3d33.6670012746215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd2f3b5556d1ab%3A0x2e67fbd228cc116c!2sIrvine%2C%20CA!5e0!3m2!1sen!2sus!4v1674786470186!5m2!1sen!2sus"
                width="70%"
                height="300"
                className="border-0"
                allowFullScreen={true}
                loading="lazy"
                ></iframe>
                <hr className="w-3/4 border-t-2 border-[#FFFFFF] mb-4" />
            </div>
            {/* Right Content: Image */}
            <Image
                src="/eyenova2.png"
                alt="Eye Nova Image"
                width={500} 
                height={100}
                className="hidden md:block md:max-h-[60vh]"
            />
            </div>         
    );
  }