"use client";

import React, { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import CameraModal from "./cameraModal"

export default function DiagnosisButton() {
  const [open, setOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
    handleClose();
  };

  const handleTakePhoto = () => {
    setCameraOpen(true);
  };

  const handlePhotoCapture = async (photo: string) => {
    try {
      const response = await fetch("http://localhost:5000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: photo }),
      });
      const result = await response.json();
      console.log("Prediction Results:", result);

      // Handle results (e.g., display them to the user)
      alert(`Cataracts: ${result.cataracts}, Uveitis: ${result.uveitis}`);
    } catch (error) {
        console.error("Error during prediction:", error);
    }
  };

  return (
    <div>
      {/* Button to open the menu */}
      <Button
        variant="text"
        sx={{
          color: "#FFFFFF",
          display: "flex",
          gap: { xs: "6px", md: "10px" },
          alignItems: "center",
          fontSize: { xs: "14px", md: "18px" },
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        onClick={handleOpen}
      >
        GET DIAGNOSIS
        <BsArrowUpRightCircle
          className="hover:animate-spin text-[#F9C7FF] text-base md:text-2xl"
        />
      </Button>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#0c101c",
            border: "1px solid #FFFFFF",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            width: "90%",
            maxWidth: 400,
            color: "#FFFFFF",
            textAlign: "center",
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "none",
              color: "#FFFFFF",
            }}
          >
            ✕
          </button>

          {/* Modal Header */}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              mb: 3,
              fontSize: "20px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Choose an Option
          </Typography>

          {/* Buttons */}
          <div className="flex gap-5">
            <Button
                variant="contained"
                fullWidth
                onClick={handleTakePhoto}
                sx={{
                mb: 2,
                bgcolor: "#21252E",
                border: "1px solid #FFFFFF",
                borderRadius: "8px",
                color: "#FFFFFF",
                fontWeight: "bold",
                transition: "transform 0.3s ease",
                padding: {xs:"5px", md:"16px"},
                "&:hover": { transform: "scale(1.05)" },
                }}
            >
                <div className="flex flex-col gap-3">
                    <FaCamera className="text-4xl md:text-6xl mx-auto"/>
                    Take Photo
                </div>
            </Button>
            <Button
                variant="contained"
                fullWidth
                onClick={handleFileUpload}
                sx={{
                mb: 2,
                bgcolor: "#21252E",
                border: "1px solid #FFFFFF",
                borderRadius: "8px",
                color: "#FFFFFF",
                fontWeight: "bold",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
                }}
            >
                <div className="flex flex-col gap-3">
                    <FaRegFileAlt className="text-4xl md:text-6xl mx-auto"/>
                    Upload File
                </div>
            </Button>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              console.log("File uploaded:", e.target.files?.[0]);
            }}
          />
        </Box>
      </Modal>

      {/* Camera Modal */}
      <CameraModal
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={handlePhotoCapture}
      />
    </div>
  );
}
