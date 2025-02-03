const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const callGeminiVisionAPI = async (base64Image) => {
  const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" + apiKey;

  // Define system prompt
  const systemMessage = `
    Extract structured JSON data from this invoice image using the following format:
    {
      "date": "YYYY-MM-DDTHH:mm:ss.SSSZ",
      "paidAmount": number,
      "discount": number,
      "supplierId": number,
      "note": string,
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

    **Rules to follow strictly:**
    1. FIELD MAPPING:
       - "productName" = "Item", "Product", "Description"
       - "productQuantity" = "Qty", "Quantity", "Units"
       - "productPurchasePrice" = "Cost", "Unit Price", "Purchase Price"
       - "productSalePrice" = "Price", "Selling Price", "Retail Price"
       - "taxPercentage" = "Tax%", "VAT", "GST", "Tax Rate"
       - "lineTotal" = "Amount", "Total", "Subtotal"
       - "taxAmount" = "Tax", "VAT Amount", "GST Amount"
    
    2. DATA RULES:
       - Convert amounts to numbers (e.g., "$150.00" → 150)
       - Convert dates to ISO 8601 format
       - Use null for missing numbers
       - Use an empty string "" for missing text
       - Calculate missing values where possible:
         - salePrice = purchasePrice * 1.2 (if missing)
         - taxAmount = lineTotal * (taxPercentage / 100) (if missing)
         - lineTotal = quantity * purchasePrice (if missing)
    
    3. RETURN:
       - **Only valid JSON (No markdown, no explanations)**
       - **Maintain this exact structure**
       - **Include ALL fields even if null**
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
