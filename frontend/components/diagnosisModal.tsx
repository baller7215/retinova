import React from "react";
import { X } from "lucide-react";

export interface DiagnosisModalProps {
    isOpen: boolean,
    onClose: () => void,
    disease: string,
  }

const DiagnosisModal = ({ isOpen, disease, onClose }: DiagnosisModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-[#4b4b4b] border-[1px] border-double border-[#858585] p-6 rounded-lg shadow-lg text-center md:max-w-[500px] w-full">
        <button
          onClick={onClose}
          className="flex ml-auto text-white rounded"
        >
          <X size={25} />
        </button>
        <h2 className="text-xl font-bold">Possible Diagnosis: {disease}</h2>
        {/* <p className="text-sm mt-2">Confidence: {confidence}%</p> */}
        {/* <button
          onClick={onClose}
          className="bg-red-500 text-white py-2 px-4 rounded mt-4"
        >
          Close
        </button> */}
        <button
          onClick={() => window.location.href = "/results"}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          View Next Steps
        </button>
      </div>
    </div>
  );
};

export default DiagnosisModal;
