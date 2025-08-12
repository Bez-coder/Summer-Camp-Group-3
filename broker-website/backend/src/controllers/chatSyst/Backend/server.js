// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const ChatMessage = require("./models/ChatMessage");

const app =  express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/userDB");



// Routes
app.get("/messages", async (req, res) => {
	
	try {
		
		const messages = await ChatMessage.find();
		res.json(messages);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}

	
});

console.log("hello");
		console.log(messages);

app.post("/messages", async (req, res) => {
	try {
		const { user, message } = req.body;

		if (!user || !message) {
			return res
				.status(400)
				.json({ error: "User and message are required" });
		}

		const chatMessage = new ChatMessage({
			user,
			message,
		});

		await chatMessage.save();

		res.status(201).json(chatMessage);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Start the server
app.listen(PORT, () => {
	console.log(`The server is running at http://localhost:${PORT}`);
});