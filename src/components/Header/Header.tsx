import React from 'react';
import classes from './Header.module.sass';
import logo from './Logo.svg';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { i18n } = useTranslation();
  const { header, select } = classes;

  const changeLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <>
      <div className={select}>
        <select defaultValue={'ru'} onChange={changeLang}>
          <option value={'ru'}>Русский</option>
          <option value={'en'}>English</option>
          <option value={'tat'}>Татарча</option>
        </select>
      </div>
      <header className={header}>
        <img src={logo} alt='logo' />
      </header>
    </>

  );
};

export default Header;
