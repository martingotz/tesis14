import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './Pruebita.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGlobe, faPhone, faSchool, faGraduationCap, faPeopleGroup, faRankingStar } from '@fortawesome/free-solid-svg-icons';

function Pruebita() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    fetch('/Universidades1.xlsx') // Cambia esta ruta al archivo Excel en la carpeta 'public'
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
      });
  }, []);

  const ensureUrl = (url) => {
    if (!url) {
      return '#'; // return a placeholder if the URL is undefined or empty
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }
    return url.replace(/%20/g, ''); // remove all instances of %20
  };

  const handleCardClick = (index) => {
    setFlipped(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const filteredData = data.filter(item =>
    item.Universidad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Buscar universidad..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      {filteredData.map((item, index) => (
        <div 
          className={`profile-item ${flipped[index] ? 'flipped' : ''}`} 
          key={index} 
          onClick={() => handleCardClick(index)}
        >
          <div className="profile-front">
            <div className="profile-pic">
              <img src={item.Image} alt={`${item.Universidad} logo`} />
            </div>
            <div className="profile-info">
              <div className="profile-content">
                <span className="profile-name">{item.Universidad}</span>
                <div className="info-row">
                  <div className="info-item half-width">
                    <FontAwesomeIcon icon={faGraduationCap} size="lg" />
                    <strong>Carreras:</strong> {item.Carreras}
                  </div>
                  <div className="info-item half-width">
                    <FontAwesomeIcon icon={faPeopleGroup} size="lg" />
                    <strong>Alumnos:</strong> {item.Alumnos}
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-item half-width">
                    <FontAwesomeIcon icon={faSchool} size="lg" />
                    <strong>Fundación:</strong> {item.Fundacion}
                  </div>
                  <div className="info-item half-width">
                    <FontAwesomeIcon icon={faRankingStar} size="lg" />
                    <strong>Ranking:</strong> #{item.Ranking}
                  </div>
                </div>
              </div>
              <div className="social-links">
                {item.Instagram && (
                  <a href={ensureUrl(item.Instagram)} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                  </a>
                )}
                {item.Twitter && (
                  <a href={ensureUrl(item.Twitter)} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                  </a>
                )}
                {item.Web && (
                  <a href={ensureUrl(item.Web)} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGlobe} size="2x" />
                  </a>
                )}
                {item.Mail && (
                  <a href={`mailto:${item.Mail}`} target='_blank' rel='noopener norefferer'>
                    <FontAwesomeIcon icon={faEnvelope} size='2x' />
                  </a>
                )}
                {item.Telefono && (
                  <a href={`tel:${item.Telefono}`} target='_blank' rel='noopener norefferer'>
                    <FontAwesomeIcon icon={faPhone} size='2x' />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="profile-back">
            <div className="profile-description">
              <strong>Descripción:</strong> {item.Descripcion}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Pruebita;














