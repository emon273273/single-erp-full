import { convertToBase64 } from "@/utils/imagetoBase64";
import { callOpenAIVisionAPI } from "@/utils/openaiService";
import React, { useState } from "react";

const InvoiceUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
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
      console.log(base64Image)
      // Call OpenAI API
      const extractedData = await callOpenAIVisionAPI(base64Image);
      setResult(extractedData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={processImage} disabled={!selectedFile || loading}>
        {loading ? "Processing..." : "Extract Invoice Data"}
      </button>
      {result && (
        <div>
          <h3>Extracted Data:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default InvoiceUpload;
