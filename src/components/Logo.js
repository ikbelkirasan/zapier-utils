import React from "react";
import logo from "../assets/logo.svg";
import styled from "styled-components";

const LogoImage = styled.img`
  height: 32px;
  pointer-events: none;
`;

export default function Logo() {
  return <LogoImage src={logo} alt="logo" />;
}
