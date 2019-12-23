import React from 'react';
import classes from './Header.module.sass';
import logo from './Logo.svg';

const Header = () => {
  return (
    <header className={classes.header}>
      <img src={logo} alt='logo' />
    </header>
  );
};

export default Header;
