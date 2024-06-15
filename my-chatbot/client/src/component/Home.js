import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import './Home.css';
import RotatingText from './RotatingText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faChalkboardTeacher, faShareAlt, faBookReader } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';

const teamMembers = [
  {
    name: 'Martín Götz',
    title: 'Co-Founder',
    degree: 'Licenciado en Negocios Digitales',
    image: '/Martin.png',
    links: [
      { icon: faLinkedin, url: '#' },
      { icon: faEnvelope, url: '#' },
      { icon: faFacebook, url: '#' },
    ],
  },
  {
    name: 'Federico Bornico',
    title: 'Co-Founder',
    degree: 'Licenciado en Negocios Digitales',
    image: '/Fede.jpeg',
    links: [
      { icon: faLinkedin, url: '#' },
      { icon: faEnvelope, url: '#' },
      { icon: faFacebook, url: '#' },
    ],
  },
  {
    name: 'Nicolas Serena Olivera',
    title: 'Co-founder',
    degree: 'Licenciado en Negocios Digitales',
    image: '/Martin.png',
    links: [
      { icon: faLinkedin, url: '#' },
      { icon: faEnvelope, url: '#' },
      { icon: faFacebook, url: '#' },
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
  justify-content: center;
  gap: 30px;
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
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };
  const clientSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
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
      <div className="home-section">
        <div className="text-container">
          <h1>
            Elegí tu <RotatingText /> <br />con <span className="highlight">UniGPT</span>
          </h1>
        </div>
        <button className="chatbot-button" onClick={() => window.location.href='/chatbot2'}>Chatbot</button>
      </div>
      <div className="register-section">
        <img src="/register.png" alt="Registrarse" className="register-image" />
        <div className="register-content">
          <h2>Crea tu cuenta</h2>
          <p>Regístrate o inicia sesión<br />para interactuar con el chatbot.</p>
          <div className="register-buttons">
            <button className="register-button" onClick={() => window.location.href='/register'}>Registrarse</button>
            <button className="login-button" onClick={() => window.location.href='/login'}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
      <div className="find-path-section">
        <div className="find-path-content">
          <h2 className="a1">¡Encontrá tu <br />camino!</h2>
          <p >Conversa con el chatbot <br />y elegí la mejor opción para tu futuro.</p>
          <button className="wide-chatbot-button" onClick={() => window.location.href='/chatbot2'}>Chatbot</button>
        </div>
        <Slider {...settings} className="chatbot-example-slider">
          <div>
            <img src="/juan1.png" alt="Chatbot Example 1" className="chatbot-example-image" />
          </div>
          <div>
            <img src="/juan2.png" alt="Chatbot Example 2" className="chatbot-example-image" />
          </div>
        </Slider>
      </div>
      <div className="about-section">
        <div className="about-content">
          <h2> <span className='revolucion'>Revolucionamos</span><br/>la forma de <br />encontrar la carrera <br />de tus sueños</h2>
          <button className="contact-button" onClick={() => window.location.href='/contacto'}>Contactanos</button>
        <img src="/robot.jpg" alt="Robot" className="about-image" />
        </div>
        <div className="about-description">
          <p className='descripcion-about'>Nuestra iniciativa resuelve la falta de orientación y acceso a información sobre opciones educativas en Argentina. Proponemos una plataforma web interactiva con un chatbot de inteligencia artificial que ofrece asesoramiento personalizado sobre carreras, universidades y centros terciarios. Nos dirigimos a estudiantes secundarios próximos a graduarse, universitarios en sus primeros años y aquellos que consideran un cambio de carrera. Con nuestra herramienta, facilitamos decisiones informadas y reducimos la tasa de indecisión y abandono universitario.</p>
        </div>
      </div>
      <div className="clients-section">
        <h2>Nuestros Clientes</h2>
        <Slider {...clientSettings} className="clients-slider">
          <div>
            <img src="/uca.png" alt="UCA" className="client-logo" />
          </div>
          <div>
            <img src="/itba.png" alt="ITBA" className="client-logo" />
          </div>
          <div>
            <img src="/uade.png" alt="UADE" className="client-logo" />
          </div>
          <div>
            <img src="/sanandres.png" alt="San Andrés" className="client-logo" />
          </div>
          <div>
            <img src="/ditella1.jpeg" alt="Di Tella" className="client-logo" />
          </div>
        </Slider>
      </div>
      <div className="achievement-section">
        <div className="achievement-content">
          <span className="badge">ACHIEVEMENT</span>
          <h2>Contamos</h2>
          <p>Contamos con una gran variedad de carreras y universidades de toda la Argentina.</p>
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
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.337423012615!2d2.292292315674564!3d48.85884417928765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdf2dfc5b03%3A0x4209a4b66b5f8c01!2sTour%20Eiffel!5e0!3m2!1sen!2sfr!4v1636567054902!5m2!1sen!2sfr"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <TeamSection>
        <TeamTitle>Nuestro equipo</TeamTitle>
        <TeamSubtitle>Conoce a los desarrolladores de UniGPT</TeamSubtitle>
        <TeamContainer>
          {teamMembers.map((member, index) => (
            <TeamMember key={index}>
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
      <ValuesSection>
        <ValuesTitle>Nuestro Chatbot</ValuesTitle>
        <ValuesContainer>
          <ValueCard>
            <ValueIcon icon={faChalkboardTeacher} />
            <ValueTitle>Interfaz Intuitiva</ValueTitle>
            <ValueDescription>
              La sencilla y amigable interfaz de UniGPT permite a los usuarios realizar consultas,
              obteniendo una rápida respuesta que ayuda a esclarecer su elección académica.
            </ValueDescription>
          </ValueCard>
          <ValueCard>
            <ValueIcon icon={faShareAlt} />
            <ValueTitle>Integración ChatGPT</ValueTitle>
            <ValueDescription>
              La implementación de ChatGPT en una app puede aumentar la participación del usuario
              estimulando interacciones genuinas y sin dificultades.
            </ValueDescription>
          </ValueCard>
          <ValueCard>
            <ValueIcon icon={faBookReader} />
            <ValueTitle>Aprendizaje continuo</ValueTitle>
            <ValueDescription>
              El chatbot aprende y mejora con el tiempo analizando las interacciones y los comentarios
              de los usuarios. Puede identificar patrones en el comportamiento del usuario, refinar sus
              respuestas y adaptarse a nuevas situaciones.
            </ValueDescription>
          </ValueCard>
        </ValuesContainer>
      </ValuesSection>
      <div className="testimonial-section">
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
      <div className="cta-section">
        <h2>¿Estás listo para empezar a definir tu futuro?</h2>
        <p>Súmate a la creciente cantidad de personas que aprovechan nuestra página web para aclarar su futuro de manera simple, rápida y en un mismo lugar.</p>
        <button className="cta-button" onClick={() => window.location.href='/chatbot2'}>Chatear</button>
      </div>
    </div>
  );
};


export default Home;

