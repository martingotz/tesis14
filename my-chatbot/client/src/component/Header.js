import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0d0f10; /* Dark background color */
  padding: 10px 20px;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 50px; /* Adjust the width as needed */
  height: auto; /* Maintain aspect ratio */
  margin-right: 10px;
`;

const LogoText = styled.span`
  color: #a0e00d; /* Green text color */
  font-size: 24px; /* Adjust the font size as needed */
  font-weight: bold;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: space-evenly; /* Distribute items evenly */

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${({ open }) => (open ? 'flex' : 'none')};
    background-color: #0d0f10;
    position: absolute;
    top: 60px;
    left: 0;
    padding: 10px 0;
    z-index: 1;
  }
`;

const NavItem = styled(NavLink)`
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    color: #a0e00d; /* Change color on hover */
  }

  @media (max-width: 480px) {
    padding: 10px 0;
    font-size: 16px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-evenly;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    display: ${({ open }) => (open ? 'flex' : 'none')};
  }
`;

const LoginButton = styled(NavLink)`
  background-color: #ffffff;
  color: #0d0f10;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    background-color: #a0e00d; /* Change color on hover */
  }

  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const ChatBotButton = styled(NavLink)`
  background-color: #a0e00d;
  color: #0d0f10;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    background-color: #ffffff; /* Change color on hover */
  }

  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
  }
`;

const MenuIcon = styled(FontAwesomeIcon)`
  display: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const CloseButton = styled(FontAwesomeIcon)`
  display: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? 'block' : 'none')};
  }
`;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo src={`${process.env.PUBLIC_URL}/unigpt1.png`} alt="Logo" />
        <LogoText>UNIGPT</LogoText>
      </LogoContainer>
      <MenuIcon icon={faBars} onClick={toggleMenu} />
      <CloseButton icon={faTimes} open={menuOpen} onClick={toggleMenu} />
      <NavContainer open={menuOpen}>
        <NavItem to="/inicio">Inicio</NavItem>
        <NavItem to="/universidades">Universidades</NavItem>
        <NavItem to="/carreras">Carreras</NavItem>
        <NavItem to="/contacto">Contacto</NavItem>
        <ButtonContainer open={menuOpen}>
          <LoginButton to="/usuario">Iniciar Sesión</LoginButton>
          <ChatBotButton to="/chatbot2">Chatbot</ChatBotButton>
        </ButtonContainer>
      </NavContainer>
    </HeaderContainer>
  );
}

export default Header;





