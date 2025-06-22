// src/App.js
import React, { useState } from 'react';
import './App.css';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! Ask me anything Zhao Cai!' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { type: 'user', text: input };
  setMessages(prev => [...prev, userMessage]);
  setInput('');

  try {
    const response = await fetch(`${apiUrl}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: input }),
    });

    const data = await response.json();
    const botReply = data.answer || "No response";

    setMessages(prev => [...prev, { type: 'bot', text: botReply }]);
  } catch (error) {
    console.error('Error:', error);
    setMessages(prev => [...prev, { type: 'bot', text: 'Error: Could not reach server.' }]);
  }
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="app">
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

// const fakeBotResponse = async (message) => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(`You said: ${message}`), 600);
//   });
// };

export default App;
