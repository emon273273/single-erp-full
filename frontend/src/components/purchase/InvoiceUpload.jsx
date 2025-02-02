import { convertToBase64 } from "@/utils/imagetoBase64";
import { callOpenAIVisionAPI } from "@/utils/openaiService";
import React, { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Button from "@/UI/Button";
const InvoiceUpload = ({ onExtract }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Handle image processing
  const processImage = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);

      // Convert image to base64
      const base64Image = await convertToBase64(selectedFile);
      console.log("Base64 Image:", base64Image);

      // Call OpenAI API
      const extractedData = await callOpenAIVisionAPI(base64Image);
      console.log("Extracted Data:", extractedData);

      // Pass data to ProductAdd
      if (onExtract) {
        onExtract(extractedData);
      }
    } catch (error) {
      console.error("Error extracting invoice data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button onClick={processImage} disabled={!selectedFile || loading}>
        {loading ? "Processing..." : "Extract Invoice Data"}
      </Button>
    </div>
  );
};

export default InvoiceUpload;
