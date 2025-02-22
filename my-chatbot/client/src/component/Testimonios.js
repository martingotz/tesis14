import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import * as XLSX from 'xlsx';
import './Testimonios.css';

const Testimonios = () => {
  const [testimonios, setTestimonios] = useState([]);

  useEffect(() => {
    fetch('/testimonios.xlsx')
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setTestimonios(parsedData);
      });
  }, []);

  const testimonialSettings = {
    speed: 5000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    infinite: true,
    arrows: false,
    dots: false,
    pauseOnHover: true,
  };

  return (
    <div className="testimonial-section" >
      <h2 className="section-title">Testimonios</h2>
      <Slider {...testimonialSettings} className="testimonial-slider">
        {testimonios.map((testimonio, index) => (
          <div className="testimonial" key={index}>
            <p>{testimonio.Descripcion}</p>
            <h4>{testimonio.Nombre}</h4>
            <span>{testimonio.Carreras}</span>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonios;
