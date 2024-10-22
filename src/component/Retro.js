"use client";

import React from "react";
import './Retro.css'; // Asegúrate de que el archivo CSS esté correctamente vinculado
import RotatingText from "./RotatingText"; // Importa el componente RotatingText

const RetroGridBackground = () => {
  return (
    <div className="retro-grid-container relative flex h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-black md:shadow-xl">
      <span className="pointer-events-none z-20 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-8xl font-bold leading-none tracking-tighter text-transparent">
        <RotatingText />
      </span>

      <div className="retro-grid z-10 absolute inset-0"></div>

      <button
        className="chatbot-button mt-4 z-30"
        onClick={() => window.location.href = '/chatbot2'}
      >
        Chatbot
      </button>
    </div>
  );
}

export default RetroGridBackground;


