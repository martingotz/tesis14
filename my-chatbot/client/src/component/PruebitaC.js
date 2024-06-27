import React, { useState, useEffect } from 'react';
import './PruebitaC.css';
import * as XLSX from 'xlsx';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGlobe, faMagnifyingGlass, faPhone } from '@fortawesome/free-solid-svg-icons';

function PruebitaC() {
    const [data, setData] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/Prueba2.xlsx', { responseType: 'arraybuffer' });
            const arrayBuffer = response.data;
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            setData(jsonData);
        };
        fetchData();
    }, []);

    // Agrupa los datos por universidad
    const groupedData = data.reduce((acc, item) => {
        const { Universidad } = item;
        if (!acc[Universidad]) acc[Universidad] = [];
        acc[Universidad].push(item);
        return acc;
    }, {});

    const handleUniversityClick = (university) => {
        setSelectedUniversity(university === selectedUniversity ? '' : university);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClearFilter = () => {
        setSelectedUniversity('');
        setSearchTerm('');
    };

    const filteredData = Object.entries(groupedData).reduce((acc, [university, items]) => {
        if (selectedUniversity && university !== selectedUniversity) return acc;
        const filteredItems = items.filter(item =>
            (item.Corto && item.Corto.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.Duracion && item.Duracion.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        if (filteredItems.length) acc[university] = filteredItems;
        return acc;
    }, {});

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="pruebita-container">
      <div className="buscar-container">
        <input
        type="text"
        placeholder="Buscar por universidad o carrera..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="pruebita-search-input"
            />
        <div className="buscar">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
         </div>
        </div>

            <div className='flexi'>
            <button
                className="pruebita-clear-button"
                onClick={handleClearFilter}
            >
               Todas las Carreras
            </button>
            
                {Object.keys(groupedData).map((university, index) => (
                    <button
                        key={index}
                        className={`pruebita-university-button ${selectedUniversity === university ? 'selected' : ''}`}
                        onClick={() => handleUniversityClick(university)}
                    >
                        {university}
                    </button>
                ))}
            </div>
            {Object.entries(filteredData).map(([university, items], index) => (
                <div key={index} className="pruebita-university-section">
                    <h2>{university}</h2>
                    <Slider {...sliderSettings} className="pruebita-card-container">
                        {items.map((item, idx) => (
                            <div key={idx} className="pruebita-parent">
                                <div className="pruebita-card">
                                    <div className="pruebita-logo">
                                        <span className="pruebita-circle pruebita-circle1"></span>
                                        <span className="pruebita-circle pruebita-circle2"></span>
                                        <span className="pruebita-circle pruebita-circle3"></span>
                                        <span className="pruebita-circle pruebita-circle4"></span>
                                        <span className="pruebita-circle pruebita-circle5">
                                           <img src={item.Imagen} alt={item.name} className="pruebita-svg" />
                                        </span>
                                    </div>
                                    <div className="pruebita-glass"></div>
                                    <div className="pruebita-content">
                                        <span className="pruebita-title">{item.Corto}</span>
                                        <span className="pruebita-text">{item.Duracion}</span>
                                        <span className="pruebita-text">{item.Descripcion}</span>
                                    </div>
                                    <div className="pruebita-bottom">
                                        <div className="pruebita-social-buttons-container">
                                            <a href={`mailto:${item.Mail}`} target="_blank" rel="noopener noreferrer" className="pruebita-social-button">
                                                <FontAwesomeIcon icon={faEnvelope} className="pruebita-svg" />
                                            </a>
                                            <a href={`tel:${item.Telefono}`} target="_blank" rel="noopener noreferrer" className="pruebita-social-button">
                                                <FontAwesomeIcon icon={faPhone} className="pruebita-svg" />
                                            </a>
                                            <a href={item.Web} target="_blank" rel="noopener noreferrer" className="pruebita-social-button">
                                                <FontAwesomeIcon icon={faGlobe} className="pruebita-svg" />
                                            </a>
                                        </div>
                                        <div className="pruebita-view-more">
                                            <button className="pruebita-view-more-button">View more</button>
                                            <svg className="pruebita-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            ))}
        </div>
    );
}

export default PruebitaC;





