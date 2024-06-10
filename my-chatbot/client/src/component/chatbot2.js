import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from 'axios';
import Header from "./Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faCopy, faSyncAlt, faThumbsDown, faThumbsUp, faStar, faChevronDown, faPencilAlt, faMicrophone,faPaperPlane, faSliders } from '@fortawesome/free-solid-svg-icons';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
  height: calc(100% - 60px);
`;

const LeftColumn = styled.div`
  width: 30%;
  background-color: #2c2c2c;
  color: #ffffff;
  padding: 20px;
  overflow: hidden;
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
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  background: #1a1a1a;
  color: #ffffff;
  padding: 10px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  align-self: ${(props) => (props.user === "Juan" ? "flex-start" : "flex-end")};
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
  margin: 10px 0;
  padding: 10px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 5px;
  border: 3px solid #a0e00d;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 10px;
`;

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SendIcon = styled.img`
  width: 36px;
  height: 36px;
  padding: 10px;
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
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  color: #d1d1d1;
`;

const Icon = styled.div`
  cursor: pointer;
  font-size: 18px;
  margin: 0 5px;
`;

const MicButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #a0e00d;
  font-size: 24px;
`;

const spinnerAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Plane = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #a0e00d;
  font-size: 24px;
  padding: 10px
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

const ToggleButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;  // Align to the left
  margin-bottom: 10px;
`;

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¿Cuáles son las opciones de carreras universitarias o técnicaturas disponibles?",
      user: "Juan",
      name: "Juan",
      icon: "/usuario.png",
    },
    {
      id: 2,
      text: "Hola Juan, tenemos un ranking de universidades y carreras más solicitadas disponibles en Argentina.",
      user: "Chatbot",
      name: "Chatbot",
      icon: "/uni.png",
    },
    {
      id: 3,
      text: "Estoy buscando una carrera que esté en Buenos Aires.",
      user: "Juan",
      name: "Juan",
      icon: "/usuario.png",
    },
    {
      id: 4,
      text: "Perfecto, Buenos Aires es una gran ciudad! Las carreras más solicitadas son: Negocios Digitales, Economía Empresarial, Abogacía.",
      user: "Chatbot",
      name: "Chatbot",
      icon: "/uni.png",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);
  const [editText, setEditText] = useState("");
  const [thumbsDownColor, setThumbsDownColor] = useState({});
  const [thumbsUpColor, setThumbsUpColor] = useState({});
  const [chatbotResponse, setChatbotResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        user: "Juan",
        name: "Juan",
        icon: "/usuario.png",
      };
      setMessages([...messages, newMessage]);
      setInputText("");

      // Set loading to true before sending the message
      setLoading(true);

      // Send the message to the backend
      try {
        const response = await axios.post('/chatbot', { userInput: inputText });
        setChatbotResponse(response.data.chatbotResponse);

        // Add the chatbot response to the messages
        const botMessage = {
          id: messages.length + 2,
          text: response.data.chatbotResponse,
          user: "Chatbot",
          name: "Chatbot",
          icon: "/uni.png",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error sending message to chatbot:', error);
      } finally {
        // Set loading to false after receiving the response
        setLoading(false);
      }
    }
  };

  const startEditing = (message) => {
    setEditingMessage(message);
    setEditText(message.text);
  };

  const saveEdit = (event) => {
    event.preventDefault();
    setMessages(messages.map(msg => 
      msg.id === editingMessage.id ? { ...msg, text: editText } : msg
    ));
    setEditingMessage(null);
    setEditText("");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'es-ES';
    window.speechSynthesis.speak(speech);
  };

  const toggleThumbsDownColor = (id) => {
    setThumbsDownColor(prev => ({
      ...prev,
      [id]: prev[id] ? "" : "#FF0000"
    }));
    if (thumbsUpColor[id]) {
      setThumbsUpColor(prev => ({
        ...prev,
        [id]: ""
      }));
    }
  };

  const toggleThumbsUpColor = (id) => {
    setThumbsUpColor(prev => ({
      ...prev,
      [id]: prev[id] ? "" : "#00FF00"
    }));
    if (thumbsDownColor[id]) {
      setThumbsDownColor(prev => ({
        ...prev,
        [id]: ""
      }));
    }
  };
  const [isLeftColumnVisible, setIsLeftColumnVisible] = useState(true);

  const toggleLeftColumn = () => {
    setIsLeftColumnVisible(!isLeftColumnVisible);
  };

  const handleMicClick = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'es-ES';
    recognition.start();
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error detected: ' + event.error);
    };
  };

  const searchHistory = [
    { id: 1, text: ["Diseño", "Bariloche", "Matemáticas"] },
    { id: 2, text: ["Diseño", "Bariloche", "Matemáticas"] },
    { id: 3, text: ["Diseño", "Bariloche", "Matemáticas"] },
    { id: 4, text: ["Diseño", "Bariloche", "Matemáticas"] },
    { id: 5, text: ["Diseño", "Bariloche", "Matemáticas"] },
  ];

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <LeftColumn visible={isLeftColumnVisible}>
          <ToggleButtonContainer>
            <FontAwesomeIcon icon={faSliders} onClick={toggleLeftColumn}/>
          </ToggleButtonContainer>
          <SearchHistoryContainer>
            <SearchHistoryTitle>Historial de Búsqueda</SearchHistoryTitle>
            {searchHistory.map((item) => (
              <SearchItem key={item.id}>
                {item.text.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </SearchItem>
            ))}
          </SearchHistoryContainer>
        </LeftColumn>
        <Divider visible={isLeftColumnVisible} />
        <ChatContainer fullWidth={!isLeftColumnVisible}>
        <FontAwesomeIcon icon={faSliders} color="white"  onClick={toggleLeftColumn}/>
          <MessagesContainer>
            {messages.map((msg) => (
              <Message key={msg.id} user={msg.user}>
                <MessageHeader>
                  <UserIcon src={msg.icon} />
                  <Username>{msg.name}</Username>
                </MessageHeader>
                {editingMessage?.id === msg.id ? (
                  <form onSubmit={saveEdit} style={{ display: 'flex', width: '100%' }}>
                    <Input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <SendButton type="submit">
                      <FontAwesomeIcon icon={faPaperPlane} color="white" />
                    </SendButton>
                  </form>
                ) : (
                  <>
                    {msg.text}
                    {msg.user === "Juan" && (
                      <EditButton onClick={() => startEditing(msg)}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </EditButton>
                    )}
                    {msg.user === "Chatbot" && (
                      <IconContainer>
                        <Icon onClick={() => speakText(msg.text)}><FontAwesomeIcon icon={faVolumeUp} /></Icon>
                        <Icon onClick={() => copyToClipboard(msg.text)}><FontAwesomeIcon icon={faCopy} /></Icon>
                        <Icon><FontAwesomeIcon icon={faSyncAlt} /></Icon>
                        <Icon 
                          onClick={() => toggleThumbsUpColor(msg.id)}
                          style={{ color: thumbsUpColor[msg.id] || "inherit" }}
                        >
                          <FontAwesomeIcon icon={faThumbsUp} />
                        </Icon>
                        <Icon 
                          onClick={() => toggleThumbsDownColor(msg.id)}
                          style={{ color: thumbsDownColor[msg.id] || "inherit" }}
                        >
                          <FontAwesomeIcon icon={faThumbsDown} />
                        </Icon>
                      </IconContainer>
                    )}
                  </>
                )}
              </Message>
            ))}
            {loading && <Spinner />}
          </MessagesContainer>
          <InputContainer>
            <MicButton onClick={handleMicClick}>
              <FontAwesomeIcon icon={faMicrophone} />
            </MicButton>
            <form onSubmit={sendMessage} style={{ display: 'flex', width: '100%' }}>
              <Input
                type="text"
                placeholder="Escribe aquí tu pregunta"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Plane onClick={sendMessage}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </Plane>
            </form>
          </InputContainer>
        </ChatContainer>
      </MainContent>
    </PageContainer>
  );
}

export default ChatBot;

