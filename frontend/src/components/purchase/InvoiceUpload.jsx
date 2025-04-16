import Button from "@/UI/Button";
import { convertToBase64 } from "@/utils/imagetoBase64";
import { callOpenAIVisionAPI } from "@/utils/openaiService";
import { callGeminiVisionAPI } from "@/utils/geminiService";
import { FaFileUpload } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast
const InvoiceUpload = ({ onExtract }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  
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

      // console.log("extracted data from openai", extractedData);
      // Pass extracted data to parent component
      if (onExtract) {
        onExtract(extractedData);
      }
      toast.success("Invoice data extracted successfully!");
    } catch (error) {
      console.error("Error extracting invoice data:", error);
      toast.error(
        "Failed to extract invoice data. Please check the API key or try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        color="primary"
        loading={loading}
        onClick={() => {
          if (!loading) {
            document.getElementById("fileInput").click();
          }
        }}
        disabled={loading}
      >
        
        {loading ? (
        ""
        ) : (
           <>
           <FaFileUpload /> Upload</>
        )}
      </Button>

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={loading}
      />
    </div>
  );
};

export default InvoiceUpload;
