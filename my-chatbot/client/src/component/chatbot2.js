import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faCopy, faSyncAlt, faThumbsDown, faThumbsUp, faPencilAlt, faMicrophone, faPaperPlane, faSliders } from '@fortawesome/free-solid-svg-icons';

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
  position: absolute;
  bottom: 0;
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
  padding: 10px;
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
  justify-content: flex-start;
  margin-bottom: 10px;
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
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editingMessage, setEditingMessage] = useState(null);
  const [editText, setEditText] = useState("");
  const [thumbsDownColor, setThumbsDownColor] = useState({});
  const [thumbsUpColor, setThumbsUpColor] = useState({});
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLeftColumnVisible, setIsLeftColumnVisible] = useState(true);
  const [showPromptOptions, setShowPromptOptions] = useState(true);
  const messagesEndRef = useRef(null);

  const userEmail = localStorage.getItem('userEmail');
  const userName = userEmail ? userEmail.split('@')[0] : `user${Math.floor(Math.random() * 10000)}`;

  const promptOptions = [
    "¿Cuáles son las opciones de carreras universitarias o técnicaturas disponibles?",
    "Estoy buscando una carrera que esté en Buenos Aires.",
    "¿Qué carreras tienen mayor demanda laboral?",
    "¿Cuáles son las mejores universidades en Argentina?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (event, text) => {
    event.preventDefault();
    const messageText = text || inputText;
    if (messageText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: messageText,
        user: userName,
        name: userName,
        icon: `${process.env.PUBLIC_URL}/user.png`,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText("");
      setShowPromptOptions(false);

      // Set loading to true before sending the message
      setLoading(true);

      // Send the message to the backend
      try {
        const response = await axios.post('/chatbot', { userInput: messageText });
        const botMessage = {
          id: messages.length + 2,
          text: response.data.chatbotResponse,
          user: "Chatbot",
          name: "Chatbot",
          icon: `${process.env.PUBLIC_URL}/uni.png`,
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

  const startNewChat = () => {
    const currentChat = [...messages];
    if (currentChat.length > 0) {
      setChatHistory([
        ...chatHistory,
        {
          id: chatHistory.length + 1,
          messages: currentChat,
          firstMessage: currentChat[0].text
        }
      ]);
    }
    setMessages([]);
    setShowPromptOptions(true);
  };

  const selectChat = (chatId) => {
    const selectedChat = chatHistory.find(chat => chat.id === chatId);
    if (selectedChat) {
      setChatHistory(chatHistory.filter(chat => chat.id !== chatId));
      setChatHistory(prevHistory => [
        ...prevHistory,
        {
          id: chatHistory.length + 1,
          messages: messages,
          firstMessage: messages[0]?.text || ''
        }
      ]);
      setMessages(selectedChat.messages);
    }
  };

  return (
    <PageContainer>
      <MainContent>
        <LeftColumn visible={isLeftColumnVisible}>
          <NewChatButton onClick={startNewChat}>Nuevo Chat</NewChatButton>
          <SearchHistoryContainer>
            <SearchHistoryTitle>Historial de Chats</SearchHistoryTitle>
            {chatHistory.map((chat) => (
              <SearchItem key={chat.id} onClick={() => selectChat(chat.id)}>
                {chat.firstMessage}
              </SearchItem>
            ))}
          </SearchHistoryContainer>
        </LeftColumn>
        <Divider visible={isLeftColumnVisible} />
        <ToggleButtonContainer>
          <button onClick={toggleLeftColumn}>
            <FontAwesomeIcon icon={faSliders} />
          </button>
        </ToggleButtonContainer>
        <ChatContainer fullWidth={!isLeftColumnVisible}>
          <MessagesContainer>
            {showPromptOptions && (
              <PromptOptions>
                {promptOptions.map((option, index) => (
                  <PromptOption key={index} onClick={(e) => sendMessage(e, option)}>
                    {option}
                  </PromptOption>
                ))}
              </PromptOptions>
            )}
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
                    {msg.user === userName && (
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
                          onClick={() => toggleThumbsDownColor(msg.id)}
                          style={{ color: thumbsDownColor[msg.id] || "inherit" }}
                        >
                          <FontAwesomeIcon icon={faThumbsDown} />
                        </Icon>
                        <Icon 
                          onClick={() => toggleThumbsUpColor(msg.id)}
                          style={{ color: thumbsUpColor[msg.id] || "inherit" }}
                        >
                          <FontAwesomeIcon icon={faThumbsUp} />
                        </Icon>
                      </IconContainer>
                    )}
                  </>
                )}
              </Message>
            ))}
            {loading && <Spinner />}
            <div ref={messagesEndRef} />
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
