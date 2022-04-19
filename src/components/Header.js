import React from 'react';
import logo from '../images/logo.png';

function Header() {
  return (
    <header>
      <img src={ logo } alt="logo Star Wars" className="logo-image" />
    </header>
  );
}

export default Header;
