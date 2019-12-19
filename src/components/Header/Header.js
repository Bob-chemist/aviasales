import React from 'react';
import classes from './Header.module.sass';
import logo from './Logo.svg';

export default function Header() {
  return (
    <header className={classes.header}>
      <img src={logo} alt='logo' />
    </header>
  );
}
