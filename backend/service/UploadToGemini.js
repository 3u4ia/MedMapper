import { GoogleGenAI } from '@google/genai';
import mime from 'mime-types';

// Initialize the client (ensure your API key is in your environment)
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export const uploadFile = async (files) => {
    if (!files || files.length === 0) {
        throw new Error('No files provided.');
    }

    // Modern SDK formatting for image parts
    const visualParts = files.map((file) => ({
        inlineData: {
            data: file.buffer.toString('base64'),
            mimeType: file.mimetype || mime.lookup(file.originalname)
        }
    }));

    try {
        // FIX: Using the 'gemini-3-flash' model (v1 standard for 2026)
        const result = await ai.models.generateContent({
            model: "gemini-3-flash", 
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: "Extract the medicine name and dosage schedule from these images. Return ONLY a JSON array with this structure: [{'medicineName': 'name', 'Sunday': ['time'], ...}]"
                        },
                        ...visualParts
                    ]
                }
            ],
            // Forces the model to speak in JSON so it doesn't break your parser
            config: {
                responseMimeType: "application/json"
            }
        });

        // result.response.text() is the standard way to get the string in the new SDK
        const textData = result.response.text();
        return JSON.parse(textData);

    } catch (error) {
        // If you get a 404 here, your API key doesn't have Gemini 3 access yet.
        // Fallback to 'gemini-2.0-flash' in that case.
        console.error("API Error:", error.message);
        throw error;
    }
}
