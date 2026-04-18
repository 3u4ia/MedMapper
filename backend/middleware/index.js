import express from 'express'
import cors from 'cors'
import multer from 'multer'


export const registerMiddleware = (app) => {
	app.use(express.json());
	app.use(cors())

	app.use((req, res, next) => {
		console.log("A new request received at " + new Date(Date.now()))
		next();
	})
}

const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });