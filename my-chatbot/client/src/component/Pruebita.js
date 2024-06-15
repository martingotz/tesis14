import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './Pruebita.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGlobe, faPhone, faSchool, faGraduationCap, faPeopleGroup, faRankingStar, faClipboardList } from '@fortawesome/free-solid-svg-icons';

function Pruebita() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
        <div className="profile-item" key={index}>
          <div className="profile-pic">
            <img src={item.Image} alt={`${item.Universidad} logo`} />
          </div>
          <div className="profile-info">
            <div className="profile-content">
              <span className="profile-name">{item.Universidad}</span>
              
              <span className="profile-description">
                <div className="info-row">
                  <div className="info-item">
                    <FontAwesomeIcon icon={faRankingStar} size="lg" />
                    <strong>Ranking Mundial:</strong> #{item.Ranking}
                  </div>
                  <div className="info-item">
                    <FontAwesomeIcon icon={faGraduationCap} size="lg" />
                    <strong>Carreras:</strong> {item.Carreras}
                  </div>
                  <div className="info-item">
                    <FontAwesomeIcon icon={faSchool} size="lg" />
                    <strong>Fundación:</strong> {item.Fundacion}
                  </div>
                  <div className="info-item">
                    <FontAwesomeIcon icon={faPeopleGroup} size="lg" />
                    <strong>Alumnos:</strong> {item.Alumnos}
                  </div>
                </div>
                <div className="info-item">
                  <FontAwesomeIcon icon={faClipboardList} size="lg" />
                  <strong>Descripción:</strong> {item.Descripcion}
                </div>
              </span>
            </div>
            <div className="social-links">
              <a href={ensureUrl(item.Instagram)} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href={ensureUrl(item.Twitter)} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href={ensureUrl(item.Web)} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGlobe} size="2x" />
              </a>
              <a href={`mailto:${item.Mail}`} target='_blank' rel='noopener norefferer'>
                <FontAwesomeIcon icon={faEnvelope} size='2x' />
              </a>
              <a href={`tel:${item.Telefono}`} target='_blank' rel='noopener norefferer'>
                <FontAwesomeIcon icon={faPhone} size='2x' />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Pruebita;














