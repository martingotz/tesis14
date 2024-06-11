import React from 'react';
import './Contacto.css';
import { Link } from 'react-router-dom';

function Contacto() { 
  return (
    <div className="form-card1">
      <div className="form-card2">
        <form className="form">
          <p className="form-heading">Contactanos</p>

          <div className="form-field">
            <input required="" placeholder="Nombre" className="input-field" type="text" />
          </div>

          <div className="form-field">
            <input
              required=""
              placeholder="Email"
              className="input-field"
              type="email"
            />
          </div>

          <div className="form-field">
            <input
              required=""
              placeholder="Asunto"
              className="input-field"
              type="text"
            />
          </div>

          <div className="form-field">
            <textarea
              required=""
              placeholder="Mensaje"
              cols="30"
              rows="3"
              className="input-field"
            ></textarea>
          </div>

          <button className="sendMessage-btn">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default Contacto;
