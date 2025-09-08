import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './ChatRoom.css';

const API_BASE = 'http://localhost:5000';

function useRoomFromURL() {
  return useMemo(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      return p.get('room') || 'lobby';
    } catch {
      return 'lobby';
    }
  }, []);
}

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [typingUser, setTypingUser] = useState('');
  const [userSides, setUserSides] = useState({});

  const room = useRoomFromURL();
  const socketRef = useRef(null);
  const listRef = useRef(null);
  const typingTimerRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('chatUsername');
    if (savedUser) setUser(savedUser);
  }, []);

  useEffect(() => {
    const s = io(API_BASE, { transports: ['websocket'], withCredentials: true });
    socketRef.current = s;

    s.on('connect', () => {
      s.emit('room:join', { user: user || 'Anon', room });
    });

    s.on('message:history', (history) => {
      setMessages(history);
      assignSides(history);
      scrollToBottom();
    });

    s.on('message:new', (msg) => {
      setMessages((prev) => {
        const next = [...prev, msg];
        assignSides(next);
        return next;
      });
      scrollToBottom();
    });

    s.on('typing', ({ user: u }) => {
      setTypingUser(u);
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => setTypingUser(''), 1200);
    });

    return () => {
      clearTimeout(typingTimerRef.current);
      s.disconnect();
    };
  }, [room]);

  useEffect(() => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('room:join', { user: user || 'Anon', room });
    }
  }, [user, room]);

  const assignSides = (msgs) => {
    const sides = { ...userSides };
    msgs.forEach((m) => {
      if (!sides[m.user]) {
        const existingUsers = Object.keys(sides);
        if (existingUsers.length === 0) sides[m.user] = 'left';
        else if (existingUsers.length === 1) sides[m.user] = 'right';
        else sides[m.user] = existingUsers.length % 2 === 0 ? 'left' : 'right';
      }
    });
    setUserSides(sides);
  };

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    const trimmed = (message || '').trim();
    const trimmedUser = (user || '').trim();
    if (!trimmed || !trimmedUser) return;

    try {
      await axios.post(`${API_BASE}/messages`, {
        user: trimmedUser,
        message: trimmed,
        room,
      });
    } catch (e) {
      console.error('Failed to send message:', e);
    }

    setMessage('');
  };

  const handleUserChange = (e) => {
    const newUser = e.target.value;
    setUser(newUser);
    localStorage.setItem('chatUsername', newUser);
  };

  const handleTyping = () => {
    if (socketRef.current) socketRef.current.emit('typing', { user, room });
  };

  return (
    <div className="chat-container">
      <h2>Chat Room ({room})</h2>

      <ul className="chat-messages" ref={listRef}>
        {messages.map((msg) => (
          <li
            key={msg._id || msg.timestamp}
            className={`chat-message ${userSides[msg.user] === 'right' ? 'own' : ''}`}
          >
            <div className="message-header">
              <strong>{msg.user}</strong>
              <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </div>
            {msg.message}
          </li>
        ))}
        {typingUser && (
          <li className="chat-message">
            <em>{typingUser} is typing…</em>
          </li>
        )}
      </ul>

      <div className="chat-input">
        <input type="text" placeholder="Your name" value={user} onChange={handleUserChange} />
        <input
          type="text"
          placeholder="Type your message…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
            handleTyping();
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
