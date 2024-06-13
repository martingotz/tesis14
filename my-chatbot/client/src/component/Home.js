import React from "react";
import styled from "styled-components";
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';




const CardClient = styled.div`
  background: #2cb5a0;
  width: 13rem;
  padding: 25px 20px;
  border: 4px solid #7cdacc;
  box-shadow: 0 6px 10px rgba(207, 212, 222, 1);
  border-radius: 10px;
  text-align: center;
  color: #fff;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const UserPicture = styled.div`
  overflow: hidden;
  object-fit: cover;
  width: 5rem;
  height: 5rem;
  border: 4px solid #7cdacc;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  svg {
    width: 2.5rem;
    height: 2.5rem;
    fill: currentColor;
  }
`;

const NameClient = styled.p`
  margin: 0;
  margin-top: 20px;
  font-weight: 600;
  font-size: 18px;

  span {
    display: block;
    font-weight: 200;
    font-size: 16px;
  }
`;

const SocialMedia = styled.div`
  &:before {
    content: " ";
    display: block;
    width: 100%;
    height: 2px;
    margin: 20px 0;
    background: #7cdacc;
  }

  a {
    position: relative;
    margin-right: 15px;
    text-decoration: none;
    color: inherit;

    &:last-child {
      margin-right: 0;
    }

    svg {
      width: 1.1rem;
      height: 1.1rem;
      fill: currentColor;
    }

    &:hover .tooltip-social {
      opacity: 1;
      transform: translate(-50%, -130%);
    }
  }
`;

const TooltipSocial = styled.span`
  background: #262626;
  display: block;
  position: absolute;
  bottom: 0;
  left: 50%;
  padding: 0.5rem 0.4rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -90%);
  transition: all 0.2s ease;
  z-index: 1;

  &:after {
    content: " ";
    position: absolute;
    bottom: 1px;
    left: 50%;
    border: solid;
    border-width: 10px 10px 0 10px;
    border-color: transparent;
    border-top-color: #262626;
    transform: translate(-50%, 100%);
  }
`;
const Home = () => {
  return (
    <div className="home-section">
      <div className="text-container">
        <h1>
          Elegí tu <span className="highlight">camino</span><br />con <span className="highlight">UniGPT</span>
        </h1>
      </div>
      <button className="chatbot-button" onClick={() => window.location.href='#chatbot-section'}>Chatbot</button>
    </div>
  );
};
 


export default Home;

