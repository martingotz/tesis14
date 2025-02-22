import './RotatingText.css';
import React, { useEffect, useState } from 'react';

const words = ["camino", "carrera", "facultad"];

const RotatingText = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Cambia la palabra cada 2 segundos

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='rotating-text'> 
    <h1>
      Elegí tu <span className="highlight2">{words[currentWordIndex]}</span> <br />
      con <span className="highlight2">UniGPT</span>
    </h1>
      <button className="chatbot-button" onClick={() => window.location.href='/chatbot2'}>Chatbot</button>
    </div>
  );
};

export default RotatingText;

