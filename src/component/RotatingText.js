// RotatingText.js
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

  return <span className="highlight">{words[currentWordIndex]}</span>;
};

export default RotatingText;
