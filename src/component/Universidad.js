import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './Universidad.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';


function Universidad() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/Universidades1.xlsx')
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const keys = jsonData[0];
        const formattedData = jsonData.slice(1).map(row => {
          let obj = {};
          row.forEach((cell, i) => {
            obj[keys[i]] = cell;
          });
          return obj;
        });
        setData(formattedData);
      })
      .catch(error => console.error('Error fetching and processing Excel file:', error));
  }, []);

  return (
    <div className="container">
      {data.map((item, index) => (
        <div className="card" key={index}>
          <div className="top-section">
          <div className="logo">
                <img src={item.Image} alt={`${item.Universidad} logo`} className="logo-image" />
              </div>
            <div className="border"></div>
            <div className="icons">
              <div className="social-media">
                <a href={item.Web} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGlobe} className="social-icon" />
                </a>
                <a href={item.Instagram} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                </a>
                <a href={item.Twitter} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                </a>
              </div>
            </div>
          </div>
          <div className="bottom-section">
            <span className="title">{item.Universidad}</span>
            <div className="row row1">
              <div className="item">
                <span className="big-text">{item.Carreras}</span>
                <span className="regular-text">Carreras</span>
              </div>
              <div className="item">
                <span className="big-text">{item.Fundacion}</span>
                <span className="regular-text">Año de Fundación</span>
              </div>
              <div className="item">
                <span className="big-text">{item.Alumnos}</span>
                <span className="regular-text">Alumnos</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Universidad;








