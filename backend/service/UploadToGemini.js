import mime from 'mime-types'
import fs from 'fs'
import ai from '../GeminiClient.js';

export const uploadFile = async (files) => {
	if (!files || files.length === 0) {
		return response.status(400).json({ error: 'NO files uploaded' });
	}


	// Turns a path and a mimeType and makes it a inlineData json object
	const fileToGenerativePart = (buffer, mimeType) => {
		console.log("Buffer: ", buffer);
		return {
			inlineData: {
				data: buffer.toString('base64'),
				mimeType
			}
		}
	}

	// maps the body array of json file paths to turn it into an array of inlineData json's
	const inlineDataArray = files.map((file) => fileToGenerativePart(file.buffer, file.mimetype))

	// Sends the prompt along with the images to gemini AI to send something
	const response1 = await ai.models.generateContent({
		model: "gemini-2.0-flash",
		contents: [
			{
				role: "user",
				parts: [
					{
						text: "Make a weekly schedule for this image/images of the label of a medicine bottle and structure them in json under the format [{'medicineName': medicineName, 'Sunday': [timesToTakeMeds], 'Monday': [timesToTakeMeds], 'Tuesday': [timesToTakeMeds], 'Wednesday': [timesToTakeMeds], 'Thursday': [timesToTakeMeds], 'Friday': [timesToTakeMeds], 'Saturday': [timesToTakeMeds]"
					}
				]
			}
		]
	})
}