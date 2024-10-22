import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './Pruebita.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGlobe, faPhone, faSchool, faGraduationCap, faPeopleGroup, faRankingStar, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Buscador from './Buscador';

function Pruebita() {
  const [data, setData] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [hoveredEmail, setHoveredEmail] = useState(null);
  const [hoveredPhone, setHoveredPhone] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/Universidades1.xlsx`)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData); // Verifica los datos leídos del archivo Excel
        setData(jsonData);
        setFilteredResults(jsonData); // Inicializa los resultados filtrados con todos los datos
      })
      .catch(error => {
        console.error('Error reading Excel file:', error);
      });
  }, []);

  const handleCardClick = (index) => {
    setFlipped(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleSearchResults = (results) => {
    setFilteredResults(results);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term); // Actualiza el término de búsqueda
  };

  return (
    <div className="container">
      <div className="buscador-wrapper">
        <Buscador 
          data={data} 
          searchTerm={searchTerm} 
          onSearchResults={handleSearchResults} 
          onSearchChange={handleSearchChange} 
        />
      </div>

      {filteredResults.map((item, index) => (
        <div 
          className={`profile-item ${flipped[index] ? 'flipped' : ''}`} 
          key={index} 
          onClick={() => handleCardClick(index)}
        >
          <div className="profile-front">
            <div className="profile-pic">
              <img src={`${item.Image}`} alt={`${item.Universidad} logo`} />
            </div>
            <FontAwesomeIcon icon={faArrowRight} size='2x' className="arrow-right" />
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
                {item.Twitter && (
                  <a href={item.Twitter} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                  </a>
                )}
                {item.Instagram && (
                  <a href={item.Instagram} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                  </a>
                )}
                {item.Web && (
                  <a href={item.Web} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGlobe} size="2x" />
                  </a>
                )}
                {item.Mail && (
                  <div
                    onMouseEnter={() => setHoveredEmail(index)}
                    onMouseLeave={() => setHoveredEmail(null)}
                    className="icon-container"
                  >
                    <a href={`mailto:${item.Mail}`} target='_blank' rel='noopener noreferrer'>
                      <FontAwesomeIcon icon={faEnvelope} size='2x' />
                    </a>
                    {hoveredEmail === index && <span className="hover-info">{item.Mail}</span>}
                  </div>
                )}
                {item.Telefono && (
                  <div
                    onMouseEnter={() => setHoveredPhone(index)}
                    onMouseLeave={() => setHoveredPhone(null)}
                    className="icon-container"
                  >
                    <a href={`tel:${item.Telefono}`} target='_blank' rel='noopener noreferrer'>
                      <FontAwesomeIcon icon={faPhone} size='2x' />
                    </a>
                    {hoveredPhone === index && <span className="hover-info">{item.Telefono}</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="profile-back">
            <FontAwesomeIcon icon={faArrowLeft} size='2x' className="arrow-left" />
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





