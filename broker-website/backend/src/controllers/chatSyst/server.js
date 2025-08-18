// server.js
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

const ChatMessage = require("./models/ChatMessage");

const app = express();
const PORT = 5000;

app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:3000"], credentials: true }));
app.use(express.json());

mongoose
  .connect( "mongodb://127.0.0.1:27017/userDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/messages", async (req, res) => {
  try {
    const { room = "lobby" } = req.query;
    const messages = await ChatMessage.find({ room }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/messages", async (req, res) => {
  try {
    const { user, message, room = "lobby" } = req.body;
    if (!user || !message) {
      return res.status(400).json({ error: "User and message are required" });
    }
    const chatMessage = await ChatMessage.create({ user, message, room });

    io.to(room).emit("message:new", chatMessage);

    res.status(201).json(chatMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ["http://localhost:3000", "http://127.0.0.1:3000"], methods: ["GET", "POST"], credentials: true },
  transports: ["websocket", "polling"],
});

io.on("connection", (socket) => {
  let joinedRoom = "lobby";
  let username = "Anon";

  socket.on("room:join", async ({ user, room = "lobby" }) => {
    try {
      username = user || "Anon";
      joinedRoom = room || "lobby";

      socket.join(joinedRoom);

      const history = await ChatMessage.find({ room: joinedRoom }).sort({ timestamp: 1 });
      socket.emit("message:history", history);

      socket.to(joinedRoom).emit("system:info", { text: `${username} joined`, timestamp: Date.now() });
    } catch (e) {
      console.error("room:join error", e);
    }
  });

  socket.on("message:send", async ({ user, message, room }) => {
    try {
      const targetRoom = room || joinedRoom || "lobby";
      if (!user || !message) return;

      const saved = await ChatMessage.create({ user, message, room: targetRoom });
      io.to(targetRoom).emit("message:new", saved);
    } catch (e) {
      console.error("message:send error", e);
    }
  });

  socket.on("typing", ({ user, room }) => {
    const targetRoom = room || joinedRoom || "lobby";
    socket.to(targetRoom).emit("typing", { user });
  });

  socket.on("disconnect", () => {
    if (joinedRoom) socket.to(joinedRoom).emit("system:info", { text: `${username} left`, timestamp: Date.now() });
  });
});

async function Del(){
	await mongoose.connect("mongodb://127.0.0.1:27017/userDB");
	await ChatMessage.deleteMany({});
	mongoose.disconnect();
}


server.listen(PORT, () => {
  console.log(`Server (HTTP + Socket.IO) running at http://localhost:${PORT}`);
});