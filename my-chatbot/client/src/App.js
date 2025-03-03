import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";
import Chatbot from './component/Chatbot';
import Header from './component/Header';
import Usuario from './component/usuario'; 
import Contacto from './component/Contacto';
import Footer from './component/Footer';
import Carreras from './component/Carreras';
import Cookies from './component/Cookies';
import Privacy from './component/Privacy';
import Condiciones from './component/Condiciones';
import Buscador from './component/Buscador';
import ScrollerSection from './component/Scroller';
import Universidad from './component/Universidad';
import Home2 from './component/Home2';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home2 />} />
            <Route path="/tesis14" element={<Home2 />} />
            <Route path="/inicio" element={<Home2 />} />
            <Route path="/chatbot2" element={<Chatbot />} />
            <Route path="/Usuario" element={<Usuario />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/universidades" element={< Universidad />} />
            <Route path="/carreras" element={<Carreras />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/condiciones" element={<Condiciones />} />
            <Route path="/buscador" element={<Buscador />} />
            <Route path="/scroller" element={<ScrollerSection />} />
            <Route path="/home2" element={<Home2 />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
