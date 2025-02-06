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
      // // Convert image to base64
       const base64Image = await convertToBase64(file);
    

      // Call Gemini API (or OpenAI API if needed)
      const extractedData = await callGeminiVisionAPI(base64Image);
      //const extractedData = await callOpenAIVisionAPI(base64Image);

        console.log("extracted data from geminin",extractedData)
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
    <div >
    <label
      htmlFor="fileInput"
      className={`flex items-center justify-center w-full px-4 py-2 text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 transition-all ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Processing..." : "Upload Image"}
    </label>
    <input
      id="fileInput"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleFileChange}
      disabled={loading}
    />
    {loading && (
      <p className="text-sm text-gray-500">
        Processing image... Please wait.
      </p>
    )}
  </div>
  
  );
};

export default InvoiceUpload;