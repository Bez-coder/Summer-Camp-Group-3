import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatRoom.css';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [userSides, setUserSides] = useState({});

  useEffect(() => {
    const savedUser = localStorage.getItem('chatUsername');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/messages');
      const msgs = response.data;

      // Assign fixed sides if not already done
      const sides = { ...userSides };
      msgs.forEach((msg) => {
        if (!sides[msg.user]) {
          // If first user, assign "left", second gets "right"
          const existingUsers = Object.keys(sides);
          if (existingUsers.length === 0) {
            sides[msg.user] = 'left';
          } else if (existingUsers.length === 1 && !sides[msg.user]) {
            sides[msg.user] = 'right';
          }
        }
      });

      setUserSides(sides);
      setMessages(msgs);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!user.trim() || !message.trim()) return;

    try {
      await axios.post('http://localhost:5000/messages', { user, message });
      setMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleUserChange = (e) => {
    const newUser = e.target.value;
    setUser(newUser);
    localStorage.setItem('chatUsername', newUser);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-container">
      <h2>Chat Room</h2>

      <ul className="chat-messages">
        {messages.map((msg) => (
          <li
            key={msg._id}
            className={`chat-message ${userSides[msg.user] === 'right' ? 'own' : ''}`}
          >
            <div className="message-header">
              <strong>{msg.user}</strong>
              <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </div>
            {msg.message}
          </li>
        ))}
      </ul>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={handleUserChange}
        />
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
