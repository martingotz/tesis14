import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0d0f10; /* Dark background color */
  padding: 10px 20px;
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
`;

const NavItem = styled(NavLink)`
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    color: #a0e00d; /* Change color on hover */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
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
`;

function Header({ children }) {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo src="/uni.png" alt="Logo" />
        <LogoText>UNIGPT</LogoText>
      </LogoContainer>
      <NavContainer>
        <NavItem to="/inicio">Inicio</NavItem>
        <NavItem to="/universidades">Universidades</NavItem>
        <NavItem to="/carreras">Carreras</NavItem>
        <NavItem to="/contacto">Contacto</NavItem>
      </NavContainer>
      <ButtonContainer>
        <LoginButton to="/usuario">Iniciar Sesión</LoginButton>
        <ChatBotButton to="/chatbot2">Chatbot</ChatBotButton>
      </ButtonContainer>
    </HeaderContainer>
  );
}

export default Header;
