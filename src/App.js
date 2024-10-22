import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";
import Chatbot from './component/chatbot2';
import Header from './component/Header';
import LoginForm from './component/LoginForm';
import RegistrationForm from './component/RegistrationForm';
import Usuario from './component/usuario'; 
import Contacto from './component/Contacto';
// import Universidad from './component/Universidad'
import Home from './component/Home';
import Footer from './component/Footer';
// import Carreras from './component/Carreras';
import Pruebita from './component/Pruebita';
import PruebitaC from './component/PruebitaC';
import Cookies from './component/Cookies';
import Privacy from './component/Privacy';
import Condiciones from './component/Condiciones';
import Buscador from './component/Buscador';
import ScrollerSection from './component/Scroller';
import { Particles } from './component/Particles';
import RetroGridBackground from './component/Retro';
import Universidad from './component/Universidad';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/tesis14" element={<Home />} />
            <Route path="/inicio" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/chatbot2" element={<Chatbot />} />
            <Route path="/Usuario" element={<Usuario />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/universidadesC" element={<Pruebita />} />
            <Route path="/universidades" element={< Universidad />} />
            <Route path="/carreras" element={<PruebitaC />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/condiciones" element={<Condiciones />} />
            <Route path="/buscador" element={<Buscador />} />
            <Route path="/scroller" element={<ScrollerSection />} />
            <Route path="/particles" element={<Particles />} />
            <Route path="/retro" element={<RetroGridBackground />} />
            {/* Otras rutas pueden agregarse aquí */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
