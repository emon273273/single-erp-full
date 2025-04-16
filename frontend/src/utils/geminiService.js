import axios from "axios";

const fetchApiKey = async () => {
  try {
    const response = await axios.get("/api-config/1"); // Laravel backend endpoint

    
    if (response.status !== 200 || !response.data.success) {
      throw new Error("Failed to fetch API key from backend.");
    }
    
    return response.data.data.apiKey; // Access API key from response
  } catch (error) {
    console.error("Error fetching API key:", error.response || error.message);
    throw new Error("Unable to retrieve the API key.");
  }
};

export default fetchApiKey;




export const callGeminiVisionAPI = async (base64Image) => {

  const apiKey = await fetchApiKey();


  const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" + apiKey;

  // Define system prompt
  const systemMessage = `
  Analyze this invoice image and extract data in the following EXACT JSON structure:
  \`\`\`
  {
    "date": "YYYY-MM-DDTHH:mm:ss.SSSZ",
    "paidAmount": number,
    "discount": number,
    "supplierId": number,
    "note": string,
    "supplierName": string,
    "supplierAddress": string,
    "supplierPhone": string,
    "supplierEmail": string,
    "supplierMemoNo": string,
    "purchaseInvoiceProduct": [
      {
        "productName": string,
        "productQuantity": number,
        "productPurchasePrice": number,
        "productSalePrice": number,
        "taxPercentage": number,
        "lineTotal": number,
        "taxAmount": number
      }
    ]
  }
  \`\`\`
  Ensure the output is strictly valid JSON and wrapped in triple backticks (\`\`\`).
`;

  const payload = {
    contents: [
      { role: "user", parts: [{ text: systemMessage }] },
      { role: "user", parts: [{ inline_data: { mime_type: "image/jpeg", data: base64Image } }] },
    ],
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`API Error: ${response.status} - ${await response.text()}`);

    const data = await response.json();
    let jsonString = data.candidates[0]?.content?.parts[0]?.text;

    // Sanitize JSON Output (Remove Markdown formatting)
    jsonString = jsonString.replace(/```json|```/g, "").trim();

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error processing Gemini response:", error);
    throw new Error("Failed to parse invoice data.");
  }
};

// Process Gemini response and match product IDs
export const processGeminiResponse = (data, productList) => {
  return {
    ...data,
    purchaseInvoiceProduct:
      data.purchaseInvoiceProduct?.map((product) => ({
        ...product,
        productId:
          productList.find((p) => p.name.toLowerCase() === product.productName?.toLowerCase())?.id || null,
      })) || [],
  };
};

// Clean JSON response
export const cleanJSONResponse = (jsonString) => {
  try {
    const cleaned = jsonString.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Error cleaning JSON:", error);
    return null;
  }
};
