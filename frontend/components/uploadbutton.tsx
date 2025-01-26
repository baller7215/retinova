"use client";

import React, { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";

export default function UploadButton() {
  const [open, setOpen] = useState(false);
  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
    handleClose();
  };

  const handleTakePhoto = () => {
    // Add logic for taking a photo
    handleClose();
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
          fontWeight: "light",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        onClick={handleOpen}
      >
        UPLOAD FILE
        <BsArrowUpRightCircle
          className="hover:animate-spin text-[#F9C7FF]"
          style={{ fontSize: "xs:24px md:26px" }}
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
                padding: "16px",
                "&:hover": { transform: "scale(1.05)" },
                }}
            >
                <div className="flex flex-col gap-3">
                    <FaCamera className="text-6xl mx-auto"/>
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
                    <FaRegFileAlt className="text-6xl mx-auto"/>
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
    </div>
  );
}
