import React, { useState } from 'react';
import { OpenAI } from 'openai';
import '../chatbox.css';
import '../header.css';

OpenAI.apiKey = "sk-proj-4tEwkFqVjZdvh9CrwOkLT3BlbkFJP5U8wT6HvJUd0ErIBuw2";
console.log(OpenAI);

function Header() {
  return (
    <div className="header">
      <div className="header-logo">
        <img src="my-chatbot/public/UniGPT.png" alt="Logo" />
      </div>
      <div className="header-search">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
      <div className="header-nav">
        <ul>
          <li><a href="#">Carreras</a></li>
          <li><a href="#">Universidades</a></li>
          <li><a href="#">Chatbot</a></li>
        </ul>
      </div>
    </div>
  );
}

function Chatbox() {
  const [userInput, setUserInput] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await OpenAI.Completion.create({
      model: 'text-davinci-002',
      prompt: `User: ${userInput}\nAssistant:`,
      temperature: 0.9,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0
    });
    setChatbotResponse(response.choices[0].text);
    setUserInput('');
  };

  return (
    <div>
      <Header />
      <div className="main-content">
        <div className="main-content-left">
          <ul>
            <li>
              <a href="#">Link 1</a>
            </li>
            <li>
              <a href="#">Link 2</a>
            </li>
            <li>
              <a href="#">Link 3</a>
            </li>
          </ul>
        </div>
        <div className="main-content-right">
          <div className="chatbox">
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
        </div>
      </div>
    </div>
  );
}

export default Chatbox;