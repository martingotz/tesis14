import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
    const [userInput, setUserInput] = useState('');
    const [chatbotResponse, setChatbotResponse] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('/chatbot', { user_input: userInput });
        setChatbotResponse(response.data.response);
        setUserInput('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(event) => setUserInput(event.target.value)}
                    placeholder="Type something..."
                />
                <button type="submit">Send</button>
            </form>
            {chatbotResponse && <p>{chatbotResponse}</p>}
        </div>
    );
}

export default Chatbot;