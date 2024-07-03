import React, { useState } from 'react';
import './LoginForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Instancia useNavigate

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log('Email:', email);
    console.log('Password:', password);

    // Validate the email and password before storing and redirecting
    if (email && password) {
      // Guarda el email en local storage
      localStorage.setItem('userEmail', email);

      // Check if the email was set correctly in local storage
      console.log('Stored Email:', localStorage.getItem('userEmail'));

      // Redirige al usuario a la página principal o a la página de chat
      navigate('/chatbot2'); // Cambia '/chatbot2' a la ruta de la página principal o de chat
    } else {
      console.log('Please enter both email and password.');
    }
  };

  const handleFacebookLogin = () => {
    console.log('Iniciar sesión con Facebook');
  };

  const handleGoogleLogin = () => {
    console.log('Iniciar sesión con Google');
  };

  const handleAppleLogin = () => {
    console.log('Iniciar sesión con Apple');
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            className="input"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button className="button" type="submit">
            Iniciar Sesión
          </button>
        </form>
        <p>Continuar con</p>
        <div className="social-buttons">
          <button className="button facebook" onClick={handleFacebookLogin}>
            <FontAwesomeIcon icon={faFacebook} />
          </button>
          <button className="button google" onClick={handleGoogleLogin}>
            <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button className="button apple" onClick={handleAppleLogin}>
            <FontAwesomeIcon icon={faApple} />
          </button>
        </div>
        <p>No tienes una cuenta todavía? <Link className='link' to="/register">Registrarse</Link></p>
      </div>
    </div>
  );
};

export default LoginForm;
