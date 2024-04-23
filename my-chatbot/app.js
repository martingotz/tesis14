/* const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'build')));

// Send the index.html file for any route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
}); */

const express = require('express');
const { OpenAI } = require('openai');
const path = require('path');
const app = express();
const port = 3000;

// Initialize the OpenAI client with the API key
const openai = new OpenAI({ apiKey: "sk-proj-4tEwkFqVjZdvh9CrwOkLT3BlbkFJP5U8wT6HvJUd0ErIBuw2" });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Send the index.html file for any route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a route for the chatbot
app.post('/chatbot', async (req, res) (async () => {
    const { userInput } = req.body;
    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `You are a helpful assistant, skilled in explaining complex programming concepts with creative flair.\n\n${userInput}`,
      temperature: 0.5,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.json({ chatbotResponse: response.choices[0].text });
  })());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});