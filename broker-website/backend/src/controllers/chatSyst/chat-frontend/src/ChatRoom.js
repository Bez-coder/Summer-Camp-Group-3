// ChatRoom.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatRoom.css';  // We'll create this CSS file for styles

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!user.trim() || !message.trim()) {
      alert('Please enter both your name and a message');
      return;
    }

    try {
      await axios.post('http://localhost:5000/messages', {
        user: user.trim(),
        message: message.trim(),
      });

      setMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Poll every 2 seconds for new messages
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-container">
      <h2>Chat Room</h2>
      <ul className="chat-messages">
        {messages.map((msg) => (
          <li key={msg._id} className={`chat-message ${msg.user === user ? 'own' : ''}`}>
            <div className="message-header">
              <strong>{msg.user}</strong>
              <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <p>{msg.message}</p>
          </li>
        ))}
      </ul>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
