import React from 'react';
import classes from './Header.module.sass';
import logo from './Logo.svg';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { i18n } = useTranslation();

  const changeLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    i18n.changeLanguage(value);
  };

  return (
    <>
      <header className={classes.header}>
        <img src={logo} alt='logo' />
      </header>
      <select defaultValue={'ru'} onChange={changeLang}>
        <option value={'ru'}>Русский</option>
        <option value={'en'}>English</option>
        <option value={'tat'}>Татарча</option>
      </select>
    </>

  );
};

export default Header;
