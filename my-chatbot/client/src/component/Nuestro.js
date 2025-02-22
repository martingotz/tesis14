import React from 'react';
import './Nuestro.css'; // Ensure your styles are in place
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faShareAlt, faBookReader } from '@fortawesome/free-solid-svg-icons';

const Nuestro = () => {
  return (
    <div className="nuestro-section" >
      <h2>Nuestro Chatbot</h2>
      <div className="nuestro-container">
        <div className="nuestro-card">
          <FontAwesomeIcon icon={faChalkboardTeacher} className="nuestro-icon" />
          <h3 className="nuestro-title">Interfaz Intuitiva</h3>
          <p className="nuestro-description">
            La sencilla y amigable interfaz de UniGPT permite a los usuarios realizar consultas,
            obteniendo una rápida respuesta que ayuda a esclarecer su elección académica.
          </p>
        </div>
        <div className="nuestro-card">
          <FontAwesomeIcon icon={faShareAlt} className="nuestro-icon" />
          <h3 className="nuestro-title">Integración ChatGPT</h3>
          <p className="nuestro-description">
            La implementación de ChatGPT en una app puede aumentar la participación del usuario
            estimulando interacciones genuinas y sin dificultades.
          </p>
        </div>
        <div className="nuestro-card">
          <FontAwesomeIcon icon={faBookReader} className="nuestro-icon" />
          <h3 className="nuestro-title">Aprendizaje Continuo</h3>
          <p className="nuestro-description">
            El chatbot aprende y mejora con el tiempo analizando las interacciones y los comentarios
            de los usuarios. Puede identificar patrones en el comportamiento del usuario.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nuestro;
