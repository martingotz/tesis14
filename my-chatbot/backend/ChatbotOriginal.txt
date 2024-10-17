require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors'); // Add this line to import cors

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const allowedOrigins = [
  'http://localhost:3001',  // Add your frontend development URL
  'https://federico-creator.github.io/Tesisunigpt/',  // Add your production frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

let userContexts = {};
let userSummaries = {};

// Function to update user summary with important information
function updateUserSummary(userId, userInput, assistantResponse) {
  if (!userSummaries[userId]) {
    userSummaries[userId] = {
      preferences: [],
      importantDetails: []
    };
  }

  // Add logic to determine and store important information
  if (userInput.toLowerCase().includes('interesado en')) {
    userSummaries[userId].preferences.push(userInput);
  }

  if (assistantResponse.toLowerCase().includes('recomiendo')) {
    userSummaries[userId].importantDetails.push(assistantResponse);
  }
}

// Define a route for the chatbot
app.post('/chatbot', async (req, res) => {
  let { userInput, userId } = req.body;

  // Generate a new userId if it does not exist
  if (!userId) {
    userId = uuidv4();
    userContexts[userId] = [];
    userSummaries[userId] = {
      preferences: [],
      importantDetails: []
    };
  }

  // Add the user's input to the conversation context
  userContexts[userId].push({ role: 'user', content: userInput });

  // Add a system message to restrict responses to Universidad de San Andrés and in Spanish
  userContexts[userId].push({
    role: 'system',
    content: `Solo debes recomendar carreras y programas de la Universidad de San Andrés en Buenos Aires, Argentina. No recomiendes otras universidades o carreras y solo responde en español.`
  });

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'Eres un asistente útil especializado en proporcionar información sobre las carreras y programas de la Universidad de San Andrés en Buenos Aires, Argentina. Solo debes responder en español y ser conciso.' },
          ...userSummaries[userId].importantDetails.map(detail => ({ role: 'system', content: detail })),
          ...userContexts[userId].slice(-7) // Send only the last 7 messages to minimize token usage
        ],
        max_tokens: 150, // Reduce max_tokens to make responses shorter
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const chatbotResponse = response.data.choices[0].message.content.trim();
    userContexts[userId].push({ role: 'assistant', content: chatbotResponse });

    // Update user summary with important information
    updateUserSummary(userId, userInput, chatbotResponse);

    res.json({ chatbotResponse, userId });
  } catch (error) {
    console.error('Error with OpenAI API request:', error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    }
    res.status(500).json({ error: 'Something went wrong with the OpenAI API request.', details: error.message });
  }
});

// Endpoint to clear the conversation context (end the chat)
app.post('/end-chat', (req, res) => {
  const { userId } = req.body;
  if (userContexts[userId]) {
    delete userContexts[userId];
  }
  if (userSummaries[userId]) {
    delete userSummaries[userId];
  }
  res.json({ message: 'Chat ended and context cleared.' });
});

// Send the index.html file for any route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
