import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

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

const NavItem = styled.a`
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

const ChatBotButton = styled.button`
  background-color: #a0e00d;
  color: #0d0f10;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
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
        <NavItem href="#inicio">Inicio</NavItem>
        <NavItem href="#universidades">Universidades</NavItem>
        <NavItem href="#carreras">Carreras</NavItem>
        <NavItem href="#contacto">Contacto</NavItem>
      </NavContainer>
      <ButtonContainer>
        <LoginButton to="/login">Iniciar Sesión</LoginButton>
        <ChatBotButton>Chatbot</ChatBotButton>
      </ButtonContainer>
    </HeaderContainer>
  );
}

export default Header;