import React, { useState, useEffect } from 'react';
import './PruebitaC.css';
import * as XLSX from 'xlsx';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';

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
            <input
                type="text"
                placeholder="Buscar por universidad o carrera..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pruebita-search-input"
            />
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
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.667 31.69" className="pruebita-svg">
                                                <path id="Path_6" data-name="Path 6" d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z" transform="translate(0 0)"></path>
                                                <path id="Path_7" data-name="Path 7" d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z" transform="translate(-45.91 0)"></path>
                                                <path id="Path_8" data-name="Path 8" d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z" transform="translate(0 -51.963)"></path>
                                            </svg>
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





