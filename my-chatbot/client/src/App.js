import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatbot from './component/chatbot2';
import Header from './component/Header';
import LoginForm from './component/LoginForm';
import RegistrationForm from './component/RegistrationForm';
import Usuario from './component/usuario'; 
import Contacto from './component/Contacto';
import Universidad from './component/Universidad'
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/inicio" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/chatbot2" element={<Chatbot />} />
          <Route path="/Usuario" element={<Usuario />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/Universidad" element={<Universidad />} />
          {/* Otras rutas pueden agregarse aquí */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
