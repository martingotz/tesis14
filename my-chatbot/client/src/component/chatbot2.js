import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faCopy, faSyncAlt, faThumbsDown, faThumbsUp, faPencilAlt, faMicrophone, faPaperPlane, faSliders } from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const userPhotoUrl = `${process.env.PUBLIC_URL}/usuario.png`;  
const botPhotoUrl = `${process.env.PUBLIC_URL}/uni.png`;    

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 88%;
  width: 100%;
  overflow: hidden;
  background-color: black;
`;

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
  height: calc(100% - 60px);
  position: relative; /* Added to enable absolute positioning inside MainContent */
`;

const LeftColumn = styled.div`
  width: 30%;
  background-color: #2c2c2c;
  color: #ffffff;
  padding: 20px;
  overflow-y: auto;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const Divider = styled.div`
  width: 5px;
  background-color: #a0e00d;
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.fullWidth ? '100%' : '70%')};
  height: 100%;
  background-color: #070806;
  position: relative;
`;

const MessagesContainer = styled.div`
  flex: auto;
  overflow-y: auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
`;

const Message = styled.div`
  background: #1a1a1a;
  color: #ffffff;
  padding: 10px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  align-self: ${(props) => (props.user === "Chatbot" ? "flex-start" : "flex-end")};
  max-width: 80%;
  font-size: 18px;
  position: relative;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #070806;
  width: 100%;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 5px;
  border: 3px solid #a0e00d;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 10px;
`;

const iconButtonStyle = `
  background: none;
  border: none;
  cursor: pointer;
  color: #a0e00d;
  font-size: 24px;
  padding: 10px;
`;

const Plane = styled.button`
  ${iconButtonStyle}
`;

const ToggleButtonContainer = styled.button`
  ${iconButtonStyle}
  position: absolute;
  top: 10px; /* Adjust the top value as needed */
  left: 10px; /* Adjust the left value to place it outside the LeftColumn */
  z-index: 10;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Username = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
`;

const UserIcon = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 10px;
  border-radius: 50%;
`;

const SearchHistoryContainer = styled.div`
  margin-top: 20px;
`;

const SearchHistoryTitle = styled.h2`
  color: #a0e00d;
  justify-content: center;
  align-items: center;
`;

const SearchItem = styled.div`
  background: #1a1a1a;
  color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 20px;
  border: 1px solid #a0e00d;
  cursor: pointer;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  color: #a0e00d;
`;

const Icon = styled.div`
  cursor: pointer;
  font-size: 18px;
  margin: 0 5px;
  color: #a0e00d;
`;

const MicButton = styled.button`
  ${iconButtonStyle}
`;

const spinnerAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-top: 8px solid #a0e00d;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spinnerAnimation} 1s linear infinite;
  margin: auto;
`;

const NewChatButton = styled.button`
  background: none;
  border: 1px solid #a0e00d;
  color: #a0e00d;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const PromptOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const PromptOption = styled.button`
  background: #1a1a1a;
  color: #ffffff;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #a0e00d;
  margin-bottom: 10px;
  cursor: pointer;
`;

function ChatBot() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola UNIGPT, soy Federico, me gustaría consultarte por facultades", user: "User", name: "Federico", icon: userPhotoUrl },
    { id: 2, text: "Un gusto en conocerte Federico, ¿en qué puedo ayudarte hoy?", user: "Chatbot", name: "UniGPT", icon: botPhotoUrl },
    { id: 3, text: "Soy deportista, capitán en mi equipo de rugby, y me interesa mucho la tecnología, especialmente todo lo relacionado con el análisis de datos. Además, siempre me ha atraído la idea de aplicar estos conocimientos en un contexto práctico, como en la gestión de proyectos o incluso en el desarrollo de soluciones innovadoras..", user: "User", name: "Federico", icon: userPhotoUrl },
    { id: 4, text: "Es genial que combines el liderazgo y el trabajo en equipo con un interés en la tecnología y los datos. A partir de lo que me cuentas, te recomendaría considerar algunas carreras que podrían alinearse muy bien con tus intereses, como Administración de Empresas, Negocios Digitales o Ingeniería en Inteligencia Artificial en la Universidad de San Andrés. Cada una de estas opciones te permitiría aprovechar tu pasión por la tecnología en diferentes contextos. ¿Te gustaría que te haga algunas preguntas para ayudarte a identificar cuál de estas carreras podría ser la mejor para ti?", user: "Chatbot", name: "UniGPT", icon: botPhotoUrl },
    { id: 5, text: "Sí, eso suena bien. Estoy un poco indeciso, así que cualquier orientación que me puedas dar será útil.", user: "User", name: "Federico", icon: userPhotoUrl },
    { id: 6, text: "Perfecto, vamos a profundizar un poco más para entender mejor tus intereses. Primero, ¿te sientes más atraído por la interpretación de datos y el desarrollo de modelos predictivos, o prefieres un enfoque más estratégico, como liderar proyectos tecnológicos y tomar decisiones basadas en datos?", user: "Chatbot", name: "UniGPT", icon: botPhotoUrl },
    { id: 7, text: "Definitivamente, me atrae mucho la interpretación de datos y cómo se pueden utilizar para prever tendencias o mejorar procesos. Pero también me interesa la idea de liderar proyectos donde estos datos puedan ser aplicados de manera estratégica.", user: "User", name: "Federico", icon: userPhotoUrl },
    { id: 8, text: "Eso es interesante, porque tu perfil parece ser una combinación de habilidades analíticas y de liderazgo. Ahora, otra pregunta importante: ¿te ves trabajando más en un entorno corporativo, colaborando con diferentes departamentos y gestionando recursos, o te apasiona la idea de emprender, quizás lanzando tu propio proyecto en el ámbito digital?", user: "Chatbot", name: "UniGPT", icon: botPhotoUrl },
    { id: 9, text: "Creo que emprender siempre ha sido una idea que me ronda la cabeza. Me encanta la libertad creativa y la capacidad de innovar que el emprendimiento ofrece, especialmente en el sector digital.", user: "User", name: "Federico", icon: userPhotoUrl },
    { id: 10, text: "Con toda la información que has compartido, parece que la carrera de Negocios Digitales podría ser una excelente opción para ti. Esta carrera te ofrecerá un sólido conocimiento en el análisis de datos y te brindará las herramientas necesarias para liderar proyectos innovadores en el ámbito digital. Además, te preparará para emprender, algo que parece alinearse perfectamente con tus objetivos. ¿Te gustaría saber más detalles sobre lo que esta carrera incluye, o tal vez explorar cómo podrías complementar estos estudios con cursos adicionales en análisis de datos o inteligencia artificial?", user: "Chatbot", name: "UniGPT", icon: botPhotoUrl },
  
  ]);
  const [inputText, setInputText] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);
  const [editText, setEditText] = useState("");
  const [thumbsDownColor, setThumbsDownColor] = useState({});
  const [thumbsUpColor, setThumbsUpColor] = useState({});
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLeftColumnVisible, setIsLeftColumnVisible] = useState(true);
  const [showPromptOptions, setShowPromptOptions] = useState(false);
  const messagesEndRef = useRef(null);

  const userEmail = localStorage.getItem('userEmail');
  const userName = userEmail ? userEmail.split('@')[0] : `user${Math.floor(Math.random() * 10000)}`;

  const promptOptions = [
    "¿Cuáles son las opciones de carreras universitarias o técnicaturas disponibles?",
    "Estoy buscando una carrera que esté en Buenos Aires.",
    "¿Qué carreras tienen mayor demanda laboral?",
    "¿Cuáles son los requisitos de admisión para la universidad?",
    "Quisiera saber si hay programas de becas o ayudas financieras.",
    "Quisiera saber más sobre las opciones de intercambio internacional.",
    "¿Cuál es el proceso de inscripción para una carrera específica?",
    "¿Qué universidades ofrecen la carrera de derecho?",
    "Estoy interesado en una universidad con programas de prácticas profesionales.",
    "Me gustaría saber sobre las opciones de posgrado disponibles."
  ];

  const handleOptionClick = async (option) => {
    setLoading(true);
    const newMessage = {
      id: messages.length + 1,
      text: option,
      user: "User",
      name: userName,
      icon: userPhotoUrl,
    };
    setMessages([...messages, newMessage]);

    try {
      const response = await axios.post(`${API_BASE_URL}/openai/chat`, { userName, message: option });
      const botMessage = {
        id: messages.length + 2,
        text: response.data,
        user: "Chatbot",
        name: "UniGPT",
        icon: botPhotoUrl,
      };
      setMessages([...messages, newMessage, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
    setLoading(false);
  };

  

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        user: "User",
        name: userName,
        icon: userPhotoUrl,
      };
      setMessages([...messages, newMessage]);
      setInputText("");
      setLoading(true);

      try {
        const response = await axios.post(`${API_BASE_URL}/openai/chat`, { userName, message: inputText });
        const botMessage = {
          id: messages.length + 2,
          text: response.data,
          user: "Chatbot",
          name: "UniGPT",
          icon: botPhotoUrl,
        };
        setMessages([...messages, newMessage, botMessage]);
      } catch (error) {
        console.error("Error fetching bot response:", error);
      }
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleLeftColumnVisibility = () => {
    setIsLeftColumnVisible(!isLeftColumnVisible);
  };

  const handleEditMessage = (id) => {
    const messageToEdit = messages.find((message) => message.id === id);
    setEditingMessage(id);
    setEditText(messageToEdit.text);
  };

  const handleSaveEdit = (id) => {
    const updatedMessages = messages.map((message) =>
      message.id === id ? { ...message, text: editText } : message
    );
    setMessages(updatedMessages);
    setEditingMessage(null);
    setEditText("");
  };

  const handleCopy = (messageText) => {
    navigator.clipboard.writeText(messageText).then(() => {
      console.log("Text copied to clipboard:", messageText);
    }).catch((error) => {
      console.error("Error copying text:", error);
    });
  };

  const handleRating = (id, rating) => {
    if (rating === "thumbsUp") {
      setThumbsUpColor((prevState) => ({
        ...prevState,
        [id]: !prevState[id] ? "#a0e00d" : null,
      }));
    } else {
      setThumbsDownColor((prevState) => ({
        ...prevState,
        [id]: !prevState[id] ? "#a0e00d" : null,
      }));
    }
  };

  return (
    <PageContainer>
      <MainContent>
        <ToggleButtonContainer onClick={toggleLeftColumnVisibility}>
          <FontAwesomeIcon icon={faSliders} />
        </ToggleButtonContainer>
        <LeftColumn visible={isLeftColumnVisible}>
          <NewChatButton onClick={() => setMessages([])}>Nuevo chat</NewChatButton>
          <SearchHistoryContainer>
            <SearchHistoryTitle>Historial de Búsqueda</SearchHistoryTitle>
            {chatHistory.map((search, index) => (
              <SearchItem key={index}>{search}</SearchItem>
            ))}
          </SearchHistoryContainer>
        </LeftColumn>
        <Divider visible={isLeftColumnVisible} />
        <ChatContainer fullWidth={!isLeftColumnVisible}>
          <MessagesContainer>
            {messages.map((message) => (
              <Message key={message.id} user={message.user}>
                <MessageHeader>
                  <UserIcon src={message.icon} alt={`${message.user} Icon`} />
                  <Username>{message.name}</Username>
                  <IconContainer>
                    <Icon onClick={() => handleCopy(message.text)}>
                      <FontAwesomeIcon icon={faCopy} />
                    </Icon>
                    <Icon onClick={() => handleRating(message.id, "thumbsUp")}>
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        style={{ color: thumbsUpColor[message.id] }}
                      />
                    </Icon>
                    <Icon onClick={() => handleRating(message.id, "thumbsDown")}>
                      <FontAwesomeIcon
                        icon={faThumbsDown}
                        style={{ color: thumbsDownColor[message.id] }}
                      />
                    </Icon>
                    <EditButton onClick={() => handleEditMessage(message.id)}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </EditButton>
                  </IconContainer>
                </MessageHeader>
                {editingMessage === message.id ? (
                  <>
                    <Input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <button onClick={() => handleSaveEdit(message.id)}>Guardar</button>
                  </>
                ) : (
                  <div>{message.text}</div>
                )}
              </Message>
            ))}
            {loading && <Spinner />}
            <div ref={messagesEndRef} />
          </MessagesContainer>
          <InputContainer>
            <MicButton>
              <FontAwesomeIcon icon={faMicrophone} />
            </MicButton>
            <Input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Plane onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </Plane>
          </InputContainer>
        </ChatContainer>
      </MainContent>
      {showPromptOptions && (
        <PromptOptions>
          {promptOptions.map((option, index) => (
            <PromptOption key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </PromptOption>
          ))}
        </PromptOptions>
      )}
    </PageContainer>
  );
}

export default ChatBot;
