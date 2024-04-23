/* import React, { useState } from 'react';
import { OpenAI } from 'openai';
import '../chatbox.css';
import '../header.css';

const OPENAI_API_KEY = "sk-proj-4tEwkFqVjZdvh9CrwOkLT3BlbkFJP5U8wT6HvJUd0ErIBuw2";
OpenAI.apiKey = OPENAI_API_KEY;
const client = new OpenAI({ apiKey: OPENAI_API_KEY });

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

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair." },
        { role: "user", content: `${userInput}` }
      ]
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
 */