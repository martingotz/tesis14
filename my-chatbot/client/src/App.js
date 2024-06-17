import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatbot from './component/chatbot2';
import Header from './component/Header';
import LoginForm from './component/LoginForm';
import RegistrationForm from './component/RegistrationForm';
import Usuario from './component/usuario'; 
import Contacto from './component/Contacto';
//import Universidad from './component/Universidad'
import Home from './component/Home';
import Footer from './component/Footer';
//import Carreras from './component/Carreras';
import Pruebita from './component/Pruebita';
import PruebitaC from './component/PruebitaC';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/chatbot2" element={<Chatbot />} />
          <Route path="/Usuario" element={<Usuario />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/universidades" element={<Pruebita />} />
          <Route path="/carreras" element={<PruebitaC />} />
          {/* Otras rutas pueden agregarse aquí */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
