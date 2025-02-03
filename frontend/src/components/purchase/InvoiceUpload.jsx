import Button from "@/UI/Button";
import { callGeminiVisionAPI } from "@/utils/geminiService";
import { callOpenAIVisionAPI } from "@/utils/openaiService";
import { convertToBase64 } from "@/utils/imagetoBase64";
import { useState } from "react";

const InvoiceUpload = ({ onExtract }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection and automatic processing
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setLoading(true);

    try {
      // Convert image to base64
      const base64Image = await convertToBase64(file);
      console.log("Base64 Image:", base64Image);

      // Call Gemini API (or OpenAI API if needed)
      const extractedData = await callGeminiVisionAPI(base64Image);
      console.log("Extracted Data:", extractedData);

      // Pass extracted data to parent component
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
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={loading}
      />
      {loading && <p>Processing image... Please wait.</p>}
    </div>
  );
};

export default InvoiceUpload;