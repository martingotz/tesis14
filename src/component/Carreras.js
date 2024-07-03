import React, { useState } from 'react';
import './Carreras.css';

function Carreras() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    setSelected(selected === id ? null : id);
  };

  return (
    <div id='carreras'>
      <div className="container">
        <RadioWrapper id="value-1" name="btn" label="ITBA" number="r1" />
        <RadioWrapper id="value-2" name="btn" label="UDESA" number="r2" checked />
        <RadioWrapper id="value-3" name="btn" label="UADE" number="r3" />
        <RadioWrapper id="value-4" name="btn" label="UCA" number="r4" />
      </div>
      <div className="card-container">
        {["Spaguetti Bolognese", "Lasagna", "Fettuccine Alfredo"].map((title, index) => (
          <Card
            key={index}
            badge="Pasta"
            title={title}
            time="30 Mins"
            servings="1 Serving"
            expanded={selected === index}
            onClick={() => handleSelect(index)}
          />
        ))}
      </div>
    </div>
  );
}

function RadioWrapper({ id, name, label, number, checked }) {
  return (
    <div className="radio-wrapper">
      <input type="radio" id={id} name={name} className="input" defaultChecked={checked} />
      <div className="btn">
        <span aria-hidden="true">{label}</span>
        <span aria-hidden="true" className="btn__glitch">{label}</span>
        <label className="number">{number}</label>
      </div>
    </div>
  );
}

function Card({ badge, title, time, servings, expanded, onClick }) {
  return (
    <div className={`card ${expanded ? "expanded" : ""}`} onClick={onClick}>
      <span>{title}</span>
      {expanded && (
        <div className="card-details">
          <small className="badge">{badge}</small>
          <div className="description">
            <div className="title">
              <strong>{title}</strong>
            </div>
            <p className="card-footer">
              {time} &nbsp; | &nbsp; {servings}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carreras;

