import React, { useState } from 'react';
import { OpenAI } from 'openai';

OpenAI.apiKey = "sk-proj-4tEwkFqVjZdvh9CrwOkLT3BlbkFJP5U8wT6HvJUd0ErIBuw2";
console.log(OpenAI);

function Chatbot() {
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