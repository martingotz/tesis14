require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

const allowedOrigins = [
  'http://localhost:3001',
  'https://federico-creator.github.io/Tesisunigpt/',
  'https://martingotz.github.io/chatbot2',
  'https://martingotz.github.io/tesis14/'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

let userContexts = {};
let userSummaries = {};
const validCareers = ["Licenciatura en Contador Público", "Licenciatura en Finanzas", "Licenciatura en Negocios Digitales", "Licenciatura en Administración de Empresas", "Licenciatura en Economía", "Licenciatura en Abogacía", "Licenciatura en Comunicación", "Licenciatura en Relaciones Internacionales", "Licenciatura en Ciencia Política y Gobierno", "Licenciatura en Ciencias de la Educación", "Profesorado en Educación Primaria", "Licenciatura en Ciencias del Comportamiento", "Licenciatura en Diseño", "Licenciatura en Humanidades", "Ingeniería en Inteligencia Artificial"];

function isValidCareer(response) {
  return validCareers.some(career => response.toLowerCase().includes(career.toLowerCase()));
}

function updateUserSummary(userId, userInput, assistantResponse) {
  if (!userSummaries[userId]) {
    userSummaries[userId] = { preferences: [], importantDetails: [] };
  }
  if (userInput.toLowerCase().includes('interesado en')) {
    userSummaries[userId].preferences.push(userInput);
  }
  if (assistantResponse.toLowerCase().includes('recomiendo')) {
    userSummaries[userId].importantDetails.push(assistantResponse);
  }
}

app.get('/test', (req, res) => {
  res.send("Backend is working!");
});

app.post('/chatbot', async (req, res) => {
  let { userInput, userId } = req.body;

  if (!userId) {
    userId = uuidv4();
    userContexts[userId] = [];
    userSummaries[userId] = { preferences: [], importantDetails: [] };
  }

  userContexts[userId].push({ role: 'user', content: userInput });
  userContexts[userId].push({
    role: 'system',
    content: `Recuerda que solo puedes recomendar las siguientes carreras de la Universidad de San Andrés: Licenciatura en Contador Público, Licenciatura en Finanzas, Licenciatura en Negocios Digitales, Licenciatura en Administración de Empresas, Licenciatura en Economía, Licenciatura en Abogacía, Licenciatura en Comunicación, Licenciatura en Relaciones Internacionales, Licenciatura en Ciencia Política y Gobierno, Licenciatura en Ciencias de la Educación, Profesorado en Educación Primaria, Licenciatura en Ciencias del Comportamiento, Licenciatura en Diseño, Licenciatura en Humanidades e Ingeniería en Inteligencia Artificial. No puedes sugerir otras instituciones ni programas inexistentes.`
  });

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'Eres un consejero académico especializado en la Universidad de San Andrés en Buenos Aires, Argentina. Solo debes recomendar carreras y programas que existen en esta universidad. No recomiendes programas que no se ofrezcan aquí. Todas tus respuestas deben ser en español y debes ser claro y preciso. Si no puedes ofrecer una recomendación válida, pide más información al usuario. Debes basar tus recomendaciones de carrera en la información del usuario, sus gustos, personalidad y habilidades. Si dudas puedes pedir información relevante al usuario, como sus gustos y preferecncias, hobbies, intereses, para poder determinar la carrera ideal para el. Cuando recomiendes carreras no olvides consultar los planes de carrera y tipos de personas que toman dichas carreras y compararlas con el usuario para analizar su fit.' },
          ...userSummaries[userId].importantDetails.map(detail => ({ role: 'system', content: detail })),
          ...userContexts[userId].slice(-7)
        ],
        max_tokens: 150,
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0.2
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    let chatbotResponse = response.data.choices[0].message.content.trim();

    if (!isValidCareer(chatbotResponse)) {
      chatbotResponse = "La carrera recomendada no está disponible en UDESA. ¿Te gustaría considerar otras opciones válidas?";
    }

    userContexts[userId].push({ role: 'assistant', content: chatbotResponse });
    updateUserSummary(userId, userInput, chatbotResponse);

    res.json({ chatbotResponse, userId });
  } catch (error) {
    console.error('Error with OpenAI API request:', error.message);
    res.status(500).json({ error: 'Something went wrong with the OpenAI API request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
