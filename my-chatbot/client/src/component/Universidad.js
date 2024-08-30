import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGlobe, faPhone, faSchool, faGraduationCap, faPeopleGroup, faRankingStar, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Buscador from './Buscador';
import './Universidad.css'; // Import the CSS file

export function Universidad() {
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
    <div className="universidad-container">
      <div className="search-container">
        <Buscador 
          data={data} 
          searchTerm={searchTerm} 
          onSearchResults={handleSearchResults} 
          onSearchChange={handleSearchChange} 
        />
      </div>

      <div className="container">
        {filteredResults.map((item, index) => (
          <div 
            key={index} 
            className="card" 
          >
            <div className="card-image-container">
              <img
                src={`${item.Image}`}
                alt={`${item.Universidad} logo`}
                className="card-image"
              />
              <div className="arrow-icon" onClick={() => handleCardClick(index)}>
                <FontAwesomeIcon icon={flipped[index] ? faMinus : faPlus} size="lg" className="icon"/>
              </div>
            </div>
            <div className="card-content">
              <div className="card-header">
                <h5 className="card-title">
                  {item.Universidad}
                </h5>
              </div>

              {flipped[index] ? (
                <div className="card-description">
                  <p>{item.Descripcion}</p>
                </div>
              ) : (
                <>
                  <div className="card-info">
                    <div className="card-info-item ranking">
                      <FontAwesomeIcon icon={faRankingStar} size="lg" className="icon"/>
                      <strong>#{item.Ranking}</strong>
                    </div>
                    <div className="card-info-item fundacion">
                      <FontAwesomeIcon icon={faSchool} size="lg" className="icon"/>
                      <strong>Fundación: {item.Fundacion}</strong>
                    </div>
                  </div>
                  <div className="card-info">
                    <div className="card-info-item">
                      <FontAwesomeIcon icon={faGraduationCap} size="lg" className="icon"/>
                      <strong>Carreras:</strong> {item.Carreras}
                    </div>
                    <div className="card-info-item">
                      <FontAwesomeIcon icon={faPeopleGroup} size="lg" className="icon"/>
                      <strong>Alumnos:</strong> {item.Alumnos}
                    </div>
                  </div>
                </>
              )}

              <div className="icon-group">
                {item.Twitter && (
                  <div title="Twitter">
                    <a href={item.Twitter} target="_blank" rel="noopener noreferrer" className="icon-link">
                      <FontAwesomeIcon icon={faTwitter} className="icon"/>
                    </a>
                  </div>
                )}
                {item.Instagram && (
                  <div title="Instagram">
                    <a href={item.Instagram} target="_blank" rel="noopener noreferrer" className="icon-link">
                      <FontAwesomeIcon icon={faInstagram} className="icon"/>
                    </a>
                  </div>
                )}
                {item.Web && (
                  <div title="Website">
                    <a href={item.Web} target="_blank" rel="noopener noreferrer" className="icon-link">
                      <FontAwesomeIcon icon={faGlobe} className="icon"/>
                    </a>
                  </div>
                )}
                {item.Mail && (
                  <div title="Email">
                    <div
                      onMouseEnter={() => setHoveredEmail(index)}
                      onMouseLeave={() => setHoveredEmail(null)}
                      className="icon-link"
                    >
                      <a href={`mailto:${item.Mail}`} target='_blank' rel='noopener noreferrer'>
                        <FontAwesomeIcon icon={faEnvelope} className="icon"/>
                      </a>
                      {hoveredEmail === index && <span className="hover-info">{item.Mail}</span>}
                    </div>
                  </div>
                )}
                {item.Telefono && (
                  <div title="Phone">
                    <div
                      onMouseEnter={() => setHoveredPhone(index)}
                      onMouseLeave={() => setHoveredPhone(null)}
                      className="icon-link"
                    >
                      <a href={`tel:${item.Telefono}`} target='_blank' rel='noopener noreferrer'>
                        <FontAwesomeIcon icon={faPhone} className="icon"/>
                      </a>
                      {hoveredPhone === index && <span className="hover-info">{item.Telefono}</span>}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="more-info-container">
              <button 
                   className="more-info-button" 
                  onClick={() => handleCardClick(index)}
                    >
                  {flipped[index] ? 'Menos Info' : 'Más Info'}
                 </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Universidad;





