import React, { useState } from 'react';
import axios from 'axios';

const Chatbot2 = () => {
  const [userInput, setUserInput] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/chatbot', { userInput });
      setChatbotResponse(response.data.chatbotResponse);
      setUserInput('');
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
    }
  };

  return (
    <div>
      <div className="chatbox-header">
        <h1 className="chatbox-title">Chatbot</h1>
      </div>
      <div className="chatbox-messages">
        {chatbotResponse && <p className="chatbot-response">{chatbotResponse}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            placeholder="Type something..."
            className="chatbox-input"
          />
          <button type="submit" className="chatbox-send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot2;
