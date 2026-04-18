import express from 'express'
import {upload} from '../middleware/index.js'
import { uploadFile } from '../service/UploadToGemini.js'

export const routing = (app) => {
	app.post("/upload", upload.array("files"), async (req, res) => {
		try {
			console.log("Uploaded files:", req.files);

			const medicines = await uploadFile(req.files)
			res.status(200).json({ medicines })
		} catch(error) {
			console.error("Upload error:", error);
			res.status(500).json({ message: "Upload failed" });
		}
	})

	app.get("/health-check", async (req, res) => {
		try {
			console.log("Healthy")
			res.status(200).json({ message: "healthy" })
		} catch(error) {
			console.error("Unhealthy:", error);
			res.status(400).json({ message: "Unhealthy" })
		}
	})
}