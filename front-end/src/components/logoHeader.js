import React from 'react';
import './logoHeader.css';
import { ReactComponent as Logo } from '../assets/logo.svg';
const LogoHeader = () => {
  return (
    <header>
      <div className="logo-container">
        <Logo className="logo" />
      </div>
    </header>
  );
};

export default LogoHeader;