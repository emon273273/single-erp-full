

import axios from "axios";

const fetchApiKey = async () => {
  try {
    const response = await axios.get("/api-config/1"); // Laravel backend endpoint
    if (response.status !== 200 || !response.data.success) {
      throw new Error("Failed to fetch API key from backend.");
    }
    console.log("API Key:", response.data.data.apiKey);
    return response.data.data.apiKey; // Access API key from response
  } catch (error) {
    console.error("Error fetching API key:", error.response || error.message);
    throw new Error("Unable to retrieve the API key.");
  }
};

export default fetchApiKey;


export const callOpenAIVisionAPI = async (base64Image) => {

  
  try {

  
    // Fetch the API key from the Laravel backend
    const apiKey = await fetchApiKey();
  console.log("my api key for openai........................",apiKey)

    // Set headers with the fetched API key
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

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
      ...
    `;

    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: systemMessage },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    };

    // Call the OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${await response.text()}`);
    }

    const responsedata = await response.json();
    let jsonString = responsedata.choices[0].message.content;

    // Clean JSON response
    jsonString = jsonString.replace(/```json|```/g, '').trim();

    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error processing OpenAI response:', error);
    throw new Error('Failed to parse invoice data.');
  }
};
