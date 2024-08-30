import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { loadParticles, Particles } from './Particles';  // Asegúrate de que la configuración esté correctamente importada

const ScrollerContainer = styled.div`
  position: relative;
  height: 400vh; /* Asegura que haya suficiente contenido para hacer scroll */
  overflow: hidden;
`;

const ScrollerContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  z-index: 1;
`;

const ScrollerImage = styled.img`
  width: auto; /* Mantener la proporción de la imagen */
  max-width: 100%; /* Asegura que no supere el 100% del contenedor */
  height: 70%; /* Ajusta la altura al 70% del contenedor */
  margin-right: 20px;
`;

const ScrollerText = styled.div`
  color: white;
  max-width: 50%; /* Ajustado para ocupar un 50% del ancho */
  z-index: 2;
`;

const ProgressBarContainer = styled.div`
  position: sticky;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 10px;
  background-color: black;
  border-radius: 5px;
  z-index: 3;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: #A5FF00;
  border-radius: 5px;
  transition: width 0.3s ease;
`;

const StepIndicator = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #A5FF00;
  color: black;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  z-index: 4;
  cursor: default;
`;

const ParticlesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
 background: radial-gradient(circle at center, #004f2a 0%, #00361b 40%, #001f0d 70%, #000a03 100%);
  z-index: 0;
  pointer-events: none; /* Asegúrate de que no interfiera con la interacción del usuario */
  background-size: cover; /* Asegura que el fondo cubra todo el contenedor */
  background-repeat: no-repeat; /* Evita que el fondo se repita */
`;


const sections = [
  {
    image: `${process.env.PUBLIC_URL}/Scroll/image1_black_background.png`,
    title: "Crea tu cuenta",
    text: "Regístrate o inicia sesión para interactuar con el chatbot.",
    button: (
      <>
        <button className="register-button" onClick={() => window.location.href='/register'}>
          Registrarse
        </button>
        <button className="login-button" onClick={() => window.location.href='/login'}>
          Iniciar Sesión
        </button>
      </>
    )
  },
  {
    image: `${process.env.PUBLIC_URL}/Scroll/image2_black_background.png`,
    title: "Accede a tu cuenta",
    text: "Inicia sesión para continuar donde lo dejaste.",
    button: (
      <button className="login-button" onClick={() => window.location.href='/login'}>
        Iniciar Sesión
      </button>
    )
  },
  {
    image: `${process.env.PUBLIC_URL}/Scroll/image3_black_background.png`,
    title: "¡Encontrá tu camino!",
    text: "Conversa con el chatbot <br />y elegí la mejor opción para tu futuro.",
    button: (
      <button className="wide-chatbot-button" onClick={() => window.location.href='/chatbot2'}>
        Chatbot
      </button>
    )
  },
  {
    image: `${process.env.PUBLIC_URL}/Scroll/image4_resized.png`,
    title: "Accede a tu cuenta",
    text: "Inicia sesión para continuar donde lo dejaste.",
    button: (
      <button className="wide-chatbot-button" onClick={() => window.location.href='/chatbot2'}>
        Chatbot
      </button>
    )
  }
];

const ScrollerSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Limpieza del evento para evitar posibles fugas de memoria
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Cargar las partículas cuando el componente se monta
    loadParticles(Particles);
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const sectionHeight = window.innerHeight;
    const newIndex = Math.min(Math.floor(scrollY / sectionHeight), sections.length - 1);
    setActiveIndex(newIndex);

    // Actualizar el progreso de la barra
    const newProgress = ((newIndex + 1) / sections.length) * 100;
    setProgress(newProgress);
  };

  return (
    <>
      <ParticlesContainer>
        <div id="tsparticles" className="particles"></div>
      </ParticlesContainer>
      <StepIndicator>{`Paso ${activeIndex + 1}`}</StepIndicator>
      <ProgressBarContainer>
        <ProgressBar progress={progress} />
      </ProgressBarContainer>
      <ScrollerContainer>
        {sections.map((section, index) => (
          <ScrollerContent key={index} active={index === activeIndex}>
            <ScrollerImage src={section.image} alt={section.title} />
            <ScrollerText>
              <h2>{section.title}</h2>
              <p dangerouslySetInnerHTML={{ __html: section.text }}></p>
              {section.button}
            </ScrollerText>
          </ScrollerContent>
        ))}
      </ScrollerContainer>
    </>
  );
};

export default ScrollerSection;

