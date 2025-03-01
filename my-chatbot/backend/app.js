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
  "https://tesis14.onrender.com/chatbot2"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy does not allow this origin.'), false);
    }
    return callback(null, true);
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

let userContexts = {};  // Historial
let userSummaries = {}; // nueva memoria

/* lo de las valid carrears hay que sacarlo armando el documento */
const validCareers = [
  "Licenciatura en Contador Público", "Licenciatura en Finanzas", "Licenciatura en Negocios Digitales",
  "Licenciatura en Administración de Empresas", "Licenciatura en Economía", "Licenciatura en Abogacía",
  "Licenciatura en Comunicación", "Licenciatura en Relaciones Internacionales", "Licenciatura en Ciencia Política y Gobierno",
  "Licenciatura en Ciencias de la Educación", "Profesorado en Educación Primaria", "Licenciatura en Ciencias del Comportamiento",
  "Licenciatura en Diseño", "Licenciatura en Humanidades", "Ingeniería en Inteligencia Artificial"
];



function isValidCareer(response) {
  return validCareers.some(career => response.toLowerCase().includes(career.toLowerCase()));
}

// Configuración de cada universidad
const universidadesConfig = {
  "udesa": {
    systemPrompt: "Eres un consejero académico especializado en la Universidad de San Andrés (UDESA) en Buenos Aires, Argentina. Solo debes recomendar carreras y programas que existen en esta universidad. No recomiendes programas que no se ofrezcan aquí. Todas tus respuestas deben ser en español y debes ser claro y preciso. Si no puedes ofrecer una recomendación válida, pide más información al usuario. Tu enfoque es analítico y crítico, promoviendo el pensamiento interdisciplinario y la excelencia académica. Siempre evalúas las carreras desde una perspectiva integral. ",
    temperature: 0.3,
    max_tokens: 2000
  },
  "uade": {
    systemPrompt: "Eres un consejero académico especializado en la universidad UADE en Buenos Aires, Argentina. Solo debes recomendar carreras y programas que existen en esta universidad. No recomiendes programas que no se ofrezcan aquí. Todas tus respuestas deben ser en español y debes ser claro y preciso. Si no puedes ofrecer una recomendación válida, pide más información al usuario. Tu enfoque es práctico y orientado a la salida laboral, destacando habilidades técnicas, oportunidades profesionales y conexiones con la industria.",
    temperature: 0.5,
    max_tokens: 2000
  },
  "utdt": {
    systemPrompt: "Eres un consejero académico especializado en la Universidad Torcuato Di Tella (UTDT) en Buenos Aires, Argentina. Solo debes recomendar carreras y programas que existen en esta universidad. No recomiendes programas que no se ofrezcan aquí. Todas tus respuestas deben ser en español y debes ser claro y preciso. Si no puedes ofrecer una recomendación válida, pide más información al usuario. Tu enfoque es intelectual y vanguardista, destacando la innovación, la teoría crítica y la formación en ciencias sociales.",
    temperature: 0.4,
    max_tokens: 2000
  }
};


async function updateUserSummary(userId, userInput, assistantResponse) {
  if (!userSummaries[userId]) {
    userSummaries[userId] = { preferences: [], importantDetails: "" };
  }

  if (userInput.toLowerCase().includes('interesado en')) {
    userSummaries[userId].preferences.push(userInput);
  }

  if (assistantResponse.toLowerCase().includes('recomiendo')) {
    userSummaries[userId].importantDetails += ` ${assistantResponse}`;
  }

  /* Esto hace que la memoria no sea tan larga */
  if (userSummaries[userId].importantDetails.length > 500) {
    await summarizeUserMemory(userId);
  }
}

// resumir la memoria del usuario con nueva version, esto lo que hace es crearla con chat
async function summarizeUserMemory(userId) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4o",
        messages: [
          { role: "system", content: "Resume la siguiente información en 3 frases sin perder detalles importantes:" },
          { role: "user", content: userSummaries[userId].importantDetails }
        ],
        max_tokens: 150,
        temperature: 0.2
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    userSummaries[userId].importantDetails = response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error al resumir memoria:", error.message);
  }
}

// Endpoint
  app.post('/chatbot', async (req, res) => {
    let { userInput, userId } = req.body;
  
    if (!userId) {
      userId = uuidv4();
      userContexts[userId] = [];
      userSummaries[userId] = { preferences: [], importantDetails: "", universidad: "udesa" }; // Por defecto, UDESA
    }
  
    userContexts[userId].push({ role: 'user', content: userInput });
  
    // Determina la universidad del usuario (por defecto esta UDESA)
    const universidad = userSummaries[userId].universidad || "udesa";
    const config = universidadesConfig[universidad] || universidadesConfig["udesa"];
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: config.systemPrompt }, // cambia según universidad
            { role: 'system', content: userSummaries[userId].importantDetails },
            ...userContexts[userId]?.slice(-7) || []
          ],
          max_tokens: config.max_tokens,
          temperature: config.temperature,
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
  
      let chatbotResponse = response.data.choices[0]?.message?.content?.trim() || "No se pudo procesar la respuesta.";
  
      userContexts[userId].push({ role: 'assistant', content: chatbotResponse });
      await updateUserSummary(userId, userInput, chatbotResponse);
  
      res.json({ chatbotResponse, userId });
  
    } catch (error) {
    console.error("Error con la API de OpenAI:", error.response?.data || error.message);
    res.status(500).json({ error: "Ocurrió un error en la API de OpenAI." });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});