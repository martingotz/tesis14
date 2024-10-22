import React, { useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import './Home.css';
import RotatingText from './RotatingText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faChalkboardTeacher, faShareAlt, faBookReader } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import HeroScroller from './HeroScroller';
import Usuario from './usuario';
import AOS from 'aos';
import 'aos/dist/aos.css';

const teamMembers = [
  {
    name: 'Martín Götz',
    title: 'Co-Founder',
    degree: 'Licenciado en Negocios Digitales',
    image: `${process.env.PUBLIC_URL}/Martin.png`,
    links: [
      { icon: faLinkedin, url: 'https://www.linkedin.com/in/martin-ignacio-gotz-905374253/' },
      { icon: faEnvelope, url: 'gotzm@udesa.edu.ar' },
      { icon: faInstagram, url: 'https://www.instagram.com/martingotz_/' },
    ],
  },
  {
    name: 'Federico Bornico',
    title: 'Co-Founder',
    degree: 'Licenciado en Negocios Digitales',
    image: `${process.env.PUBLIC_URL}/Fede.jpeg`,
    links: [
      { icon: faLinkedin, url: 'https://www.linkedin.com/in/federico-miguel-bornico-852b00264/' },
      { icon: faEnvelope, url: 'Fbornico@udesa.edu.ar' },
      { icon: faInstagram, url: 'https://www.instagram.com/fede_borni/' }, 
    ],
  },
  {
    name: 'Nicolas Serena Olivera',
    title: 'Co-Founder',
    degree: 'Licenciado en Negocios Digitales',
    image: `${process.env.PUBLIC_URL}/nico.png`,
    links: [
      { icon: faLinkedin, url: 'https://www.linkedin.com/in/nicol%C3%A1s-serena-32730a187/' },
      { icon: faEnvelope, url: 'nserenaolivera@udesa.edu.ar' },
      { icon: faInstagram, url: 'https://www.instagram.com/nicoserena_/' },
    ],
  },
];

const TeamSection = styled.section`
  background-color: #000;
  color: white;
  padding: 50px 20px;
  text-align: center;
`;

const TeamTitle = styled.h2`
  font-size: 4em;
  color: #A5FF00;
  margin-bottom: 10px;
`;

const TeamSubtitle = styled.p`
  font-size: 1.5em;
  margin-bottom: 50px;
`;

const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TeamMember = styled.div`
  text-align: center;
  width: 20%;
`;

const TeamMemberImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const TeamMemberName = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const TeamMemberTitle = styled.p`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const TeamMemberDegree = styled.p`
  font-size: 1em;
  margin-bottom: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const SocialLink = styled.a`
  color: inherit;
  text-decoration: none;
  font-size: 1.5em;
`;

const ValuesSection = styled.section`
  background-color: #000;
  color: white;
  padding: 50px 20px;
  text-align: center;
`;

const ValuesTitle = styled.h2`
  font-size: 4em;
  color: #A5FF00;
  margin-bottom: 10px;
`;

const ValuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const ValueCard = styled.div`
  text-align: center;
  width: 30%;
`;

const ValueIcon = styled(FontAwesomeIcon)`
  font-size: 4em;
  margin-bottom: 20px;
  color: #A5FF00;
`;

const ValueTitle = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const ValueDescription = styled.p`
  font-size: 1.2em;
`;

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      anchorPlacement: 'top-center',
    });
  }, []);

  

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
    <div>
      <div className="home-section" data-aos="fade-up">
        <div className="text-container">
          <h1>
            Elegí tu <RotatingText /> <br />con <span className="highlight">UniGPT</span>
          </h1>
        </div>
        <button className="chatbot-button" onClick={() => window.location.href='/chatbot2'}>Chatbot</button>
      </div>

      <div className="register-section" data-aos="fade-right">
        <div className="usuario-container">
          <Usuario />
        </div>
        <div className="register-content">
          <h2>Crea tu cuenta</h2>
          <p>Regístrate o inicia sesión<br />para interactuar con el chatbot.</p>
          <div className="register-buttons">
            <button className="register-button" onClick={() => window.location.href='/Usuario'}>Registrarse</button>
            <button className="login-button" onClick={() => window.location.href='/Usuario'}>Iniciar Sesión</button>
          </div>
        </div>
      </div>

      <div className="section-hero" data-aos="zoom-in">
        <HeroScroller />
        <div className="find-path-section">
          <div className="find-path-content">
            <h2 className="a1">¡Encontrá tu <br />camino!</h2>
            <p>Conversa con el chatbot <br />y elegí la mejor opción para tu futuro.</p>
            <button className="wide-chatbot-button" onClick={() => window.location.href='/chatbot2'}>Chatbot</button>
          </div>
        </div>
      </div>

      <div className="about-section" data-aos="fade-left">
        <div className="about-content">
          <img
            src={`${process.env.PUBLIC_URL}/hor.png`}
            alt="Robot"
            className="about-image"
          />
        </div>
        <div className="about-description">
          <h2>
            <span className="revolucion">Revolucionamos</span>
            <br />
            la forma de encontrar la carrera de tus sueños
          </h2>
          <p className="descripcion-about">
            Nuestra iniciativa resuelve la falta de orientación y acceso a información
            sobre opciones educativas en Argentina. Proponemos una plataforma web
            interactiva con un chatbot de inteligencia artificial que ofrece
            asesoramiento personalizado sobre carreras, universidades y centros
            terciarios. Nos dirigimos a estudiantes secundarios próximos a graduarse,
            universitarios en sus primeros años y aquellos que consideran un cambio
            de carrera. Con nuestra herramienta, facilitamos decisiones informadas y
            reducimos la tasa de indecisión y abandono universitario.
          </p>
        </div>
      </div>

      <div className="clients-section" data-aos="fade-up">
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

      <div className="achievement-section" data-aos="fade-right">
        <div className="achievement-content">
          <h2>Contamos</h2>
          <p>Contamos con carreras y universidades de toda la Argentina</p>
          <div className="stats">
            <div>
              800
              <span>Carreras</span>
            </div>
            <div>
              500
              <span>Universidades</span>
            </div>
            <div>
              5000
              <span>Estudiantes</span>
            </div>
            <div>
              650
              <span>Participantes del Foro</span>
            </div>
          </div>
        </div>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d152471.75403701185!2d-58.56031062355942!3d-34.49703804060932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1suniversidad!5e0!3m2!1ses!2sar!4v1724072415633!5m2!1ses!2sar"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de ubicación de la universidad"
          />
        </div>
      </div>

      <TeamSection data-aos="fade-up">
        <TeamTitle>Nuestro equipo</TeamTitle>
        <TeamSubtitle>Conoce a los desarrolladores de UniGPT</TeamSubtitle>
        <TeamContainer>
          {teamMembers.map((member, index) => (
            <TeamMember className='team-member' key={index}>
              <TeamMemberImage src={member.image} alt={member.name} />
              <TeamMemberName>{member.name}</TeamMemberName>
              <TeamMemberTitle>{member.title}</TeamMemberTitle>
              <TeamMemberDegree>{member.degree}</TeamMemberDegree>
              <SocialLinks>
                {member.links.map((link, linkIndex) => (
                  <SocialLink key={linkIndex} href={link.url}>
                    <FontAwesomeIcon icon={link.icon} />
                  </SocialLink>
                ))}
              </SocialLinks>
            </TeamMember>
          ))}
        </TeamContainer>
      </TeamSection>

      <ValuesSection data-aos="fade-left">
        <ValuesTitle>Nuestro Chatbot</ValuesTitle>
        <ValuesContainer className='valueContainer'>
          <ValueCard className='valueCard'>
            <ValueIcon icon={faChalkboardTeacher} />
            <ValueTitle className='valueTitle'>Interfaz Intuitiva</ValueTitle>
            <ValueDescription>
              La sencilla y amigable interfaz de UniGPT permite a los usuarios realizar consultas,
              obteniendo una rápida respuesta que ayuda a esclarecer su elección académica.
            </ValueDescription>
          </ValueCard>
          <ValueCard className='valueCard'>
            <ValueIcon icon={faShareAlt} />
            <ValueTitle className='valueTitle'>Integración ChatGPT</ValueTitle>
            <ValueDescription>
              La implementación de ChatGPT en una app puede aumentar la participación del usuario
              estimulando interacciones genuinas y sin dificultades.
            </ValueDescription>
          </ValueCard>
          <ValueCard className='valueCard'>
            <ValueIcon icon={faBookReader} />
            <ValueTitle className='valueTitle'>Aprendizaje continuo</ValueTitle>
            <ValueDescription>
              El chatbot aprende y mejora con el tiempo analizando las interacciones y los comentarios
              de los usuarios. Puede identificar patrones en el comportamiento del usuario.
            </ValueDescription>
          </ValueCard>
        </ValuesContainer>
      </ValuesSection>

      <div className="testimonial-section" data-aos="fade-up">
        <h2 className="section-title">Testimonios</h2>
        <Slider {...testimonialSettings} className="testimonial-slider">
          <div className="testimonial">
            <p>"Mi experiencia con UniGPT fue fantástica. La plataforma es fácil de usar y el chatbot realmente entiende lo que necesitas. Encontré una carrera que nunca había considerado y estoy muy emocionada por empezar."</p>
            <h4>Lucía</h4>
            <span>Marketing</span>
          </div>
          <div className="testimonial">
            <p>"Gracias a UniGPT, encontré una facultad que se adapta perfectamente a mis necesidades. El chatbot me dio una lista de opciones y me explicó los pros y contras de cada una. Me ahorró mucho tiempo y estrés."</p>
            <h4>Martín</h4>
            <span>Negocios Digitales</span>
          </div>
          <div className="testimonial">
            <p>"Estaba muy confundida sobre qué carrera elegir, pero UniGPT me guió paso a paso. El chatbot entendió mis intereses y me sugirió opciones perfectas para mí. ¡Es increíble cómo me facilitó la decisión!"</p>
            <h4>María</h4>
            <span>Diseño</span>
          </div>
          <div className="testimonial">
            <p>"Después de cambiar de carrera dos veces, UniGPT fue mi salvación. El chatbot me ayudó a encontrar una carrera que realmente me apasiona y una universidad que se ajusta a mis expectativas. ¡Lo recomiendo totalmente!"</p>
            <h4>Agustina</h4>
            <span>Comunicación</span>
          </div>
          <div className="testimonial">
            <p>"UniGPT hizo que el proceso de elegir una universidad fuera mucho menos abrumador. El chatbot fue muy preciso en sus recomendaciones y me ayudó a tomar una decisión informada. ¡Estoy muy agradecido!"</p>
            <h4>Federico</h4>
            <span>Relaciones Internacionales</span>
          </div>
          <div className="testimonial">
            <p>"Estaba indecisa entre varias carreras, pero UniGPT me ayudó a aclarar mis ideas. El chatbot fue muy paciente y me dio excelentes consejos basados en mis intereses. ¡Ahora estoy feliz con mi elección!"</p>
            <h4>Martina</h4>
            <span>Economía</span>
          </div>
          <div className="testimonial">
            <p>"UniGPT es una herramienta increíble. El chatbot me ayudó a encontrar una carrera que nunca había considerado y me proporcionó toda la información necesaria sobre las universidades. ¡Definitivamente hizo mi vida más fácil!"</p>
            <h4>Nicolás</h4>
            <span>Derecho</span>
          </div>
        </Slider>
      </div>

      <div className="cta-section" data-aos="zoom-in">
        <div className="cta-background">
          <h2>¿Estás listo para empezar a definir tu futuro?</h2>
          <p>Súmate a la creciente cantidad de personas que aprovechan nuestra página web para aclarar su futuro de manera simple, rápida y en un mismo lugar.</p>
          <button className="cta-button" onClick={() => window.location.href='/chatbot2'}>Chatear</button>
        </div>
      </div>
    </div>
  );
};

export default Home;



