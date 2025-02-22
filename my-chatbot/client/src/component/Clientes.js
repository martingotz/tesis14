import Slider from 'react-slick';
import './Clientes.css';

const Clientes = () => {
    const clientSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        prevArrow: <div className="slick-prev" />,
        nextArrow: <div className="slick-next" />
      };
    
return (
<div className="clients-section">
        <h2>Nuestros Clientes</h2>
        <Slider {...clientSettings} className="clients-slider">
          <div>
            <img src={`${process.env.PUBLIC_URL}/uca.png`} alt="UCA" className="client-logo" />
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/itba.png`} alt="ITBA" className="client-logo" />
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/uade.png`} alt="UADE" className="client-logo" />
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/sanandres.png`} alt="San Andrés" className="client-logo" />
          </div>
          <div>
            <img src={`${process.env.PUBLIC_URL}/ditella1.jpeg`} alt="Di Tella" className="client-logo" />
          </div>
        </Slider>
      </div>

);
};

export default Clientes;