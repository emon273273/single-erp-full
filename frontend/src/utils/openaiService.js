export const callOpenAIVisionAPI = async (base64Image) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };
  
    // System prompt for structured JSON extraction
    const systemMessage = `
      Analyze this invoice image and extract data to match this EXACT JSON structure:
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
      
      Follow these rules STRICTLY:
      1. FIELD MAPPING (use fuzzy matching):
         - "productName" = "Item", "Product", "Description"
         - "productQuantity" = "Qty", "Quantity", "Units"
         - "productPurchasePrice" = "Cost", "Unit Price", "Purchase Price"
         - "productSalePrice" = "Price", "Selling Price", "Retail Price"
         - "taxPercentage" = "Tax%", "VAT", "GST", "Tax Rate"
         - "lineTotal" = "Amount", "Total", "Subtotal"
         - "taxAmount" = "Tax", "VAT Amount", "GST Amount"
      
      2. DATA RULES:
         - For amounts: Convert to numbers (e.g., "$150.00" → 150)
         - For dates: Always convert to ISO 8601 format
         - For missing numbers: Use null
         - For missing text: Use empty string ""
         - For products:
           - If sale price missing: Calculate as purchasePrice * 1.2
           - If tax% missing: Use null (never assume tax rates)
           - If tax amount missing: Calculate as lineTotal * (taxPercentage/100)
           - If lineTotal missing: Calculate as quantity * purchasePrice
      
      3. RETURN:
         - ONLY valid JSON (no markdown, no explanations)
         - Maintain this exact structure
         - Include ALL fields even if null
      `;

      
    const payload = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: systemMessage },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    };
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(
          `API Error: ${response.status} - ${await response.text()}`
        );
      }
  
      const data = await response.json();
      let jsonString = data.choices[0].message.content;
  
      // **Sanitize JSON Output**: Remove Markdown formatting if present
      jsonString = jsonString.replace(/```json|```/g, "").trim();
  
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error processing OpenAI response:", error);
      throw new Error("Failed to parse invoice data.");
    }
  };
  
  export const processOpenAIResponse = (data, productList) => {
    return {
      ...data,
      purchaseInvoiceProduct:
        data.purchaseInvoiceProduct?.map((product) => ({
          ...product,
          productId:
            productList.find(
              (p) => p.name.toLowerCase() === product.productName?.toLowerCase()
            )?.id || null,
        })) || [],
    };
  };
  
  export const cleanJSONResponse = (jsonString) => {
    try {
      // Remove markdown code blocks
      const cleaned = jsonString.replace(/```json|```/g, "").trim();
      return JSON.parse(cleaned);
    } catch (error) {
      console.error("Error cleaning JSON:", error);
      return null;
    }
  };
  