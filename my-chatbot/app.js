require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const xlsx = require('xlsx');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to read data from XLSX file
function readXlsxData(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Read the first sheet
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  return data;
}

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

let userContexts = {};
let userSummaries = {};
let xlsxData = null;

// Load XLSX data once at startup
function loadXlsxData() {
  xlsxData = readXlsxData(path.join(__dirname, 'Prueba_2_actualizada_final.xlsx'));
}
loadXlsxData();

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

  // Check if the user is asking for career recommendations
  const isAskingForRecommendations = userInput.toLowerCase().includes('recomienda') && userInput.toLowerCase().includes('estudiar');

  if (isAskingForRecommendations) {
    // Format the XLSX data into a string or JSON
    const xlsxDataString = JSON.stringify(xlsxData);

    userContexts[userId].push({
      role: 'system',
      content: `Here is some data that might help you choose a career: ${xlsxDataString}`
    });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'ft:gpt-3.5-turbo-0125:unigpt:tesis-14-2:9Xb9bOFc',
        messages: [
          { role: 'system', content: 'You are a helpful assistant specialized in providing career advice based on personal interests, skills, and available data.' },
          ...userSummaries[userId].importantDetails.map(detail => ({ role: 'system', content: detail })),
          ...userContexts[userId].slice(-7) // Send only the last 7 messages to minimize token usage
        ],
        max_tokens: 300,
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
    res.status(500).json({ error: 'Something went wrong with the OpenAI API request.' });
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
