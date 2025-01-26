import React, { useState } from "react";
import { X, Image, ChevronUp, ChevronDown, RotateCcw } from "lucide-react";

export interface DiagnosisModalProps {
    isOpen: boolean,
    onClose: () => void,
    diagnosis: string,
};

const diagnosisOverview = {
    "uveitis": "Uveitis is inflammation of the uvea, the middle layer of the eye.",
    "cataracts": "Cataracts occur when the eye's natural lens becomes cloudy, leading to impaired vision."
}


const DiagnosisModal = ({ isOpen, diagnosis, onClose }: DiagnosisModalProps) => {
    const [showSymptoms, setShowSymptoms] = useState<boolean>(false);
    const [showNextSteps, setShowNextSteps] = useState<boolean>(false);


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-[#0c101c] border-[1px] border-[#858585] p-6 rounded-lg shadow-lg text-center md:max-w-[500px] w-full">
                <button
                    onClick={onClose}
                    className="flex ml-auto text-white"
                >
                    <X size={25} />
                </button>
                {/* main content */}
                <div className="flex flex-col gap-3">
                    <Image size={60} className="bg-[#21252e] p-2 rounded-md flex mx-auto" />
                    {/* <div className="flex flex-col gap-1"> */}
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl tracking-wider font-bold capitalize">Possible Diagnosis: {diagnosis}</h2>
                        {diagnosis!='healthy' &&<p className="w-full text-[#72777d] leading-5 tracking-wider">{diagnosisOverview[diagnosis]}</p>}
                    </div>
                    

                    {/* </div> */}
                    {/* symptoms */}
                    <div className="flex flex-col gap-1 p-4 bg-[#21252e] rounded-md w-full">
                        <div className="flex w-full justify-between gap-2">
                            <h3 className="text-base tracking-widest font-normal">Symptoms</h3>
                            
                            {showSymptoms ?
                                <ChevronDown
                                    size={25}
                                    onClick={() => setShowSymptoms(false)}
                                    className="hover:scale-110 cursor-pointer transform duration-300 ease-in-out"
                                />
                                :
                                <ChevronUp
                                    size={25}
                                    onClick={() => setShowSymptoms(true)}
                                    className="hover:scale-110 cursor-pointer transform duration-300 ease-in-out"
                                />
                            }
                        </div>
                        {showSymptoms &&
                            (diagnosis === 'healthy' ? 
                                <div className="w-[92%]">
                                    <ul className="list-disc text-left w-full ml-4 text-[#72777d] leading-5 tracking-wider space-y-2">
                                        <li>No abnormalities detected in the eye.</li>
                                        <li>The eye appears healthy with no signs of inflammation, cataracts, or other conditions.</li>
                                        <li>Vision clarity and eye health are within normal parameters.</li>
                                    </ul>
                                </div>
                            : diagnosis === 'uveitis' ?
                                <div className="w-[92%] flex flex-col gap-1">
                                    <ul className="list-disc text-left w-full ml-4 text-[#72777d] leading-5 tracking-wider space-y-2">
                                        <li>Eye redness.</li>
                                        <li>Pain in or around the eye.</li>
                                        <li>Blurred or reduced vision.</li>
                                        <li>Sensitivity to light.</li>
                                        <li>Floaters (dark spots in your vision).</li>
                                    </ul>
                                </div>
                            :
                            <div className="w-[92%] flex flex-col gap-1">
                                <ul className="list-disc text-left w-full ml-4 text-[#72777d] leading-5 tracking-wider space-y-2">
                                    <li>Blurry or cloudy vision.</li>
                                    <li>Sensitivity to bright light or glare.</li>
                                    <li>Fading or yellowing of colors.</li>
                                    <li>Difficulty seeing at night or in dim lighting.</li>
                                    <li>Seeing halos around lights.</li>
                                </ul>
                            </div>
                            )
                        }
                    </div>

                    {/* next steps */}
                    <div className="flex flex-col gap-1 p-4 bg-[#21252e] rounded-md w-full">
                        <div className="flex w-full justify-between gap-2">
                            <h3 className="text-base tracking-widest font-normal">Next steps</h3>
                            
                            {showNextSteps ?
                                <ChevronDown
                                    size={25}
                                    onClick={() => setShowNextSteps(false)}
                                    className="hover:scale-110 cursor-pointer transform duration-300 ease-in-out"
                                />
                                :
                                <ChevronUp
                                    size={25}
                                    onClick={() => setShowNextSteps(true)}
                                    className="hover:scale-110 cursor-pointer transform duration-300 ease-in-out"
                                />
                            }
                        </div>
                        {showNextSteps &&
                            (diagnosis === 'healthy' ? 
                                <div className="w-[92%]">
                                    <ul className="list-decimal text-left w-full ml-5 text-[#72777d] leading-5 tracking-wider space-y-2">
                                        <li>Continue regular eye care practices:
                                            <ul className="list-disc text-left ml-4">
                                                <li>Get annual eye exams to maintain eye health.</li>
                                                <li>Wear UV-protective sunglasses when outdoors.</li>
                                            </ul>
                                        </li>
                                        <li>Maintain good eye hygiene by washing your hands before touching your face or eyes.</li>
                                        <li>If you experience new symptoms such as redness, pain, or vision changes, seek an eye specialist for a check-up.</li>
                                        <li>Stay hydrated and maintain a healthy diet with eye-friendly nutrients (e.g., Vitamin A, lutein, and zeaxanthin).</li>
                                    </ul>
                                </div>
                            : diagnosis === 'uveitis' ?
                                <div className="w-[92%] flex flex-col gap-1">
                                    <ul className="list-decimal text-left w-full ml-5 text-[#72777d] leading-5 tracking-wider space-y-2">
                                        <li>Avoid rubbing your eyes, as this may worsen irritation.</li>
                                        <li>Rest your eyes and minimize exposure to bright light (use sunglasses indoors or outdoors).</li>
                                        <li>Use over-the-counter artificial tears to relieve discomfort temporarily.</li>
                                        <li>If symptoms worsen or include severe pain, loss of vision, or extreme sensitivity to light, seek immediate medical attention.</li>
                                        <li>Consult an ophthalmologist to confirm the diagnosis and begin treatment (e.g., corticosteroid eye drops or other medications).</li>
                                    </ul>
                                </div>
                            :
                            <div className="w-[92%] flex flex-col gap-1">
                                <ul className="list-decimal text-left w-full ml-5 text-[#72777d] leading-5 tracking-wider space-y-2">
                                    <li>Avoid bright lights or glare by wearing polarized or anti-glare glasses.</li>
                                    <li>Schedule an appointment with an ophthalmologist to discuss cataract surgery if vision loss affects your daily life.</li>
                                    <li>Use brighter lights for activities such as reading or cooking to compensate for reduced vision.</li>
                                    <li>Avoid smoking and maintain a diet rich in antioxidants to slow cataract progression.</li>
                                    <li>If your vision deteriorates rapidly or becomes significantly worse, seek professional medical advice promptly.</li>
                                </ul>
                            </div>
                            )
                        }
                    </div>
                </div>

                <div className="flex justify-between gap-2">
                    <button
                        onClick={() => window.location.href = "/results"}
                        className="hover:scale-110 cursor-pointer transform duration-300 ease-in-out border-[#1d212b] border-[2px] hover:bg-[#1d212b] hover:border-transparent text-white py-2 px-2 rounded shadow-md tracking-wider mt-4"
                    >
                        <RotateCcw
                            size={25}
                            // onClick={() => setShowNextSteps(false)}
                            className=""
                        />
                    </button>
                    <button
                        onClick={() => window.location.href = "/results"}
                        className="hover:scale-105 cursor-pointer transform duration-300 ease-in-out bg-[#1d212b] border-[2px] border-transparent hover:border-[#1d212b] border-[2px] hover:bg-transparent text-white py-2 px-4 rounded shadow-lg tracking-wider mt-4"
                    >
                        Nearby Clinical Services
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default DiagnosisModal;
