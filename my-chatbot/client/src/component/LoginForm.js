import React, { useState } from 'react';
import './LoginForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleFacebookLogin = () => {
    // Aquí agregarías la lógica para iniciar sesión con Facebook
    console.log('Iniciar sesión con Facebook');
  };

  const handleGoogleLogin = () => {
    // Aquí agregarías la lógica para iniciar sesión con Google
    console.log('Iniciar sesión con Google');
  };
  const handleAppleLogin = () => {
    // Your logic for Apple login goes here
    console.log('Iniciar sesión con Apple');
};

  return (
    <div className="login-wrapper">
      <div className="banner"></div>
      <div className="container">
        <h2> Iniciar Sesion </h2>
        <input
          className="input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="button" onClick={handleLogin}>
          Iniciar Sesión
        </button>
        <p> Continuar con </p>
        <button className="button facebook" onClick={handleFacebookLogin}>
          <FontAwesomeIcon icon={faFacebook} /> 
        </button>
        <button className="button google" onClick={handleGoogleLogin}>
          <FontAwesomeIcon icon={faGoogle} /> 
        </button>
        <button className="button apple" onClick={handleAppleLogin}>
          <FontAwesomeIcon icon={faApple} /> 
        </button>

        <p> No tienes una cuenta todavia? <Link className='link' to="/register">Registrarse</Link> </p>
      </div>
    </div>
  );
};

export default LoginForm;