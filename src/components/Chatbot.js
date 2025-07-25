import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    // Simulate bot response
    setTimeout(() => {
      setMessages(msgs => [...msgs, { sender: 'bot', text: "I'm just a demo bot!" }]);
    }, 700);
  };

  return (
    <div className={`chatbot-container${open ? ' open' : ''}`}>  
      {!open && (
        <button className="chatbot-float-btn" onClick={() => setOpen(true)}>
          💬
        </button>
      )}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Chatbot</span>
            <button className="chatbot-close" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-msg chatbot-msg-${msg.sender}`}>{msg.text}</div>
            ))}
          </div>
          <div className="chatbot-input-row">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' ? handleSend() : null}
              placeholder="Type your message..."
              className="chatbot-input"
            />
            <button className="chatbot-send" onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
