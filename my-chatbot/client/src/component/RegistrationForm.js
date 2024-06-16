import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate desde react-router-dom
import { faGoogle, faFacebook, faApple } from '@fortawesome/free-brands-svg-icons';
import './RegistrationForm.css';

function RegistrationForm() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [googleToken, setGoogleToken] = useState('');
  const [facebookToken, setFacebookToken] = useState('');
  const [appleToken, setAppleToken] = useState('');

  const navigate = useNavigate(); // Instancia useNavigate

  const handleGoogleLogin = () => {
    const clientId = 'YOUR_GOOGLE_CLIENT_ID';
    const redirectUri = 'YOUR_REDIRECT_URI';
    const scope = 'openid email profile';

    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    window.location.href = authUrl;
  };

  const handleFacebookLogin = () => {
    const appId = 'YOUR_FACEBOOK_APP_ID';
    const redirectUri = 'YOUR_REDIRECT_URI';
    const scope = 'email';

    const authUrl = `https://www.facebook.com/v3.3/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    window.location.href = authUrl;
  };

  const handleAppleLogin = () => {
    const clientId = 'YOUR_APPLE_CLIENT_ID';
    const redirectUri = 'YOUR_REDIRECT_URI';
    const scope = 'email';

    const authUrl = `https://appleid.apple.com/auth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    window.location.href = authUrl;
  };

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
      if (code.startsWith('google')) {
        axios.post("https://oauth2.googleapis.com/token", {
          grant_type: 'authorization_code',
          code,
          redirect_uri: 'YOUR_REDIRECT_URI',
          client_id: 'YOUR_GOOGLE_CLIENT_ID',
          client_secret: 'YOUR_GOOGLE_CLIENT_SECRET',
        })
        .then(response => {
          setGoogleToken(response.data.access_token);
        })
        .catch(error => {
          console.error(error);
        });
      } else if (code.startsWith('facebook')) {
        axios.post("https://graph.facebook.com/v3.3/oauth/access_token", {
          client_id: 'YOUR_FACEBOOK_APP_ID',
          client_secret: 'YOUR_FACEBOOK_APP_SECRET',
          redirect_uri: 'YOUR_REDIRECT_URI',
          code,
        })
        .then(response => {
          setFacebookToken(response.data.access_token);
        })
        .catch(error => {
          console.error(error);
        });
      } else if (code.startsWith('apple')) {
        axios.post("https://appleid.apple.com/auth/token", {
          grant_type: 'authorization_code',
          code,
          redirect_uri: 'YOUR_REDIRECT_URI',
          client_id: 'YOUR_APPLE_CLIENT_ID',
          client_secret: 'YOUR_APPLE_CLIENT_SECRET',
        })
        .then(response => {
          setAppleToken(response.data.access_token);
        })
        .catch(error => {
          console.error(error);
        });
      }
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para el envío del formulario
    navigate('/login'); // Redirige al login después de registrarse
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <form onSubmit={handleSubmit}>
          <h2>Registrarse</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="form-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="form-input"
          />
          <p>Ya tienes cuenta? <Link to="/login">Iniciar Sesión</Link></p>
          <button type="submit" className="form-button">
            Registrarse
          </button>
          <p>O continuar con</p>
          <button type="button" onClick={handleGoogleLogin} className="button google">
            <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button type="button" onClick={handleFacebookLogin} className="button facebook">
            <FontAwesomeIcon icon={faFacebook} />
          </button>
          <button type="button" onClick={handleAppleLogin} className="button apple">
            <FontAwesomeIcon icon={faApple} />
          </button>
          {googleToken && <p>Token de acceso de Google: {googleToken}</p>}
          {facebookToken && <p>Token de acceso de Facebook: {facebookToken}</p>}
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
