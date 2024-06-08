import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatbot from './component/chatbot2';
import Header from './component/Header';
import LoginForm from './component/LoginForm';
import RegistrationForm from './component/RegistrationForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/chatbot2" element={<Chatbot />} />
          {/* Otras rutas pueden agregarse aquí */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
