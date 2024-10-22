import React, { useEffect } from 'react';
import './HeroScroller.css';

const HeroScroller = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const maxRotation = 15; // Maximum rotation value (positive for reducing effect)
      const rotationX = maxRotation - (scrollTop / window.innerHeight) * maxRotation;
      document.querySelector('.content').style.transform = `rotateX(${rotationX}deg)`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="laptop-frame">
      <img src={`${process.env.PUBLIC_URL}/frame3.png`} alt="Laptop Frame" className="laptop-image" />
      <div className="scroll-container">
        <div className="content">
          <img src={`${process.env.PUBLIC_URL}/foto_nuevo_chatbot.png`} alt="Prima Example" className="hero-image" />
        </div>
      </div>
    </div>
  );
};

export default HeroScroller;






