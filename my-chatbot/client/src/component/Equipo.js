import React from 'react';
import './Equipo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const teamMembers = [
    {
      name: 'Martín Götz',
      title: 'Co-Founder',
      degree: 'Licenciado en Negocios Digitales',
      image: `${process.env.PUBLIC_URL}/Martin.png`,
      links: [
        { icon: faLinkedin, url: 'https://www.linkedin.com/in/martin-ignacio-gotz-905374253/' },
        { icon: faEnvelope, url: 'mailto:gotzm@udesa.edu.ar' },
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
        { icon: faEnvelope, url: 'mailto:Fbornico@udesa.edu.ar' },
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
        { icon: faEnvelope, url: 'mailto:nserenaolivera@udesa.edu.ar' },
        { icon: faInstagram, url: 'https://www.instagram.com/nicoserena_/' },
      ],
    },
];

const Equipo = () => {
  return (
    <div className="team-section">
      <h2 className="team-title">Nuestro equipo</h2>
      <p className="team-subtitle">Conoce a los desarrolladores de UniGPT</p>
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <img src={member.image} alt={member.name} className="team-member-img" />
            <h3 className="team-member-name">{member.name}</h3>
            <p className="team-member-title">{member.title}</p>
            <p className="team-member-degree">{member.degree}</p>
            <div className="social-links">
              {member.links.map((link, linkIndex) => (
                <a key={linkIndex} href={link.url} className="social-link" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equipo;
