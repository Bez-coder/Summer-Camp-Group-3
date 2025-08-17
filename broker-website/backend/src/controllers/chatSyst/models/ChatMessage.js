const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  room: { type: String, default: 'lobby', index: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
module.exports = ChatMessage;