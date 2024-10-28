import React, { useState } from 'react';
import './Usuario.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Usuario = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false); // Estado para la casilla de verificación
  const navigate = useNavigate();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (email && password && acceptedPrivacy) {
      localStorage.setItem('userEmail', email);
      setMessage('Se ha iniciado sesión con éxito.');
      setMessageType('success');
      setTimeout(() => navigate('/inicio'), 2000);
    } else {
      setMessage('Por favor, ingrese sus datos y acepte la política de privacidad.');
      setMessageType('error');
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    if (nombre && email && password && acceptedPrivacy) {
      setMessage('Se ha registrado con éxito.');
      setMessageType('success');
      setTimeout(() => navigate('/inicio'), 2000);
    } else {
      setMessage('Por favor, complete todos los campos y acepte la política de privacidad.');
      setMessageType('error');
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className={`card-switch ${isFlipped ? 'is-flipped' : ''}`}>
          <label className="switch">
            <input 
              className="toggle" 
              type="checkbox" 
              onChange={handleFlip} 
              checked={isFlipped}
            />
            <span className="slider"></span>
            <span className="card-side"></span>
            <div className="flip-card__inner">
              <div className="flip-card__front">
                <div className="title">Iniciar Sesión</div>
                <form className="flip-card__form" onSubmit={handleLogin}>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    name="email" 
                    className="flip-card__input" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <input 
                    type="password" 
                    placeholder="Contraseña" 
                    name="password" 
                    className="flip-card__input" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />

                  {/* Añadir los iconos aquí */}
                  <div className="social-media-icons-container">
                    <FontAwesomeIcon icon={faGoogle} size="2x" className="social-media-icon" />
                    <FontAwesomeIcon icon={faApple} size="2x" className="social-media-icon" />
                    <FontAwesomeIcon icon={faFacebook} size="2x" className="social-media-icon" />
                  </div>

                  <label className="privacy-policy">
                    <input
                      type="checkbox"
                      onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                      checked={acceptedPrivacy}
                      
                    />
                      <span></span>
                     Acepta nuestra <a href="/Condiciones" className='white'> política de privacidad</a>
                  </label>
                  <button className="flip-card__btn" type="submit">Confirmar!</button>
                </form>
              </div>
              <div className="flip-card__back">
                <div className="title">Registrarse</div>
                <form className="flip-card__form" onSubmit={handleRegister}>
                  <input 
                    type="text" 
                    placeholder="Nombre" 
                    name="name" 
                    className="flip-card__input" 
                    onChange={(e) => setNombre(e.target.value)}
                    value={nombre}
                    required
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    name="email" 
                    className="flip-card__input" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <input 
                    type="password" 
                    placeholder="Contraseña" 
                    name="password" 
                    className="flip-card__input" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />

                  {/* Añadir los iconos aquí también en la sección de registro */}
                  <div className="social-media-icons-container">
                    <FontAwesomeIcon icon={faGoogle} size="2x" className="social-media-iconito" />
                    <FontAwesomeIcon icon={faApple} size="2x" className="social-media-iconito" />
                    <FontAwesomeIcon icon={faFacebook} size="2x" className="social-media-iconito" />
                  </div>

                  <label className="privacy-policy">
                    <input
                      type="checkbox"
                      onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                      checked={acceptedPrivacy}
                    />
                    <span></span>
                    Acepta nuestra <a href="/inicio" className='white'>política de privacidad</a>
                  </label>
                  <button className="flip-card__btn" type="submit">Confirmar!</button>
                </form>
              </div>
            </div>
          </label>
        </div>

        {/* Mensajes de éxito/error */}
        {message && (
          <div className={`message-container ${messageType}`}>
            <div className={`icon ${messageType === 'success' ? 'check' : 'times'}`}>
              {messageType === 'success' ? (
                <FontAwesomeIcon icon={faCircleCheck} className="success-icon" />
              ) : (
                <FontAwesomeIcon icon={faCircleXmark} className="error-icon" />
              )}
            </div>
            <p>{message}</p>
            <button onClick={() => setMessage('')}>{messageType === 'success' ? 'Continuar' : 'Reintentar'}</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Usuario;

